import { auth, database } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref,get,update, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Load User Data on Dashboard
// export function loadUserData() {
//     onAuthStateChanged(auth, user => {
//         if (!user) {
//             window.location.href = "login.html";
//             return;
            
//         }
//         if (user) {
//             console.log(user.uid); // 👉 This is generated by Firebase Auth
//             console.log(user.email); // 👉 This is generated by Firebase Auth}
//         }
//         document.getElementById("userEmail").innerText = user.email;
//         const userRef = ref(database, "users/" + user.uid);

//         // Real-time data listener
//         onValue(userRef, snapshot => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 document.getElementById("voltage").innerText = data.voltage;
//                 document.getElementById("current").innerText = data.current;
//                 document.getElementById("power").innerText = (data.voltage * data.current);
//             } else {
//                 alert("No data found.");
//             }
//         });
//     });
// }


//WORKING CODE
// export function loadUserData() {
//     onAuthStateChanged(auth, async user => {
//         if (!user) {
//             window.location.href = "login.html";
//             return;
//         }

//         console.log("UID:", user.uid);
//         console.log("Email:", user.email);
//         document.getElementById("userEmail").innerText = user.email;

//         const userRef = ref(database, "sensors/data" + user.uid);

//         // ✅ Step 1: Check if user exists
//         const snapshot = await get(userRef);
//         if (!snapshot.exists()) {
//             // 🔧 Step 2: Create user with default voltage and current
//             await update(userRef, {
//                 email: user.email,
//                 voltage: 0,
//                 current: 0
//             });
//             console.log("✅ User created in database");
//         } else {
//             console.log("🟢 User already exists in database");
//         }

//         // ✅ Step 3: Start real-time listener
//         onValue(userRef, snapshot => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();  // ✅ Define data here
        
//                 document.getElementById("voltage").innerText = data.voltage;
//                 document.getElementById("current").innerText = data.current;
//                 document.getElementById("power").innerText = (data.voltage * data.current);
        
//                 // 🔁 Add to chart
//                 const now = new Date().toLocaleTimeString();
//                 timeLabels.push(now);
//                 voltageData.push(data.voltage);
//                 currentData.push(data.current);
        
//                 // 🔁 Limit points to last 10
//                 if (timeLabels.length > 10) {
//                     timeLabels.shift();
//                     voltageData.shift();
//                     currentData.shift();
//                 }
        
//                 lineChart.update(); // ✅ Refresh chart
//             } else {
//                 alert("No data found.");
//             }

//         });
//     });
// }


// // Logout User
// export function logout() {
//     signOut(auth)
//         .then(() => {
//             window.location.href = "login.html";
//         })
//         .catch(error => {
//             console.error("Logout Error:", error);
//             alert("❌ Logout Failed: " + error.message);
//         });
// }

// let voltageData = [];
// let currentData = [];
// let timeLabels = [];

// const ctx = document.getElementById("lineChart").getContext("2d");

// const lineChart = new Chart(ctx, {
//     type: "line",
//     data: {
//         labels: timeLabels,
//         datasets: [
//             {
//                 label: "Voltage (V)",
//                 data: voltageData,
//                 borderColor: "rgba(255, 99, 132, 1)",
//                 fill: false,
//                 tension: 0.3
//             },
//             {
//                 label: "Current (A)",
//                 data: currentData,
//                 borderColor: "rgba(54, 162, 235, 1)",
//                 fill: false,
//                 tension: 0.3
//             }
//         ]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: false,
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: "Time"
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: "Values"
//                 },
//                 beginAtZero: true
//             }
//         }
//     }
// });


// export function loadUserData() {
//     onAuthStateChanged(auth, async user => {
//         if (!user) {
//             window.location.href = "login.html";
//             return;
//         }

//         console.log("UID:", user.uid);
//         console.log("Email:", user.email);
//         document.getElementById("userEmail").innerText = user.email;

//         const userRef = ref(database, "sensors/data");

//         // ✅ Step 1: Check if user exists
//         const snapshot = await get(userRef);
//         if (!snapshot.exists()) {
//             // 🔧 Step 2: Create user with default voltage and current
//             await update(userRef, {
//                 email: user.email,
//                 voltage: 0,
//                 current: 0
//             });
//             console.log("✅ User created in database");
//         } else {
//             console.log("🟢 User already exists in database");

//             // 🔁 One-time fetch and display
//             const data = snapshot.val();
//             const voltage = data.voltage || 0;
//             const current = data.current || 0;
//             const power = voltage * current;

//             document.getElementById("voltage").innerText = voltage;
//             document.getElementById("current").innerText = current;
//             document.getElementById("power").innerText = power;
//         }

//         // ✅ Step 3: Start real-time listener
//         onValue(userRef, snapshot => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();

