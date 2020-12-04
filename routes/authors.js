const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 *Consultar los nombres y los apellidos
  *de los autores que tengan publicaciones inferiores o iguales a 20 y su país sea Colombia.
 */
router.get('Menor-Igual-20-Colombia', async (req, res) => {
  try {
    const authors = await Author.find({ $and: [{ publicados: { $lte: 20 } }, {pais: 'Colombia' }] }, { nombre: 1, apellidos: 1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * consultar los nombres de los autores que  tengan apellido en la base de datos.
 */
router.get('/Con-apellido', async (req, res) => {
  try {
    const authors = await Author.find({ apellido: { $exists: true } }, { nombre: 1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * consultar los apellidos de los autores que tengan mas de 20 publicaciones.
 * o que su pais sea Argentina
 */
router.get('/mas-20-argentinos', async (req, res) => {
  try {
    const authors = await Author.find({ $or: [{ publicados: { $gt: 20 } }, { pais: 'Argentina' }] }, { apellidos: 1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Creando nuevo autor
 */
router.post('/authors', async (req, res) => {
  try {
    const author = await Author.save({ nombre: ' Gabriel ', new: true }, { apellido: ' Garcia ', new: true }, { publicados: 26, new: true }, { pais: ' Colombia ', new: true }); 
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/authors', async (req, res) => {
  try {
    const author = await Author.save({ nombre: ' Alvaro ', new: true }, { apellido: ' Mutis ', new: true }, { publicados: 18, new: true }, { pais: ' Colombia ', new: true }); 
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/authors', async (req, res) => {
  try {
    const author = await Author.save({ nombre: ' León de Greiff ', new: true }, { publicados: 15, new: true }, { pais: ' Colombia ', new: true }); 
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/authors', async (req, res) => {
  try {
    const author = await Author.save({ nombre: ' Jorge Luis ', new: true }, { apellido: ' Borges ', new: true }, { publicados: 20, new: true }, { pais: ' Argentina ', new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
