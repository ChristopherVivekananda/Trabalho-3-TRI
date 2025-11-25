// IMPORTAR FIREBASE (MESMA VERSÃO PARA TUDO)
import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// CONFIG DO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyDx7AWpAE77LailL-7HZZprlpNcJpFWX0Y",
    authDomain: "login-fa00d.firebaseapp.com",
    projectId: "login-fa00d",
    storageBucket: "login-fa00d.firebasestorage.app",
    messagingSenderId: "460839006119",
    appId: "1:460839006119:web:7383cc3459add8d4a95082",
    measurementId: "G-L0040BDWDY"
};

// INICIAR FIREBASE (UMA VEZ SÓ!)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            alert("Login realizado com sucesso!");
            window.location.href = "painel.html"; 
        })
        .catch((error) => {
            alert("Erro no login: " + error.message);
        });
});

// REGISTRAR
window.handleSignup = function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            alert("Conta criada com sucesso!");
        })
        .catch((error) => {
            alert("Erro ao cadastrar: " + error.message);
        });
};

// ESQUECI A SENHA
window.handleForgotPassword = function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    if (!email) {
        alert("Digite seu email antes!");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Email de recuperação enviado!");
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
};
