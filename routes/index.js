const express = require('express');
const passport = require('passport');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
// set up auth details
const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: env.AUTH0_CALLBACK_URL,
  responseType: 'code',
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'}),
  
  function(req, res) {
    res.redirect("/");
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

router.get('/failure', function(req, res) {
  var error = req.flash("error");
  var error_description = req.flash("error_description");
  req.logout();
  res.render('failure', {
    error: error[0],
    error_description: error_description[0],
  });
});


/* handle wellbeing forms & project info*/
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
let wellbeingGoals = require('./wellbeingGoals');

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORTY+'/'+process.env.DB; 

router.post('/projectSetup', ensureLoggedIn, function (req, res) {
  var data = {
    user: req.user.displayName,
    projectName: req.body.projectName,
    projectInfo: req.body.projectInfo,
    prosperous:{},
    resilient:{},
    healthier:{},
    equal:{},
    cohesive:{},
    vibrant:{},
    global:{}
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res1) {
      if (err) throw err;
      objectId = data._id;
      console.log("1 document inserted", objectId);
      client.close();

      res.redirect("/prosperous/?passObjectID=" + objectId + "&projectName=" + data.projectName)
    });
  });
});

///// Prosperous Form
router.get('/prosperous', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    colorID:'yellow',
    percent:'16%',
    percentNo:"width:16%",
    objectId: req.query.passObjectID,
    projectName: req.query.projectName,
    url: wellbeingGoals.WBprosperous.url,
    title: wellbeingGoals.WBprosperous.name, 
    content: wellbeingGoals.WBprosperous.content,
  });
})
router.post('/prosperous', ensureLoggedIn, function (req, res) {
  var id = req.body.projectId;
  var data = {
    wellbeingCategory: wellbeingGoals.WBprosperous.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    console.log(id);
      db.collection("songs").updateOne({_id: new ObjectId(id)}, {$set: {
        prosperous : data
      }}, (err, data) => {
        if(err) throw err
        res.redirect("/resilient/?passObjectID=" + id + "&projectName=" + req.body.projectName)
    });
  });    
});

/////Resilient Form
router.get('/resilient', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    colorID:'yellow',
    percent:'30%',
    percentNo:"width:30%",
    objectId: req.query.passObjectID,
    projectName: req.query.projectName,
    url: wellbeingGoals.WBresilient.url,
    title: wellbeingGoals.WBresilient.name, 
    content: wellbeingGoals.WBresilient.content,
  });
})
router.post('/resilient', ensureLoggedIn, function (req, res) {
  var id = req.body.projectId;
  var data = {
    wellbeingCategory: wellbeingGoals.WBresilient.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    console.log(id);
      db.collection("songs").updateOne({_id: new ObjectId(id)}, {$set: {
        resilient : data
      }}, (err, data) => {
        if(err) throw err
        res.redirect("/healthier/?passObjectID=" + id + "&projectName=" + req.body.projectName)
    });
  });    
});
////// healthier form


router.get('/healthier', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    colorID:'yellow',
    percent:'44%',
    percentNo:"width:44%",
    objectId: req.query.passObjectID,
    projectName: req.query.projectName,
    url: wellbeingGoals.WBhealthier.url,
    title: wellbeingGoals.WBhealthier.name, 
    content: wellbeingGoals.WBhealthier.content,
  });
})
router.post('/healthier', ensureLoggedIn, function (req, res) {
  var id = req.body.projectId;
  var data = {
    wellbeingCategory: wellbeingGoals.WBhealthier.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    console.log(id);
      db.collection("songs").updateOne({_id: new ObjectId(id)}, {$set: {
        healthier : data
      }}, (err, data) => {
        if(err) throw err
        res.redirect("/equal/?passObjectID=" + id + "&projectName=" + req.body.projectName)
    });
  });    
});


////// Equal form

router.get('/equal', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    colorID:'yellow',
    percent:'58%',
    percentNo:"width:58%",
    objectId: req.query.passObjectID,
    projectName: req.query.projectName,
    url: wellbeingGoals.WBequal.url,
    title: wellbeingGoals.WBequal.name, 
    content: wellbeingGoals.WBequal.content,
  });
})
router.post('/equal', ensureLoggedIn, function (req, res) {
  var id = req.body.projectId;
  var data = {
    wellbeingCategory: wellbeingGoals.WBequal.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    console.log(id);
      db.collection("songs").updateOne({_id: new ObjectId(id)}, {$set: {
        equal : data
      }}, (err, data) => {
        if(err) throw err
        res.redirect("/cohesive/?passObjectID=" + id + "&projectName=" + req.body.projectName)
    });
  });    
});



/// Cohesive Form
router.get('/cohesive', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    colorID:'yellow',
    percent:'72%',
    percentNo:"width:72%",
    objectId: req.query.passObjectID,
    projectName: req.query.projectName,
    url: wellbeingGoals.WBcohesive.url,
    title: wellbeingGoals.WBcohesive.name, 
    content: wellbeingGoals.WBcohesive.content,
  });
})
router.post('/cohesive', ensureLoggedIn, function (req, res) {
  var id = req.body.projectId;
  var data = {
    wellbeingCategory: wellbeingGoals.WBcohesive.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    console.log(id);
      db.collection("songs").updateOne({_id: new ObjectId(id)}, {$set: {
        cohesive : data
      }}, (err, data) => {
        if(err) throw err
        res.redirect("/vibrant/?passObjectID=" + id + "&projectName=" + req.body.projectName)
    });
  });    
});



//// Vibrant Form
router.get('/vibrant', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    colorID:'yellow',
    percent:'86%',
    percentNo:"width:86%",
    objectId: req.query.passObjectID,
    projectName: req.query.projectName,
    url: wellbeingGoals.WBvibrant.url,
    title: wellbeingGoals.WBvibrant.name, 
    content: wellbeingGoals.WBvibrant.content,
  });
})
router.post('/vibrant', ensureLoggedIn, function (req, res) {
  var id = req.body.projectId;
  var data = {
    wellbeingCategory: wellbeingGoals.WBvibrant.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    console.log(id);
      db.collection("songs").updateOne({_id: new ObjectId(id)}, {$set: {
        vibrant : data
      }}, (err, data) => {
        if(err) throw err
        res.redirect("/global/?passObjectID=" + id + "&projectName=" + req.body.projectName)
    });
  });    
});


/// Global Page

router.get('/global', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    colorID:'yellow',
    percent:'100%',
    percentNo:"width:100%",
    objectId: req.query.passObjectID,
    projectName: req.query.projectName,
    url: wellbeingGoals.WBglobal.url,
    title: wellbeingGoals.WBglobal.name, 
    content: wellbeingGoals.WBglobal.content,
  });
})
router.post('/global', ensureLoggedIn, function (req, res) {
  var id = req.body.projectId;
  var data = {
    wellbeingCategory: wellbeingGoals.WBglobal.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    console.log(id);
      db.collection("songs").updateOne({_id: new ObjectId(id)}, {$set: {
        global : data
      }}, (err, data) => {
        if(err) throw err
        res.redirect("/finaldata/?passObjectID=" + id + "&projectName=" + req.body.projectName)
    });
  });    
});


router.get('/finaldata', ensureLoggedIn, function (req, res) {


  res.render('final')
});


module.exports = router;