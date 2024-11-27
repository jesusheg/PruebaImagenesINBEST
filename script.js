function validateLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  // Limpiar mensajes de error anteriores
  errorMessage.textContent = '';

  // Validar datos (por ejemplo, comparando con un valor ficticio)
  if (username === 'admin' && password === '1234') {
    alert('Bienvenido, ' + username + '!');
    // Aquí puedes redirigir al usuario a otra página
    window.location.href = "Pictures.html";
  } else {
    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
  }
}

// Obtener el elemento canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Obtener el elemento input para subir la imagen
const inputImagen = document.getElementById('input-imagen');

let imageLoaded = false;

// Función para cargar la imagen
function cargarImagen(event) {
  const imagen = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const imagenData = event.target.result;
    const imagenObj = new Image();
    imagenObj.onload = () => {
      canvas.width = imagenObj.width;
      canvas.height = imagenObj.height;
      ctx.drawImage(imagenObj, 0, 0);
    };
    imagenObj.src = imagenData;

  };

  reader.readAsDataURL(imagen);
  imageLoaded = true;
}

// Función para aplicar efectos a la imagen
function aplicarEfecto(efecto) {
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const datosPixels = pixels.data;

  switch (efecto) {
    case 'grises':
      for (let i = 0; i < datosPixels.length; i += 4) {
        const promedio = (datosPixels[i] + datosPixels[i + 1] + datosPixels[i + 2]) / 3;
        datosPixels[i] = promedio;
        datosPixels[i + 1] = promedio;
        datosPixels[i + 2] = promedio;
      }
      break;
    case 'brillo':
      const brillo = document.getElementById('brillo').value;
      for (let i = 0; i < datosPixels.length; i += 4) {
        datosPixels[i] += brillo;
        datosPixels[i + 1] += brillo;
        datosPixels[i + 2] += brillo;
      }
      break;
    default:
      break;
  }

  ctx.putImageData(pixels, 0, 0);
}

// Función para guardar la imagen
function guardarImagen() {
  if (imageLoaded) {
    const imagenDataURL = canvas.toDataURL('image/png');
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = imagenDataURL;
    enlaceDescarga.download = 'imagen.png';
    enlaceDescarga.click();
  } else {
    alert("No hay imagen que guardar");
  }

}

// Evento para guardar la imagen
document.getElementById('boton-guardar').addEventListener('click', guardarImagen);


// Evento para cargar la imagen
inputImagen.addEventListener('change', cargarImagen);

// Evento para aplicar efectos
document.getElementById('boton-grises').addEventListener('click', () => {
  aplicarEfecto('grises');
});

document.getElementById('boton-brillo').addEventListener('click', () => {
  aplicarEfecto('brillo');
});

document.getElementById('boton-nueva').addEventListener('click', () => {
  window.location.href = "Pictures.html";
});

// Función para cambiar el tamaño de píxeles de la imagen
function cambiarTamanoPixeles(tamano) {
  const imagenData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const datosPixeles = imagenData.data;

  // Redimensionar la imagen
  const nuevoAncho = Math.floor(canvas.width / tamano) + tamano;
  const nuevoAlto = Math.floor(canvas.height / tamano) + tamano;
  const nuevoCanvas = document.createElement('canvas');
  nuevoCanvas.width = nuevoAncho;
  nuevoCanvas.height = nuevoAlto;
  const nuevoCtx = nuevoCanvas.getContext('2d');

  // Dibujar la imagen redimensionada
  nuevoCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, nuevoAncho, nuevoAlto);

  // Obtener la imagen redimensionada
  const nuevaImagenData = nuevoCtx.getImageData(0, 0, nuevoAncho, nuevoAlto);
  const nuevosDatosPixeles = nuevaImagenData.data;

  // Dibujar la imagen redimensionada en el canvas original
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(nuevaImagenData, 0, 0);
}


// Evento para cambiar el tamaño de píxeles de la imagen
document.getElementById('boton-cambiar-tamano').addEventListener('click', () => {
  const tamano = parseInt(document.getElementById('tamano-pixeles').value);
  cambiarTamanoPixeles(tamano);
});


var images = [
  "imagen",
  "imagen",
  "imagen",
  "imagen",
  "imagen",
  "imagen",
  "imagen",
  "imagen",
  "imagen",
  "imagen"


];

// Contenedor de las imágenes
var container = document.getElementById("imageContainer");

// Iterar sobre el arreglo y mostrar las imágenes
var i = 1;
images.forEach(function (imageSrc) {
  var img = document.createElement("img");
  img.src = "./Imagenes/" + imageSrc + " (" + i + ").png";  // Establecer la ruta de la imagen
  img.alt = "Proxima imagen se mostrara aqui";  // Texto alternativo
  img.width = 150;  // Establecer el ancho de la imagen
  img.height = 150; // Establecer la altura de la imagen
  container.appendChild(img);  // Agregar la imagen al contenedor
  i++;
});