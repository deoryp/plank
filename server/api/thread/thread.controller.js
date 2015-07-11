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
// query: startdate, enddate, limit
exports.index = function(req, res) {
  
  var startDate = null;  // find startDate --> older <-- endDate
  var endDate = null;
  
//  console.log(req.query);
  
  if (typeof req.query.startdate !== 'undefined') {
    startDate = new Date(parseInt(req.query.startdate));
//    startDate = parseInt(req.query.startdate);
  } else {
    startDate = new Date();
  }
  
  if (typeof req.query.enddate !== 'undefined') {
    endDate = new Date(parseInt(req.query.enddate));
//    endDate = parseInt(req.query.enddate);
  } else {
    endDate = new Date(0);
  }
//  if (startDate === null && endDate === null) {
//    startDate = new Date().getTime();
  //  startDate = new Date();
  //} 
  
  var limit;
  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  } else {
    limit = 20;
  } 
  if (limit > 100) {
    limit = 100;
  }
  
  var query = { 
    topic: req.params.topic
  };
  
  if (startDate !== null && endDate !== null) {
    query.created = { $lte: startDate, $gte: endDate };
  } else if (endDate !== null) {
    query.created = { $gte: endDate };
  } else if (startDate !== null) {
    query.created = { $lte: startDate };
  }

  console.log('query:');  
  console.log(query);
  
  Thread.find({ 
    topic: req.params.topic
  })
  .where('created').gte(endDate).lte(startDate)
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
  Thread.findById(req.params.id, function (err, thread) {
    if(err) {
      return handleError(res, err);
    }
    if(!thread) {
      return res.send(404);
    }
    return res.json(thread);
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
    title: req.params.title,
    markdown: req.params.markdown
  };
  
  console.log('saving thread:' );
  console.log(thread);
  
  Thread.create(thread, function(err, thread) {
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
  
  console.log('createReply - ');
  console.log(req.body);
  
  var reply = {
    author: {
      id: req.user._id, // TODO need to get the rest of the details around the author and jam them in here.
      handle: req.user.name,
      photo: req.user.google.image.url 
    },
    markdown: req.body.markdown
  };
  
  Thread.findByIdAndUpdate(req.params.id, 
  { $push: { reply: reply } },
  { safe: true, upsert: true },
  function(err, thread) {
    if(err) {
      return handleError(res, err);
    }
    return res.json(201, thread);
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