// admin.js

// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBMnTzHyfzLojsxHKBC6EOevJKyOO-ICgk",
    authDomain: "proyectofinal-4db04.firebaseapp.com",
    projectId: "proyectofinal-4db04",
    storageBucket: "proyectofinal-4db04.appspot.com",
    messagingSenderId: "39926166780",
    appId: "1:39926166780:web:e6a94703c3047023b59379"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
document.addEventListener('DOMContentLoaded', function() {
    // Asignar manejadores de eventos a los botones
    document.getElementById('agregar-producto').addEventListener('click', agregarProducto);
    document.getElementById('buscar-producto').addEventListener('click', buscarProducto);
    document.getElementById('deshabilitar-producto').addEventListener('click', deshabilitarProducto);
    document.getElementById('actualizar-producto').addEventListener('click', actualizarProducto);
    document.getElementById('limpiar-formulario').addEventListener('click', limpiarFormulario);
});

function agregarProducto(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    var codigo = document.getElementById('codigo').value;
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var status = document.getElementById('status').value;
    var imagen = document.getElementById('imagen').files[0];

    // Subir imagen y luego guardar los datos del producto
    subirImagenYGuardarDatos(codigo, nombre, precio, status, imagen);
}

function buscarProducto() {
    var codigo = document.getElementById('codigo').value;
    const prodRef = ref(database, 'productos/' + codigo);

    onValue(prodRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            mostrarDetallesProducto(data);
        } else {
            console.log("Producto no encontrado");
            // Puedes actualizar la interfaz de usuario para mostrar que el producto no se encuentra
        }
    }, (error) => {
        console.error("Error al buscar producto: ", error);
    });
}

function mostrarDetallesProducto(producto) {
    const detallesDiv = document.getElementById('product-details');
    detallesDiv.innerHTML = `
        
        <p><strong>Nombre:</strong> ${producto.nombre}</p>
        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Estado:</strong> ${producto.status}</p>
        <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 200px;">
    `;
}


function deshabilitarProducto() {
    var codigo = document.getElementById('codigo').value;

    // Crear una referencia al producto específico en Firebase Database
    const prodRef = ref(database, 'productos/' + codigo);

    // Actualizar el estado del producto en Firebase
    update(prodRef, { status: 'Deshabilitado' })
        .then(() => {
            console.log("Producto deshabilitado con éxito");

            // Mostrar mensaje de éxito en la página
            mostrarMensaje("Producto deshabilitado con éxito");
        })
        .catch((error) => {
            console.error("Error al deshabilitar el producto: ", error);

            // Opcionalmente, mostrar mensaje de error
            mostrarMensaje("Error al deshabilitar el producto");
        });
}

function mostrarMensaje(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = mensaje;
}


function actualizarProducto() {
    var codigo = document.getElementById('codigo').value;
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var status = document.getElementById('status').value;

    const prodRef = ref(database, 'productos/' + codigo);

    update(prodRef, {
        nombre: nombre,
        precio: precio,
        status: status
    })
    .then(() => {
        mostrarMensaje("Producto actualizado con éxito");
    })
    .catch((error) => {
        mostrarMensaje("Error al actualizar el producto: " + error.message);
    });
}


function limpiarFormulario() {
    // Resetear el formulario
    document.getElementById('product-form').reset();

    // Limpiar el div de resultados de búsqueda
    const detallesDiv = document.getElementById('product-details');
    if (detallesDiv) {
        detallesDiv.innerHTML = '';
    }
}

function subirImagenYGuardarDatos(codigo, nombre, precio, status, imagen) {
    // Usando storageRef de Firebase para crear una referencia al lugar donde se guardará la imagen
    var imgStorageRef = storageRef(storage, 'imagenes/' + imagen.name);

    // Subiendo la imagen
    var uploadTask = uploadBytes(imgStorageRef, imagen);

    uploadTask.then((snapshot) => {
        // Obtener la URL de descarga
        return getDownloadURL(snapshot.ref);
    }).then((downloadURL) => {
        // Guardar los datos del producto en Firebase Database
        const prodRef = ref(database, 'productos/' + codigo);
        set(prodRef, {
            nombre: nombre,
            precio: precio,
            status: status,
            imagen: downloadURL
        });
    }).catch((error) => {
        console.error("Error al subir imagen: ", error);
    });
}


function mostrarDatosProducto(producto) {
    if (producto) {
        // Mostrar los datos del producto...
    } else {
        // Producto no encontrado...
    }
}


