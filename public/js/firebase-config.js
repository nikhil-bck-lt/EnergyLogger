import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyB-dnc70LcKFvOy6qq9s_ryJAmVngalz98",
    authDomain: "energylogger-50d20.firebaseapp.com",
    databaseURL: "https://energylogger-50d20-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "energylogger-50d20",
    storageBucket: "energylogger-50d20.firebasestorage.app",
    messagingSenderId: "231911309945",
    appId: "1:231911309945:web:40dd2e0a993fd9a93fcaa8",
    measurementId: "G-H2HGKWJ9B3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
