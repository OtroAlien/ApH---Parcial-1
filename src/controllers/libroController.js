import Libro from '../models/libroModel.js';

const autenticar = (req, res, next) => {
  const token = req.query.token;
  if (token !== 'mi_token_secreto') {
    return res.status(401).json({ mensaje: 'Acceso no autorizado' });
  }
  next();
};

const crearLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!libro) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
      return;
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if (!libro) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
      return;
    }
    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerTodosLosLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
      return;
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerAutores = async (req, res) => {
  try {
    const autores = await Libro.distinct('autor');
    res.json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerGeneros = async (req, res) => {
  try {
    const generos = await Libro.distinct('genero');
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filtrarPorAutor = async (req, res) => {
  try {
    const autor = req.query.autor;
    const libros = await Libro.find({ autor });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filtrarPorGenero = async (req, res) => {
  try {
    const genero = req.query.genero;
    const libros = await Libro.find({ genero });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarLibros = async (req, res) => {
  try {
    const busqueda = req.query.busqueda;
    const librosEncontrados = await Libro.find({ nombre: { $regex: new RegExp(busqueda, "i") } });
    res.json(librosEncontrados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { autenticar, crearLibro, actualizarLibro, eliminarLibro, obtenerTodosLosLibros, filtrarPorAutor, filtrarPorGenero, obtenerLibroPorId, obtenerAutores, obtenerGeneros, buscarLibros };


