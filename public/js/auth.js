import { auth, database } from "./firebase-config.js";
import { 
    GoogleAuthProvider, signInWithPopup, 
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Google Sign-In
export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(userCredential => {
            const user = userCredential.user;
            const userRef = ref(database, "users/" + user.uid);
            get(userRef).then(snapshot => {
                if (!snapshot.exists()) {
                    set(userRef, { voltage: 0, current: 0 });
                }
            });
            alert("Login Successful!");
            localStorage.setItem("userUID", user.uid);
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
}

// Email & Password Sign-In
export function signInWithEmail() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("Login Successful!");
            localStorage.setItem("userUID", userCredential.user.uid);
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
}

// Email & Password Sign-Up
export function signUpWithEmail() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            set(ref(database, "users/" + user.uid), { voltage: 0, current: 0 });
            alert("Account Created Successfully!");
        })
        .catch(error => alert(error.message));
}

// Password Reset
export function resetPassword() {
    const email = document.getElementById("email").value;
    sendPasswordResetEmail(auth, email)
        .then(() => alert("Password Reset Email Sent!"))
        .catch(error => alert(error.message));
}
