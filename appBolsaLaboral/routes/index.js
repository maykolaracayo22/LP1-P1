var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  dbConn.query('SELECT * FROM egresados', function(err, rows){
    if(err){
      req.flash('error',err);
      res.render('index',{data:''}); 
    }else{
      res.render('index', {data:rows});
    }
  });
});

router.post('/search', function(req, res, next) {
  let name=req.body.search;
  dbConn.query('SELECT * FROM egresados WHERE nombre like ?', ['%' + name + '%'], function(err, rows) {
    if(err){
      req.flash('error',err);
      res.render('index',{data:''}); 
    }else{
      res.render('index', {data:rows});
    }
  });
});

router.get('/admin/login', function(req, res, next) {
  res.render('login');
});

router.get('/admin/logine', function(req, res, next) {
  res.render('logine');
});

router.get('/candidatos', function(req, res, next) {
  res.render('candidatos');
});

router.get('/info', function(req, res, next) {
  res.render('info');
});

router.get('/empleos', function(req, res, next) {
  res.render('empleos');
});

router.get('/contacto', function(req, res, next) {
  res.render('contacto');
});

router.get('/registro-emp', function(req, res, next) {
  res.render('registro-emp');
});


router.post('/admin/login',function(req, res,next){
  email=req.body.email;
  password=req.body.password;
  dbConn.query("SELECT * FROM users WHERE email='"+email+"' AND password='"+password+"'",function(err,rows)     {
    if(err) {
        //req.flash('error', err);  
        console.log(err);
    } else {
        console.log(rows);
        if(rows.length){
          req.session.idu=rows[0]["id"];
          req.session.user=rows[0]["fullname"];
          req.session.email=rows[0]["email"];
          req.session.admin=true;
          res.redirect("/admin/dashboard");
        }else{
          //req.flash('success', 'El usuario no existe'); 
          res.redirect("/");
        }
    }
  }) 
});

router.post('/admin/logine',function(req, res,next){
  email=req.body.email;
  password=req.body.password;
  dbConn.query("SELECT * FROM users WHERE email='"+email+"' AND password='"+password+"'",function(err,rows)     {
    if(err) {
        //req.flash('error', err);  
        console.log(err);
    } else {
        console.log(rows);
        if(rows.length){
          req.session.idu=rows[0]["id"];
          req.session.user=rows[0]["fullname"];
          req.session.email=rows[0]["email"];
          req.session.admin=true;
          res.redirect("/admin/dashboarde");
        }else{
          //req.flash('success', 'El usuario no existe'); 
          res.redirect("/");
        }
    }
  }) 
});


router.get('/admin/dashboard', function(req, res, next) {
  if(req.session.admin){
    res.render('admin/index');
  }
  else{
    res.redirect("login");
  }
});

router.get('/admin/dashboarde', function(req, res, next) {
  if(req.session.admin){
    res.render('admin/empresa');
  }
  else{
    res.redirect("logine");
  }
});



router.get('/admin/logout',function(req, res){
  req.session.destroy();
  res.redirect("/");
});



module.exports = router;