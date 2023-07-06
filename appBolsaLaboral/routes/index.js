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

router.get('/admin/crear_cuenta_egs', function(req, res, next) {
  res.render('crear_cuenta_egs');
});

router.get('/admin/crear_cuenta_emp', function(req, res, next) {
  res.render('crear_cuenta_emp');
});



router.get('/info', function(req, res, next) {
  res.render('info');
});


router.get('/contacto', function(req, res, next) {
  res.render('contacto');
});

router.get('/registro-emp', function(req, res, next) {
  res.render('registro-emp');
});


router.post('/admin/login', function(req, res, next) {
  email = req.body.email;
  password = req.body.password;

 dbConn.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], function(err, rows) {
   if (err) {
     console.log(err);
   } else {
     console.log(rows);
     if (rows.length) {
       req.session.idu = rows[0].id;
       req.session.user = rows[0].email;
       req.session.email = rows[0].password;
       req.session.rol = rows[0].rol;

       switch (rows[0].rol) {
         case "1":
           res.redirect("/admin/dashboard_admin");
           break;
         case "2":
           res.redirect("/admin/dashboard_emp");
           break;
         case "3":
           res.redirect("/admin/dashboard_egs");
           break;
         case "4":
           res.redirect("/admin/dashboard_doc");
           break;
         default:
           res.redirect("/");
       }
     } else {
       res.redirect("/");
     }
   }
 });
});


router.get('/admin/dashboard_admin', function(req, res, next) {
  if (req.session.rol === "1") {
    res.render('admin/index_admin');
  } else {
    res.redirect("/admin/login");
  }
});

router.get('/admin/dashboard_emp', function(req, res, next) {
 if (req.session.rol === "2") {
   res.render('admin/index_emp');
 } else {
   res.redirect("login");
 }
});

router.get('/admin/dashboard_egs', function(req, res, next) {
 if (req.session.rol === "3") {
   res.render('admin/egresado-ol');
 } else {
   res.redirect("login");
 }
});

router.get('/admin/dashboard_doc', function(req, res, next) {
 if (req.session.rol === "4") {
   res.render('admin/index_doc');
 } else {
   res.redirect("login");
 }
});



router.get('/admin/logout',function(req, res){
  req.session.destroy();
  res.redirect("/");
});

//---candi
router.get('/candidatos', function(req, res, next) {
  dbConn.query('SELECT * FROM egresado ORDER BY egs_id desc',function(err,rows){
    if(err) {
        req.flash('error', err);
        res.render('candidatos',{data:'[]'});   
    }else {
        res.render('candidatos',{data:rows});
    }
});
});


//------empleos

router.get('/empleos', function(req, res, next) {
  dbConn.query('SELECT * FROM oferta_laboral ORDER BY ol_id desc',function(err,rows){
    if(err) {
        req.flash('error', err);
        res.render('empleos',{data:'[]'});   
    }else {
        res.render('empleos',{data:rows});
    }
});
});


//--rout d eimg

router.post('/crear_cuenta_egs', function(req, res, next) { 

  let egs_nombre = req.body.egs_nombre;
  let egs_ap_paterno = req.body.egs_ap_paterno;
  let egs_ap_materno = req.body.egs_ap_materno;
  let egs_dni = req.body.egs_dni;
  let egs_correo = req.body.egs_correo;
  let egs_fecha_nacimiento = req.body.egs_fecha_nacimiento;


  //console.log(nombre);

      var form_data = {
        egs_nombre: egs_nombre,
        egs_ap_paterno: egs_ap_paterno,
        egs_ap_materno: egs_ap_materno,
        egs_dni: egs_dni,
        egs_correo: egs_correo,
        egs_fecha_nacimiento: egs_fecha_nacimiento

      }
      
      // insert query
      dbConn.query('INSERT INTO egresado SET ?', form_data, function(err, result) {
          //if(err) throw err
          if (err) {
              req.flash('error', err)
          } else {                
              req.flash('success', 'egresado registrada satisfactoriamente');
              res.redirect('egresado');
          }
      })

});

module.exports = router;