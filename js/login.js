// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMnTzHyfzLojsxHKBC6EOevJKyOO-ICgk",
    authDomain: "proyectofinal-4db04.firebaseapp.com",
    projectId: "proyectofinal-4db04",
    storageBucket: "proyectofinal-4db04.appspot.com",
    messagingSenderId: "39926166780",
    appId: "1:39926166780:web:e6a94703c3047023b59379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const loginForm = document.getElementById('login-form');
const messageBox = document.getElementById('message-box'); // Agregamos un elemento para mostrar el mensaje

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Realiza la autenticación con Firebase
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // El usuario ha iniciado sesión exitosamente
            const user = userCredential.user;
            console.log('Usuario autenticado:', user);
            // Mostrar mensaje de "Autenticado correctamente"
            messageBox.textContent = "Autenticado correctamente";
            messageBox.style.color = "green";
            // Redirecciona a la página de administrador o realiza otras acciones necesarias
            window.location.href = '/html/menu.html'; // Cambia 'admin.html' al nombre de tu página de administrador
        })
        .catch((error) => {
            // Error en la autenticación
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error en la autenticación:', errorMessage);
            // Mostrar mensaje de "Credenciales inválidas"
            messageBox.textContent = "Credenciales inválidas";
            messageBox.style.color = "red";
        });
});
