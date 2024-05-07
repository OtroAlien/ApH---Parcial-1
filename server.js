import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

import libroRoutes from './src/routes/libroRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/biblioteca');

app.use('/api/libros', libroRoutes);

const viewsPath = path.join(process.cwd(), 'src', 'views');
app.use(express.static(viewsPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(viewsPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
