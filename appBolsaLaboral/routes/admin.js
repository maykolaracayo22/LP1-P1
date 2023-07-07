var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

/* GET home page. */

/* EGRESADO */

router.get('/egresado-ol', function(req, res, next) {
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

router.get('/admin-edit/(:id)', function(req, res, next) {
    let id = req.params.id;
    //console.log(id);
    dbConn.query('SELECT * FROM usuarios WHERE id='+id,function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Ninguna usuarios tiene el id = '+id)
            res.redirect('admin/admin')
        }
        else {
            res.render('admin/admin-edit', {
                id: rows[0].id,
                email: rows[0].email,
                password: rows[0].password,
            
                rol: rows[0].rol
            })
        }
    })
});

router.post('/admin-edit/:id', function(req, res, next) {
    let id = req.body.id;
    let email = req.body.email;
    let password = req.body.password;
    let rol = req.body.rol;

    var form_data = {
  
        email: email,
        password: password,
        rol: rol
    }
    dbConn.query('UPDATE usuarios SET ? WHERE id='+id,form_data,function(err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', 'Categoria actualizada correctamente');
            res.redirect('../admin');
        }
    })
    
});

router.get('/admin-del/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConn.query('DELETE FROM usuarios WHERE id='+id,function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('../admin')
        } else {
            req.flash('success', 'Registro eliminado con ID = ' + id)
            res.redirect('../admin')
        }
    })
});
/* EMPRESA */

router.get('/empresa-ver', function (req, res, next) {
    res.render('admin/empresa-ver');
});


/* CATEGORIAS */

