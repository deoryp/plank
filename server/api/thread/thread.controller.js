/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /thread              ->  index
 * POST    /thread              ->  create
 * GET     /thread/:id          ->  show
 * PUT     /thread/:id          ->  update
 * DELETE  /thread/:id          ->  destroy
 * POST    /thread/:id/reply    ->  createReply
 * PUT     /thread/:id/reply/:replyId ->  updateReply
 * DELETE  /thread/:id/reply/:replyId ->  destroyReply
 */

'use strict';

var _ = require('lodash');
var Thread = require('./thread.model');
var config = require('../../config/environment');

var Users = require('../user/user.controller');

var auth = require('../../auth/auth.service');

//
// TODO:: need to filter out the seenBy field and replace it with the me field...
//

var markSeenLast = function(thread, userId) {
  if (typeof thread.me === 'undefined') {
    thread.me = {};
  }
  _.each(thread.seenBy, function(seen) {
    if (seen.user == userId) {
      thread.me.seen = seen.when;
      return;
    }
  });
};

var markSeen = function(thread, userId) {
  var found = false;
  if (typeof thread.seenBy === 'undefined') {
    thread.seenBy = [];
  }
  _.each(thread.seenBy, function(seen) {
    if (seen.user == userId) {
      seen.when = new Date();
      found = true;
      return;
    }
  });
  if (!found) {
    thread.seenBy.push({user:userId, when: new Date()});
  }
};

var mapAuthorToUser = function(obj, users) {
  if (users[obj.author.id]) {
    _.extend(obj.author, users[obj.author.id]);
  }
};

// Get list of threads
// query: startdate, enddate, limit
exports.index = function(req, res) {
  
  var startDate = null;  // find startDate --> older <-- endDate
  var endDate = null;
  
  if (typeof req.query.startdate !== 'undefined') {
    startDate = new Date(parseInt(req.query.startdate));
  } else {
    startDate = new Date();
  }
  
  if (typeof req.query.enddate !== 'undefined') {
    endDate = new Date(parseInt(req.query.enddate));
  } else {
    endDate = new Date(0);
  }
  
  var limit;
  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  } else {
    limit = 20;
  } 
  if (limit > 100) {
    limit = 100;
  }
  
  Thread.find({ 
    topic: req.params.topic
  })
  .where('lastUpdate').gte(endDate).lte(startDate)
  .limit( limit )
  .sort( '-lastUpdate' )
  .exec(function (err, threads) {
    if(err) {
      return handleError(res, err);
    }
    Users.cache(function(users) {
      threads = _.map(threads, function(thread) {
        thread = thread.toObject();
        console.log('calling...')
        mapAuthorToUser(thread, users);
        _.each(thread.reply, function(reply) {
          mapAuthorToUser(reply, users);
        });
        markSeenLast(thread, req.user._id);
        delete thread.seenBy;
        return thread;
      });
    });
    
    // TODO:: trim down threads to just the min info we need to list threads.
    
    return res.status(200).json(threads);
  });
};

// Get a single thread
exports.show = function(req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if(err) {
      return handleError(res, err);
    }
    if(!thread) {
      return res.send(404);
    }
    
    thread = thread.toObject(); // needed to be able to use as object rather than mongoose obj
    
    markSeenLast(thread, req.user._id);
    delete thread.seenBy;
    
    // TODO:: trim down thread to only what we want to display.
    return res.status(200).json(thread);
  });
};

exports.seen = function(req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if(err) {
      return handleError(res, err);
    }
    if(!thread) {
      return res.send(404);
    }
    markSeen(thread, req.user._id);
    thread.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(200);
    });
  });
};

// Creates a new thread in the DB.
exports.create = function(req, res) {
  var thread = {
    author: {
      id: req.user._id, // TODO need to get the rest of the details around the author and jam them in here.
      handle: req.user.name,
      photo: req.user.google.image.url 
    },
    topic: req.params.topic,
    title: req.body.title,
    markdown: req.body.markdown
  };
  markSeen(thread, req.user._id);
    
  Thread.create(thread, function(err, thread) {
    if(err) {
      return handleError(res, err);
    }
    // TODO:: trim down thread to only what we want to display.
    return res.status(201).json(thread);
  });
};

// Updates an existing thread in the DB.
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  if(req.body.author) {
    delete req.body.author;
  }
  if(req.body.reply) {
    delete req.body.reply;
  }
  Thread.findById(req.params.id, function (err, thread) {
    if (err) {
      return handleError(res, err);
    }
    if(!thread) {
      return res.sendStatus(404);
    }
    if (thread.author.id !== req.user._id && !auth.hasRole(req.user.role, 'admin')) {
      return res.sendStatus(403);
    }
    
    req.body.lastUpdate = new Date();
    markSeen(thread, req.user._id);
    
    var updated = _.merge(thread, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      // TODO:: trim down thread to only what we want to display.
      return res.status(200).json(thread);
    });
  });
};

// Deletes a thread from the DB.
exports.destroy = function(req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if(err) {
      return handleError(res, err);
    }
    if(!thread) {
      return res.sendStatus(404);
    }
    if (thread.author.id !== req.user._id && !auth.hasRole(req.user.role, 'admin')) {
      return res.sendStatus(403);
    }
    
    thread.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
  });
};


// Creates a new thing in the DB.
exports.createReply = function(req, res) {
  
  var reply = {
    author: {
      id: req.user._id, // TODO need to get the rest of the details around the author and jam them in here.
      handle: req.user.name,
      photo: req.user.google.image.url 
    },
    markdown: req.body.markdown
  };
  
  Thread.findByIdAndUpdate(req.params.id, 
  { $push: { reply: reply }, lastUpdate: new Date() },
  { safe: true },
  function(err, thread) {
    if(err) {
      return handleError(res, err);
    }
    markSeen(thread, req.user._id);
    thread.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(201).json(thread);
    });
  });

};

// Updates an existing thing in the DB.
exports.updateReply = function(req, res) {
  /*
  if(req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
  */
  return res.sendStatus(504);
};

// Deletes a thing from the DB.
exports.destroyReply = function(req, res) {
  /*
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
  */
  return res.sendStatus(504);
};

/*

ThreadSchema
  .findOneAndUpdate(
    {
      title: req.body.post.title
    }, { 
      $push: {
        comments: comment 
      }
    }, { 
      safe: true, 
      upsert: true 
    }, function(err, blogModels) {
      console.err(err)
    });
*/

function handleError(res, err) {
  return res.send(500, err);
}