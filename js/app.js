
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBMnTzHyfzLojsxHKBC6EOevJKyOO-ICgk",
    authDomain: "proyectofinal-4db04.firebaseapp.com",
    databaseURL: "https://proyectofinal-4db04-default-rtdb.firebaseio.com",
    projectId: "proyectofinal-4db04",
    storageBucket: "proyectofinal-4db04.appspot.com",
    messagingSenderId: "39926166780",
    appId: "1:39926166780:web:e6a94703c3047023b59379"
  };


  const app = initializeApp(firebaseConfig);



const btnEnviar = document.getElementById('btnEnviar');


btnEnviar.addEventListener("click", function(event) {
  event.preventDefault(); 
  const email = document.getElementById('txtEmail').value;
  const password = document.getElementById('txtPassword').value;

  
  const auth = getAuth();

  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
  
      const user = userCredential.user;
      alert(`Usuario autenticado${user.email}`);

 
      window.location.href = "/html/menu.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error durante la autenticación: ${errorMessage}`);
   });
   
});
