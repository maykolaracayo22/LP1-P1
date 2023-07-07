var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

router.get('/egresado-add', function (req, res, next) {
    res.render('admin2/egresado-add');
});

router.post('/egresado-add', function (req, res, next) {
    let egs_nombre = req.body.egs_nombre;
  let egs_ap_paterno = req.body.egs_ap_paterno;
  let egs_ap_materno = req.body.egs_ap_materno;
  let egs_dni = req.body.egs_dni;
  let egs_correo = req.body.egs_correo;
  let egs_celular = req.body.egs_celular;
  let egs_fecha_nacimiento = req.body.egs_fecha_nacimiento;

    //console.log(nombre);

    var form_data = {
        egs_nombre: egs_nombre,
      egs_ap_paterno: egs_ap_paterno,
      egs_ap_materno: egs_ap_materno,
      egs_dni: egs_dni,
      egs_correo: egs_correo,
      egs_celular: egs_celular,
      egs_fecha_nacimiento: egs_fecha_nacimiento
    }
    dbConn.query('INSERT INTO egresados SET ?', form_data, function (err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', ' Registrado satisfactoriamente');
            res.redirect('../admin2/index2');
        }
    })

});

module.exports = router;