//                 document.getElementById("voltage").innerText = data.voltage;
//                 document.getElementById("current").innerText = data.current;
//                 document.getElementById("power").innerText = (data.voltage * data.current);

//                 // 🔁 Add to chart
//                 const now = new Date().toLocaleTimeString();
//                 timeLabels.push(now);
//                 voltageData.push(data.voltage);
//                 currentData.push(data.current);

//                 // 🔁 Limit points to last 10
//                 if (timeLabels.length > 10) {
//                     timeLabels.shift();
//                     voltageData.shift();
//                     currentData.shift();
//                 }

//                 lineChart.update(); // ✅ Refresh chart
//             } else {
//                 alert("No data found.");
//             }
//         });
//     });
// }

// // Logout User
// export function logout() {
//     signOut(auth)
//         .then(() => {
//             window.location.href = "login.html";
//         })
//         .catch(error => {
//             console.error("Logout Error:", error);
//             alert("❌ Logout Failed: " + error.message);
//         });
// }

// let voltageData = [];
// let currentData = [];
// let timeLabels = [];

// const ctx = document.getElementById("lineChart").getContext("2d");

// const lineChart = new Chart(ctx, {
//     type: "line",
//     data: {
//         labels: timeLabels,
//         datasets: [
//             {
//                 label: "Voltage (V)",
//                 data: voltageData,
//                 borderColor: "rgba(255, 99, 132, 1)",
//                 fill: false,
//                 tension: 0.3
//             },
//             {
//                 label: "Current (A)",
//                 data: currentData,
//                 borderColor: "rgba(54, 162, 235, 1)",
//                 fill: false,
//                 tension: 0.3
//             }
//         ]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: false,
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: "Time"
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: "Values"
//                 },
//                 beginAtZero: true
//             }
//         }
//     }
// });

export function loadUserData() {
    onAuthStateChanged(auth, async user => {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        console.log("Email:", user.email);
        document.getElementById("userEmail").innerText = user.email;

        const userRef = ref(database, "sensors/");

        // 🔁 One-time fetch and display
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const voltage = data.voltage || 0;
            const current = data.current || 0;
            const power = voltage * current;

            document.getElementById("voltage").innerText = voltage;
            document.getElementById("current").innerText = current;
            document.getElementById("power").innerText = power;
        } else {
            alert("No data found.");
        }

        // get(userRef).then(snapshot => {
        //     if (snapshot.exists()) {
        //         const data = snapshot.val();
        //         const voltage = data.voltage || 0;
        //         const current = data.current || 0;
        //         const power = voltage * current; // P = V × I
    
        //         // Display in HTML
        //         document.getElementById("output").innerHTML = `
        //             <p><strong>Voltage:</strong> ${voltage} V</p>
        //             <p><strong>Current:</strong> ${current} A</p>
        //             <p><strong>Power:</strong> ${power} W</p>
        //         `;

        //         const now = new Date().toLocaleTimeString();
        //         timeLabels.push(now);
        //         voltageData.push(data.voltage);
        //         currentData.push(data.current);

        //         if (timeLabels.length > 10) {
        //             timeLabels.shift();
        //             voltageData.shift();
        //             currentData.shift();
        //         }

        //         lineChart.update();
        //     } else {
        //         alert("No data found.");
        //         document.getElementById("output").innerHTML = `<p>No data available</p>`;
        //     }
        // }).catch(error => {
        //     console.error("Error fetching data:", error);
        //     document.getElementById("output").innerHTML = `<p>Error fetching data</p>`;
        // });

        // ✅ Real-time listener
        onValue(userRef, snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                document.getElementById("voltage").innerText = data.voltage.toFixed(3);
                document.getElementById("current").innerText = (data.current).toFixed(3);
                document.getElementById("power").innerText = (data.voltage * data.current).toFixed(3);

                // 🔁 Add to chart
                const now = new Date().toLocaleTimeString();
                timeLabels.push(now);
                voltageData.push(data.voltage);
                currentData.push(data.current);

                if (timeLabels.length > 10) {
                    timeLabels.shift();
                    voltageData.shift();
                    currentData.shift();
                }

                lineChart.update();
            } else {
                alert("No data found.");
            }
        });
    });
}

// Logout User
export function logout() {
    signOut(auth)
        .then(() => {
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error("Logout Error:", error);
            alert("❌ Logout Failed: " + error.message);
        });
}

let voltageData = [];
let currentData = [];
let timeLabels = [];

const ctx = document.getElementById("lineChart").getContext("2d");

const lineChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: timeLabels,
        datasets: [
            {
                label: "Voltage (V)",
                data: voltageData,
                borderColor: "rgba(255, 99, 132, 1)",
                fill: false,
                tension: 0.3
            },
            {
                label: "Current (A)",
                data: currentData,
                borderColor: "rgba(54, 162, 235, 1)",
                fill: false,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Values"
                },
                beginAtZero: true
            }
        }
    }
});

