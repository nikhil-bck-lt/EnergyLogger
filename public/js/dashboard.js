import { auth, database } from "./firebase-config.js";
import { onAuthStateChanged, getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

if (!auth) {
    console.error("Firebase Auth not initialized!");
}
// Load User Data on Dashboard
export function loadUserData() {
    onAuthStateChanged(auth, user => {
        if (!user) {
            window.location.href = "login.html";
            return;
        }
        const userUID = localStorage.getItem("userUID");
        console.log("Stored UID:", userUID);

        document.getElementById("userEmail").innerText = user.email;
        const userRef = ref(database, "users/" + user.uid);

        // Realtime Data Update
        onValue(userRef, snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                document.getElementById("voltage").innerText = data.voltage || 0;
                document.getElementById("current").innerText = data.Current || 0;
                document.getElementById("power").innerText = (data.voltage * data.Current) || 0;
            } else {
                alert("No data found.");
            }
        });
    });
}

// Update User Data
export function updateUserData() {
    const voltage = parseFloat(document.getElementById("voltageInput").value);
    const current = parseFloat(document.getElementById("currentInput").value);

    if (isNaN(voltage) || isNaN(current)) {
        alert("Please enter valid values.");
        return;
    }

    const user = auth.currentUser;
    if (user) {
        const userRef = ref(database, "users/" + user.uid);
        update(userRef, { voltage, current })
            .then(() => alert("Data updated successfully!"))
            .catch(error => console.error(error));
    }
}

// Logout User
export function logout() {
    console.log("Logout function triggered"); // Debugging log

    signOut(auth)
        .then(() => {
            console.log("User successfully logged out"); // Debugging log
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch(error => {
            console.error("Logout Error:", error);
            alert("❌ Logout Failed: " + error.message);
        });
}


