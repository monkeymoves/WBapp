const express = require('express');
const passport = require('passport');
const router = express.Router();

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


/* handle form wellbeing */
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
let wellbeingGoals = require('./wellbeingGoals');


var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORTY+'/'+process.env.DB; 

router.get('/prosperous', ensureLoggedIn, function(req, res, next) {
  res.render('form', {
    user: req.user,
    url: wellbeingGoals.WBprosperous.url,
    title: wellbeingGoals.WBprosperous.name, 
    content: wellbeingGoals.WBprosperous.content,
  });
})

router.post('/prosperous', ensureLoggedIn, function (req, res) {

  var data = {
    user: req.user.displayName,
    projectID: "001", 
    wellbeingCategory: wellbeingGoals.WBprosperous.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(data);
});




router.get('/resilient', ensureLoggedIn, function (req, res) {
  res.render('form', {
    user: req.user,
    url: wellbeingGoals.WBresilient.url,
    title: wellbeingGoals.WBresilient.name,
    content: wellbeingGoals.WBresilient.content
   });
});

router.post('/resilient', ensureLoggedIn, function (req, res) {

  var data = {
    user: req.user.displayName,
    projectID: "001",
    wellbeingCategory: wellbeingGoals.WBresilient.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(data);
});


router.get('/healthier', ensureLoggedIn, function (req, res) {
  res.render('form', {
    user: req.user,
    url: wellbeingGoals.WBhealthier.url,
    title: wellbeingGoals.WBhealthier.name,
    content: wellbeingGoals.WBhealthier.content
   });
});

router.post('/healthier', ensureLoggedIn, function (req, res) {

  var data = {
    user: req.user.displayName,
    projectID: "001",
    wellbeingCategory: wellbeingGoals.WBhealthier.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(data);
});



router.get('/equal', ensureLoggedIn, function (req, res) {
  res.render('form', { 
    user: req.user,
    url: wellbeingGoals.WBequal.url,
    title: wellbeingGoals.WBequal.name,
    content: wellbeingGoals.WBequal.content
   });
});

router.post('/equal', ensureLoggedIn, function (req, res) {

  var data = {
    user: req.user.displayName,
    projectID: "001",
    wellbeingCategory: wellbeingGoals.WBequal.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(data);
});


router.get('/cohesive', ensureLoggedIn, function (req, res) {
  res.render('form', {
    user: req.user,
    url: wellbeingGoals.WBcohesive.url,
    title: wellbeingGoals.WBcohesive.name,
    content: wellbeingGoals.WBcohesive.content
   });
});

router.post('/cohesive', ensureLoggedIn, function (req, res) {

  var data = {
    user: req.user.displayName,
    projectID: "001",
    wellbeingCategory: wellbeingGoals.WBcohesive.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(data);
});


router.get('/vibrant', ensureLoggedIn, function (req, res) {
  res.render('form', {
    user: req.user,
    url: wellbeingGoals.WBvibrant.url,
    title: wellbeingGoals.WBvibrant.name,
    content: wellbeingGoals.WBvibrant.content
  });
});

router.post('/vibrant', ensureLoggedIn, function (req, res) {

  var data = {
    user: req.user.displayName,
    projectID: "001",
    wellbeingCategory: wellbeingGoals.WBvibrant.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(data);
});

router.get('/global', ensureLoggedIn, function (req, res) {
  res.render('form', {
    user: req.user,
    url: wellbeingGoals.WBglobal.url,
    title: wellbeingGoals.WBglobal.name,
    content: wellbeingGoals.WBglobal.content
  });
});

router.post('/global', ensureLoggedIn, function (req, res) {

  var data = {
    user: req.user.displayName,
    projectID: "001",
    wellbeingCategory: wellbeingGoals.WBglobal.name,
    positive: req.body.positive, 
    negative: req.body.negative,
    mitigation: req.body.mitigation, 
    rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(data);
});








module.exports = router;