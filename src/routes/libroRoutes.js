import express from 'express';
import { obtenerTodosLosLibros, obtenerLibroPorId, actualizarLibro, eliminarLibro, obtenerAutores, obtenerGeneros, filtrarPorAutor, filtrarPorGenero, buscarLibros } from '../controllers/libroController.js';

const router = express.Router();

router.get('/', obtenerTodosLosLibros);
router.get('/autores', obtenerAutores);
router.get('/generos', obtenerGeneros);
router.get('/filtrarPorAutor', filtrarPorAutor);
router.get('/filtrarPorGenero', filtrarPorGenero);
router.get('/buscarLibros', buscarLibros);
router.get('/:id', obtenerLibroPorId);
router.put('/:id', actualizarLibro);
router.delete('/:id', eliminarLibro);

export default router;
