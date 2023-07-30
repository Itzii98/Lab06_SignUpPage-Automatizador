import dotenv from 'dotenv';
import firebase from 'firebase/app';
import 'firebase/database';

dotenv.config(); // Cargar variables de entorno de .env

// Configurar la conexión con Firebase utilizando las credenciales de .env
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos de Firebase
const database = firebase.database();

// Obtener el formulario y el campo de email
const form = document.querySelector('form');
const emailInput = document.getElementById('email');

// Agregar un evento para escuchar el envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;

  // Enviar el correo al servidor
  saveEmailToServer(email)
    .then((response) => {
      console.log(response); // Respuesta del servidor (opcional)
      emailInput.value = ''; // Limpiar el campo de email después de guardar
    })
    .catch((error) => {
      console.error('Error al enviar el correo al servidor:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    });
});

// Función para enviar el correo al servidor
function saveEmailToServer(email) {
  return fetch('/save-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  }).then((response) => response.json());
}