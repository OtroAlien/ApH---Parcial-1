async function obtenerLibros() {
    try {
      const response = await fetch('/api/libros');
      const libros = await response.json();
  
      const contenedorLibros = document.getElementById('contenedorLibros');
      contenedorLibros.innerHTML = '';
  
      libros.forEach(libro => {
        const card = document.createElement('div');
        card.classList.add('col', 'mb-4');
        card.innerHTML = `
        <div class="card">
        <img src="${libro.imagen}" class="card-img-top" alt="Imagen del libro">
        <div class="card-body">
          <h3 class="card-title">${libro.nombre}</h3>
          <p class="card-text">Autor: ${libro.autor}</p>
          <p class="card-text">Género: ${libro.genero}</p>
          <p class="card-text">ID: ${libro._id}</p>
          <div class="botones">
            <button class="btn btn-danger" onclick="eliminarDocumento('${libro._id}')">Eliminar</button>
            <button class="btn btn-warning" onclick="editarDocumento('${libro._id}')">Editar</button>
          </div>
          </div>
        </div>
      </div>
        `;
        contenedorLibros.appendChild(card);
      });
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  }
  
  async function filtrarPorOrdenAlfabetico() {
      try {
        const response = await fetch('/api/libros');
        let libros = await response.json();
    
        libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
        mostrarLibrosEnTarjetas(libros);
      } catch (error) {
        console.error('Error al filtrar libros por orden alfabético:', error);
      }
    }
  
    async function filtrarPorAutor() {
      const autorSeleccionado = document.getElementById('filtroAutor').value;
      if (autorSeleccionado) {
        try {
          const response = await fetch(`/api/libros/filtrarPorAutor?autor=${encodeURIComponent(autorSeleccionado)}`);
          const librosFiltrados = await response.json();
          mostrarLibrosEnTarjetas(librosFiltrados);
        } catch (error) {
          console.error('Error al filtrar libros por autor:', error);
        }
      }
    }
    
    async function filtrarPorGenero() {
      const generoSeleccionado = document.getElementById('filtroGenero').value;
      if (generoSeleccionado) {
        try {
          const response = await fetch(`/api/libros/filtrarPorGenero?genero=${encodeURIComponent(generoSeleccionado)}`);
          const librosFiltrados = await response.json();
          mostrarLibrosEnTarjetas(librosFiltrados);
        } catch (error) {
          console.error('Error al filtrar libros por género:', error);
        }
      }
    }
    
    async function buscarLibros() {
      const busqueda = document.getElementById('inputBusqueda').value.trim();
      if (busqueda) {
        try {
          const response = await fetch(`/api/libros/buscarLibros?busqueda=${encodeURIComponent(busqueda)}`);
          const librosFiltrados = await response.json();
          mostrarLibrosEnTarjetas(librosFiltrados);
        } catch (error) {
          console.error('Error al buscar libros:', error);
        }
      }
    }        
  
  window.onload = async () => {
      obtenerLibros();
      await cargarAutores();
      await cargarGeneros();
  };  
        
    async function traerDocumento() {
      try {
        const id = document.getElementById('inputIdDocumento').value;
        const response = await fetch(`/api/libros/${id}`);
        const documento = await response.json();
        mostrarLibrosEnTarjetas([documento]);
      } catch (error) {
        console.error('Error al traer el documento:', error);
      }
    }  
  
  async function actualizarDocumento() {
    try {
      const id = document.getElementById('inputIdActualizar').value;
      const newData = {};
      const response = await fetch(`/api/libros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const updatedDocumento = await response.json();
  
      console.log(updatedDocumento);
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
    }
  }
  
  async function eliminarDocumento(id) {
    try {
      const response = await fetch(`/api/libros/${id}`, {
        method: 'DELETE'
      });
      const deletedDocumento = await response.json();
      console.log(deletedDocumento);
      obtenerLibros();
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  }
  
  async function editarDocumento(id) {
    try {
      const response = await fetch(`/api/libros/${id}`);
      const libro = await response.json();
  
      const nombre = prompt('Nuevo nombre:', libro.nombre);
      const autor = prompt('Nuevo autor:', libro.autor);
      const genero = prompt('Nuevo género:', libro.genero);
      const imagen = prompt('Nueva URL de la imagen:', libro.imagen);
  
      if (nombre && autor && genero && imagen) {
        const newData = { nombre, autor, genero, imagen };
  
        const response = await fetch(`/api/libros/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        });
  
        const updatedDocumento = await response.json();
        console.log(updatedDocumento);
        obtenerLibros();
      } else {
        console.error('Por favor, complete todos los campos.');
      }
    } catch (error) {
      console.error('Error al editar el documento:', error);
    }
  }
  
  window.onload = () => {
    obtenerLibros();
  };
  
  window.onload = async () => {
      obtenerLibros();
      await cargarAutores();
      await cargarGeneros();
    };
    
    async function mostrarLibrosEnTarjetas(libros) {
      const contenedorLibros = document.getElementById('contenedorLibros');
      contenedorLibros.innerHTML = '';
    
      libros.forEach(libro => {
        const card = document.createElement('div');
        card.classList.add('col', 'mb-4');
        card.innerHTML = `
          <div class="card">
            <img src="${libro.imagen}" class="card-img-top" alt="Imagen del libro">
            <div class="card-body">
              <h5 class="card-title">${libro.nombre}</h5>
              <p class="card-text">Autor: ${libro.autor}</p>
              <p class="card-text">Género: ${libro.genero}</p>
              <p class="card-text">ID: ${libro._id}</p>
              <div class="botones">
              <button class="btn btn-danger" onclick="eliminarDocumento('${libro._id}')">Eliminar</button>
              <button class="btn btn-warning" onclick="editarDocumento('${libro._id}')">Editar</button>
            </div>
            </div>
          </div>
        `;
        contenedorLibros.appendChild(card);
      });
    }

    async function cargarAutores() {
      try {
        const response = await fetch('/api/libros/autores');
        const autores = await response.json();
    
        const filtroAutor = document.getElementById('filtroAutor');
        autores.forEach(autor => {
          const option = document.createElement('option');
          option.text = autor;
          option.value = autor;
          filtroAutor.appendChild(option);
        });
      } catch (error) {
        console.error('Error al cargar autores:', error);
      }
    }
    
    async function cargarGeneros() {
      try {
        const response = await fetch('/api/libros/generos');
        const generos = await response.json();
    
        const filtroGenero = document.getElementById('filtroGenero');
        generos.forEach(genero => {
          const option = document.createElement('option');
          option.text = genero;
          option.value = genero;
          filtroGenero.appendChild(option);
        });
      } catch (error) {
        console.error('Error al cargar géneros:', error);
      }
    }