router.get('/categorias', function (req, res, next) {
    dbConn.query('SELECT * FROM oferta_laboral ORDER BY id desc', function (err, rows) {
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

    let descripcion = req.body.descripcion;
    let fecha_inicio = req.body.fecha_inicio;
    let fecha_fin = req.body.fecha_fin;
    let estado = req.body.estado;
    let salario = req.body.salario;
    let jornada_laboral = req.body.jornada_laboral;
    let turno = req.body.turno;

    //console.log(nombre);

    var form_data = {
       
        descripcion: descripcion,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin,
        estado:estado,
        salario:salario,
        jornada_laboral :jornada_laboral,
        turno :turno
    }
    dbConn.query('INSERT INTO oferta_laboral SET ?', form_data, function (err, result) {
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
    dbConn.query('SELECT * FROM oferta_laboral WHERE id=' + id, function (err, rows, fields) {
        if (err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Ninguna categoria tiene el id = ' + id)
            res.redirect('admin/categorias')
        }
        else {
            res.render('admin/categorias-edit', {
                id: rows[0].id,
                descripcion: rows[0].descripcion,
                fecha_inicio:rows[0].fecha_inicio,
                fecha_fin:rows[0].fecha_fin,
                estado:rows[0].estado,
                salario:rows[0].salario,
                jornada_laboral :rows[0].jornada_laboral,
                turno :rows[0].turno

            })
        }
    })
});

router.post('/categorias-edit/:id', function (req, res, next) {
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let fecha_inicio = req.body.fecha_inicio;
    let fecha_fin = req.body.fecha_fin;
    let estado = req.body.estado;
    let salario = req.body.salario;
    let jornada_laboral = req.body.jornada_laboral;
    let turno = req.body.turno;

    var form_data = {
        descripcion: descripcion,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin,
        estado:estado,
        salario:salario,
        jornada_laboral :jornada_laboral,
        turno :turno
    }
    dbConn.query('UPDATE oferta_laboral SET ? WHERE id=' + id, form_data, function (err, result) {
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
    dbConn.query('DELETE FROM oferta_laboral WHERE id=' + id, function (err, result) {
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



router.get('/monitoreo', function(req, res, next) {
    dbConn.query('SELECT * FROM monitoreo ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('admin/monitoreo',{data:''});   
        } else {
            res.render('admin/monitoreo',{data:rows});
        }
    });

/*Egresado ol*/
router.get('/egresado-ol', function(req, res, next) {
  dbConn.query('SELECT * FROM oferta_laboral ORDER BY ol_id desc',function(err,rows){
    if(err) {
        req.flash('error', err);
        res.render('admin/egresado-ol',{data:'[]'});   
    }else {
        res.render('admin/egresado-ol',{data:rows});
    }
});
});
/*perfil-empresa ol*/
router.get('/perfil-empresa', function(req, res, next) {
    dbConn.query('SELECT * FROM oferta_laboral ORDER BY ol_id desc',function(err,rows){
      if(err) {
          req.flash('error', err);
          res.render('admin/perfil-empresa',{data:'[]'});   
      }else {
          res.render('admin/perfil-empresa',{data:rows});
      }
  });

  /*mioferta */
router.get('/mioferta', function(req, res, next) {
    dbConn.query('SELECT * FROM oferta_laboral ORDER BY ol_id desc',function(err,rows){
      if(err) {
          req.flash('error', err);
          res.render('admin/mioferta',{data:'[]'});   
      }else {
          res.render('admin/mioferta',{data:rows});
      }
   });
});
router.get('/mioferta-add', function(req, res, next) {
    res.render('admin/mioferta-add');
});

router.post('/mioferta-add', function(req, res, next) {
    let ol_id = req.params.ol_id;
    let ol_descripcion = req.body.ol_descripcion;
    let ol_fecha_inicio = req.body.ol_fecha_inicio;
    let ol_fecha_fin = req.body.ol_fecha_fin;
    let ol_estado = req.body.ol_estado;
    let ol_salario = req.body.ol_salario;
    let ol_jornada_laboral = req.body.ol_jornada_laboral;
    let ol_turno = req.body.ol_turno;
    //console.log(nombre);

    var form_data = {
        ol_id: ol_id,
        ol_descripcion :ol_descripcion,
        ol_fecha_inicio:ol_fecha_inicio,
        ol_fecha_fin:ol_fecha_fin,
        ol_estado:ol_estado,
        ol_salario:ol_salario,
        ol_jornada_laboral :ol_jornada_laboral,
        ol_turno :ol_turno
    }
    dbConn.query('INSERT INTO oferta_laboral SET ?', form_data, function(err, result) {
        if (err) {
            req.flash('error', err);
        }else {                
            req.flash('success', 'mioferta registrada satisfactoriamente');
            res.redirect('../admin/mioferta');
        }
    })
    
});

router.get('/mioferta-edit/(:ol_id)', function(req, res, next) {
    let ol_id = req.params.ol_id;
    //console.log(id);
    dbConn.query('SELECT * FROM oferta_laboral WHERE ol_id='+id,function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Ninguna categoria tiene el ol_id = '+id)
            res.redirect('admin/mioferta')
        }
        else {
            res.render('admin/mioferta-edit', {
                ol_id:rows[0]. ol_id,
                ol_descripcion :rows[0].ol_descripcion,
                ol_fecha_inicio:rows[0].ol_fecha_inicio,
                ol_fecha_fin:rows[0].ol_fecha_fin,
                ol_estado:rows[0].ol_estado,
                ol_salario:rows[0].ol_salario,
                ol_jornada_laboral :rows[0].ol_jornada_laboral,
                ol_turno :rows[0].ol_turno
               
            })
        }
    })
});

router.post('/mioferta-edit/(:ol_id)', function(req, res, next) {
    let ol_id = req.params.ol_id;
    let ol_descripcion = req.body.ol_descripcion;
    let ol_fecha_inicio = req.body.ol_fecha_inicio;
    let ol_fecha_fin =req.body.ol_fecha_fin;
    let ol_estado = req.body.ol_estado;
    let ol_salario = req.body.ol_salario;
    let ol_jornada_laboral = req.body.ol_jornada_laboral;
    let ol_turno = req.body.ol_turno; 


    var form_data = {
        ol_id: ol_id,
        ol_descripcion :ol_descripcion,
        ol_fecha_inicio:ol_fecha_inicio,
        ol_fecha_fin:ol_fecha_fin,
        ol_estado:ol_estado,
        ol_salario:ol_salario,
        ol_jornada_laboral :ol_jornada_laboral,
        ol_turno :ol_turno
    }
    dbConn.query('UPDATE oferta_laboral SET ? WHERE ol_id='+id,form_data,function(err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', 'Mioferta actualizada correctamente');
            res.redirect('../mioferta');
        }
    })
    
});

router.get('/mioferta-del/(:ol_id)', function(req, res, next) {
    let ol_id = req.params.ol_id;
    dbConn.query('DELETE FROM oferta_laboral WHERE ol_id='+id,function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('../mioferta')
        } else {
            req.flash('success', 'Registro eliminado con ID = ' + id)
            res.redirect('../mioferta')
        }
    })
});


//*egresado ol */
router.get('/egresado-ol', function(req, res, next) {
    dbConn.query('SELECT * FROM oferta_laboral ORDER BY ol_id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('admin/egresado-ol',{data:'[]'});   
        } else {
            res.render('admin/egresado-ol',{data:rows});
        }
    });

  });

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

            req.flash('error', err);
        } else {

            req.flash('success', 'Registrado satisfactoriamente');
            res.redirect('../admin/crear-usuario-emp');
        }
    })

});

//*egresado ol */
router.get('/egresado-ol', function(req, res, next) {
    dbConn.query('SELECT * FROM oferta_laboral ORDER BY ol_id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('admin/egresado-ol',{data:'[]'});   
        } else {
            res.render('admin/egresado-ol',{data:rows});
        }
    });

  });

module.exports = router;