import { auth, database } from "./firebase-config.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// Google Sign-In
export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(userCredential => {
            const user = userCredential.user;
            const userRef = ref(database, "users/" + user.uid);
            
            // Check if user already has data, if not initialize it
            get(userRef).then(snapshot => {
                if (!snapshot.exists()) {
                    set(userRef, { voltage: 0, current: 0 });
                }
            });

            alert("Login Successful!");
            localStorage.setItem("userUID", user.uid); // Store UID
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
        
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log("User UID:", user.uid);
            } else {
                console.log("No user signed in");
            }
        });
}
