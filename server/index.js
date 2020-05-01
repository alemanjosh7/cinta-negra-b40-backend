const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const Users = require('../models/Users');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
 
// parse application/json
app.use(express.json())

// Endpoints
app.get('/', (req, res) => res.send('Hello World!'));

// CRUD Users

// Create
app.post('/api/v1/users', (req, res) => {
    Users.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(err => res.status(400).res.send({message: 'Error creating user', err}));
});
// GET (ALL)
app.get('/api/v1/users', (req, res) => {
    Users.find(req.body)
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).res.send({message: 'Users not found', err}));
});
//GET (BY ID)
app.get('/api/v1/users/:id', (req, res) => {
    // Obtener ID desde params
    const { id } = req.params;
    // Obtener pelicula por ID de la base de datos
    Users.findById(id)
      .then(user => {
        if (!user) res.status(404).json('User not found');
        res.json(user)
      })
      .catch(err => res.status(404).json(err));
  });

  // PATCH
app.patch('/api/v1/users/:id', (req, res) => {
    // Obtener pelicula por ID de la base de datos
    const { body } = req;
    const { id } = req.params;
    // Encontrar y actualizar pelicula por ID a partir del body que me manda el cliente
    Users.findByIdAndUpdate(id, body, {new: true})
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
})

// DELETE
app.delete('/api/v1/users/:id', (req, res) => {
    // Obtener pelicula por ID de la base de datos
    const { id } = req.params;
    // Encontrar y actualizar pelicula por ID a partir del body que me manda el cliente
    Users.findByIdAndDelete(id, body, {new: true})
        .then(deletedUser => res.json(deletedUser))
        .catch(err => res.status(400).json(err));
})



// exportar app para poder requerirlo desde otros archivos
module.exports = { app, PORT };