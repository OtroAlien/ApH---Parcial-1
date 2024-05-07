import mongoose from 'mongoose';

const { Schema } = mongoose;

const LibroSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  }
});

const Libro = mongoose.model('Libro', LibroSchema);

export default Libro;
