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

//
// TODO:: need to filter out the seenBy field and replace it with the me field...
//

// Get list of threads
exports.index = function(req, res) {
  
  var startDate;
  if (typeof req.query.startdate !== 'undefined') {
    startDate = req.query.startDate;
  } else {
    startDate = new Date();
  } 
  
  var limit;
  if (typeof req.query.limit !== 'undefined') {
    startDate = req.query.limit;
  } else {
    limit = 20;
  } 
  if (limit > 100) {
    limit = 100;
  }
  
  Thread.find( { 
    topic: req.params.topic,
    created: { $lte: startDate } 
  })
  .limit( limit )
  .sort( '-created' )
  .exec(function (err, threads) {
    if(err) {
      return handleError(res, err);
    }
    return res.json(200, threads);
  });
};

// Get a single thread
exports.show = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) {
      return handleError(res, err);
    }
    if(!thing) {
      return res.send(404);
    }
    return res.json(thing);
  });
};

// Creates a new thread in the DB.
exports.create = function(req, res) {
  
  console.log('TODO:: req.user: ');
  console.log(req.user);
  
  req.body.topic = req.params.topic;
  req.author = {
    id: req.user._id // TODO need to get the rest of the details around the author and jam them in here.
  };
  Thread.create(req.body, function(err, thread) {
    if(err) {
      return handleError(res, err);
    }
    return res.json(201, thread);
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
      return res.send(404);
    }
    if (thread.author.id !== req.user._id && !config.hasRole(req.user.role, 'admin')) {
      return res.send(403);
    }
    
    var updated = _.merge(thread, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, thread);
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
      return res.send(404);
    }
    if (thread.author.id !== req.user._id && !config.hasRole(req.user.role, 'admin')) {
      return res.send(403);
    }
    
    thread.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};


// Creates a new thing in the DB.
exports.createReply = function(req, res) {
  /*
  Thing.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
  */
  return res.send(504);
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
  return res.send(504);
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
  return res.send(504);
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