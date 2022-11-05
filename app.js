var controladorAsig = require("./controladorAsig");
var Asignaturas = require("./Asignaturas");

var controladorDoce = require("./controladorDoce");
var Docentes = require("./Docentes");

var controladorEst = require("./controladorEst");
var Estudiantes = require("./Estudiantes");

var controladorRecord = require("./controladorRecord");
var RecordAcademico = require("./RecordAcademico");
var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');
const { request, response } = require("express");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var port = process.env.port || 8090;
app.listen(port);
console.log('running in the port ' + port);

//Verificacion de conexion
router.use((request, response, next) => {
    console.log('Has iniciado correctamente, Time: ', Date.now());
    next();
});

//Mostrar o obtener las asignaturas
router.route('/Asignaturas').get((request, response) => {
    controladorAsig.getAsignaturas().then(result => (
        response.json(result),
        console.log(result)
    ))
})
//Mostrar Asignaturas por Id
router.route('/Asignaturas/:Id').get((request, response) => {
    controladorAsig.getAsigId(request.params.Id).then(result => (
        response.json(result),
        console.log(result)
    ))
})
//Mostrar Docentes
router.route('/Docentes').get((request, response) => {
    controladorDoce.getDocentes().then(result => (
        response.json(result),
        console.log(result)
    ))
})
//Mostrar Docentes por Id
router.route('/Docentes/:Id').get((request, response) => {
    controladorDoce.getXId(request.params.Id).then(result => (
        response.json(result),
        console.log(result)
    ))
})
//Mostrar Aprobados
router.route('/Aprobados').get((request, response) => {
    controladorDoce.getAprobados().then(result => (
        response.json(result),
        console.log(result)
    ))
})

//Mostrar Estudiantes
router.route('/Estudiantes').get((request, response) => {
    controladorEst.getEstudiantes().then(result => (
        response.json(result),
        console.log(result)
    ))
})
//Mostrar Estudiantes por Id
router.route('/Estudiantes/:Id').get((request, response) => {
    controladorEst.getEstId(request.params.Id).then(result => (
        response.json(result),
        console.log(result)
    ))
})
//Mostrar record
router.route('/Record').get((request, response) => {
    controladorRecord.getRecord().then(result => (
        response.json(result),
        console.log(result)
    ))
})
//Mostrar Record por Id
router.route('/Record/:Id').get((request, response) => {
    controladorRecord.getRecId(request.params.Id).then(result => (
        response.json(result),
        console.log(result)
    ))
})

//Insertar asignaturas
router.route('/Asignaturas/insert').post((request, response) => {
    let asignaturas = { ...request.body }
    controladorAsig.postAsignatura(asignaturas).then(result => {
        response.status(201).json(result);
        console.log('Insertado')
    })
})

//Insertar Docentes
router.route('/Docentes/insert').post((request, response) => {
    let docentes = { ...request.body }
    controladorDoce.postDocentes(docentes).then(result => {
        response.status(201).json(result);
        console.log('Insertado')
    })
})
//Insertar Estudiantes
router.route('/Estudiantes/insert').post((request, response) => {
    let estudiantes = { ...request.body }
    controladorEst.postEstudiantes(estudiantes).then(result => {
        response.status(201).json(result);
        console.log('Insertado')
    })
})
//Insertar Record
router.route('/Record/insert').post((request, response) => {
    let record = { ...request.body }
    controladorRecord.postRecord(record).then(result => {
        response.status(201).json(result);
        console.log('Insertado')
    })
})

//Actualizar asignaturas por ID
router.route('/ActualizarAsig/:Id').put((request, response) => {
    let actualizar = { ...request.body }
    controladorAsig.updateAsig(actualizar, request.params.Id).then(result => {
        response.json(result);
        console.log('Actualizado')
    })
})

//Actualizar por Id Docentes
router.route('/ActualizarDoce/:Id').put((request, response) => {
    let ActualizarDoce = { ...request.body }
    controladorDoce.updateDoce(ActualizarDoce, request.params.Id).then(result => {
        response.json(result);
        console.log('Actualizado')
    })
})
//Actualizar estudiante por Id
router.route('/ActualizarEst/:Id').put((request, response) => {
    let ActualizarEst = { ...request.body }
    controladorEst.updateEstudiantes(ActualizarEst, request.params.Id).then(result => {
        response.json(result);
        console.log('Actualizado')
    })
})
//Actualizar Record por Id
router.route('/ActualizarRec/:Id').put((request, response) => {
    let ActualizarRec = { ...request.body }
    controladorRecord.updateRecord(ActualizarRec, request.params.Id).then(result => {
        response.json(result);
        console.log('Actualizado')
    })
})

//Eliminar Asignaturas por ID
router.route('/EliminarAsig/:Id').delete((request, response) => {
    controladorAsig.deleteAsig(request.params.Id).then(result => {
        response.json(result);
        console.log('Eliminado')
    })
})

//Eliminar Docentes por ID
router.route('/EliminarDoce/:Id').delete((request, response) => {
    controladorDoce.deleteDocen(request.params.Id).then(result => {
        response.json(result);
        console.log('Eliminado')
    })
})
//Eliminar Estudiante por Id
router.route('/EliminarEst/:Id').delete((request, response) => {
    controladorEst.deleteEst(request.params.Id).then(result => {
        response.json(result);
        console.log('Eliminado')
    })
})
//Eliminar Record por Id
router.route('/EliminarRec/:Id').delete((request, response) => {
    controladorRecord.deleteRec(request.params.Id).then(result => {
        response.json(result);
        console.log('Eliminado')
    })
})