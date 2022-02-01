const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')
const port = 3001;
//Iniciamos en app el servidore web
const app = express()
//Agregamos CORS (politicas de seguridad)
// PAra que otros dominios (react localhost:3000) puedan acceder a nuestros datos
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor OK !!!');
})

app.get('/libro', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM libro', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

// Obtener solo un profesor
app.get('/libro/:idlibro', (req, res) => {
    const { idlibro } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM libro WHERE idlibro = ?', [idlibro],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

                    //REquest peticion     response  response
app.post('/libro', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO LIBRO     
                (titulo, anio) VALUES
                 (?,?)`;

    cn.execute(
        query, [body.titulo, body.anio],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//update
app.put('/libro', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE LIBRO     
                SET titulo=?, anio=?=? 
                WHERE idlibro = ?`;
    cn.execute(
        query, [body.titulo, body.anio, body.idlibro],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//
//
//                      Tabla lector
//
//

app.get('/lector', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM lector', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

// Obtener solo un lector
app.get('/lector/:idlector', (req, res) => {
    const { idlector } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM lector WHERE idlector = ?', [idlector],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

                    //REquest peticion     response  response
app.post('/lector', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO LECTOR     
                (titulo, anio) VALUES
                 (?,?)`;

    cn.execute(
        query, [body.nombre, body.apellido, body.telefono],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//update
app.put('/lector', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE LECTOR     
                SET nombre=?, apellido=?, telefono=?=? 
                WHERE idlector = ?`;
    cn.execute(
        query, [body.nombre, body.apellido, body.telefono, body.idlector],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})






//Habilitamos el servidor en el puerto indicado
//En esta caso sera 3001 porque el 3000 ya es usado por React
app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})