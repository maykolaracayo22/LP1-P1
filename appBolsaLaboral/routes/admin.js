var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

/* GET home page. */

/* EGRESADO */

router.get('/egresado-ol', function (req, res, next) {
    res.render('admin/egresado-ol');
});

// router.get('/oferta-egresado-1', function(req, res, next) {
//     res.render('admin/oferta-egresado-1');
// });

router.get('/egresado-apli', function (req, res, next) {
    res.render('admin/egresado-apli');
});

router.get('/perfil-empresa', function (req, res, next) {
    res.render('admin/perfil-empresa');
});

router.get('/home', function (req, res, next) {
    res.render('admin/home');
});

/* INICIO COPIA*/

router.get('/egresado-pos', function (req, res, next) {
    res.render('admin/egresado-pos');
});
/* FIN COPIA*/

/* ADMIN */

router.get('/admin', function (req, res, next) {
    dbConn.query('SELECT * FROM usuarios ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/admin', { data: '' });
        } else {
            res.render('admin/admin', { data: rows });
        }
    });
});

router.get('/admin-add', function (req, res, next) {
    res.render('admin/admin-add');
});

router.post('/admin-add', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let rol = req.body.rol;

    //console.log(nombre);

    var form_data = {
        email: email,
        password: password,
        rol: rol
    }
    dbConn.query('INSERT INTO usuarios SET ?', form_data, function (err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', 'Usuario registrado satisfactoriamente');
            res.redirect('../admin/admin');
        }
    })

});

/* CREAR EGRESADO */

router.get('/crear-egresado-add', function (req, res, next) {
    res.render('admin/crear-egresado-add');
});

router.post('/crear-egresado-add', function (req, res, next) {
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
            req.flash('success', 'Registrado satisfactoriamente');
            res.redirect('../admin/crear-usuario-egs');
        }
    })

});

/* CREAR EMPRESA */


router.get('/crear-empresa-add', function (req, res, next) {
    res.render('admin/crear-empresa-add');
});

router.post('/crear-empresa-add', function (req, res, next) {
    let emp_razon_social = req.body.emp_razon_social;
    let emp_direccion	 = req.body.emp_direccion;
    let emp_ruc	 = req.body.emp_ruc;
    let emp_celular = req.body.emp_celular;
    let emp_rubro = req.body.emp_rubro;
    let emp_correo = req.body.emp_correo;
    let emp_lugar = req.body.emp_lugar;

    console.log('emp_razon_social:', emp_razon_social);
    console.log('emp_direccion:', emp_direccion);
    console.log('emp_ruc:', emp_ruc);
    console.log('emp_celular:', emp_celular);
    console.log('emp_rubro:', emp_rubro);
    console.log('emp_correo:', emp_correo);
    console.log('emp_lugar:', emp_lugar);

    //console.log(nombre);

    var form_data = {
       

        emp_razon_social: emp_razon_social,
        emp_direccion: emp_direccion,
        emp_ruc: emp_ruc,
        emp_celular: emp_celular,
        emp_rubro: emp_rubro,
        emp_correo: emp_correo,
        emp_lugar: emp_lugar
    }
    dbConn.query('INSERT INTO empresa SET ?', form_data, function (err, result) {
        if (err) {
            console.log('Error:', err);

            req.flash('error', err);
        } else {
            console.log('Insert successful!');

            req.flash('success', 'Registrado satisfactoriamente');
            res.redirect('../admin/crear-usuario-emp');
        }
    })

});



/* EMPRESA */

router.get('/empresa-ver', function (req, res, next) {
    res.render('admin/empresa-ver');
});

router.get('/crear-usuario-egs', function (req, res, next) {
    res.render('admin/crear-usuario-egs');
});

router.get('/crear-usuario-emp', function (req, res, next) {
    res.render('admin/crear-usuario-emp');
});




/* CATEGORIAS */

router.get('/categorias', function (req, res, next) {
    dbConn.query('SELECT * FROM categorias ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('admin/categorias', { data: '' });
        } else {
            res.render('admin/categorias', { data: rows });
        }
    });
});

router.get('/categorias-add', function (req, res, next) {
    res.render('admin/categorias-add');
});

router.post('/categorias-add', function (req, res, next) {
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    //console.log(nombre);

    var form_data = {
        nombre: nombre,
        descripcion: descripcion
    }
    dbConn.query('INSERT INTO categorias SET ?', form_data, function (err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', 'Categoria registrada satisfactoriamente');
            res.redirect('../admin/categorias');
        }
    })

});

router.get('/categorias-edit/(:id)', function (req, res, next) {
    let id = req.params.id;
    //console.log(id);
    dbConn.query('SELECT * FROM categorias WHERE id=' + id, function (err, rows, fields) {
        if (err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Ninguna categoria tiene el id = ' + id)
            res.redirect('admin/categorias')
        }
        else {
            res.render('admin/categorias-edit', {
                id: rows[0].id,
                nombre: rows[0].nombre,
                descripcion: rows[0].descripcion
            })
        }
    })
});

router.post('/categorias-edit/:id', function (req, res, next) {
    let id = req.params.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;

    var form_data = {
        nombre: nombre,
        descripcion: descripcion
    }
    dbConn.query('UPDATE categorias SET ? WHERE id=' + id, form_data, function (err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', 'Categoria actualizada correctamente');
            res.redirect('../categorias');
        }
    })

});

router.get('/categorias-del/(:id)', function (req, res, next) {
    let id = req.params.id;
    dbConn.query('DELETE FROM categorias WHERE id=' + id, function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('../categorias')
        } else {
            req.flash('success', 'Registro eliminado con ID = ' + id)
            res.redirect('../categorias')
        }
    })
})

router.get('/oferta', function (req, res, next) {
    res.render('admin/oferta');
});

router.get('/perfil', function (req, res, next) {
    res.render('admin/perfil');
});

router.get('/mioferta', function (req, res, next) {
    res.render('admin/mioferta');
});


router.get('/descripcion', function (req, res, next) {
    res.render('admin/descripcion');
});

router.get('/ajustes', function (req, res, next) {
    res.render('admin/ajustes');
});
// oferta 
router.get('/mioferta-edit', function (req, res, next) {
    res.render('admin/mioferta-edit');
});
// oferta 
router.get('/mioferta-postulantes', function (req, res, next) {
    res.render('admin/mioferta-postulantes');
});


router.get('/empresa-ver', function (req, res, next) {
    res.render('admin/empresa-ver');
});



/* DOCENTE */

router.get('/monitoreo', function (req, res, next) {
    res.render('admin/monitoreo');
});

router.get('/monitoreo', function (req, res, next) {
    dbConn.query('SELECT * FROM monitoreo ORDER BY id desc', function (err, rows) {

        if (err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('admin/monitoreo', { data: '' });
        } else {
            res.render('admin/monitoreo', { data: rows });
        }
    });

});

module.exports = router;