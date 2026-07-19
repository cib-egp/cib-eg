import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* firebase */
const firebaseConfig = {
  apiKey: "AIzaSyBdfsPZq6P4kmdtG_n7ugX3MKdXlayZozM",
  authDomain: "aloo-4e94a.firebaseapp.com",
  projectId: "aloo-4e94a",
  storageBucket: "aloo-4e94a.firebasestorage.app",
  messagingSenderId: "841563840846",
  appId: "1:841563840846:web:ba144d132c43a2a077be1f",
  measurementId: "G-N300KVYEDT"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* your original logic */

const form = document.getElementById('regForm');

form.addEventListener('submit', async function(e){

    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();

    

    const phoneNumber = document.getElementById('phoneNumber').value.trim();

    let valid = true;

    document.getElementById('nameError').textContent = '';


    document.getElementById('phoneError').textContent = '';

    if(fullName.length < 3){

        document.getElementById('nameError').textContent =
        'يرجى إدخال الاسم الكامل';

        valid = false;

    }

   

    if(phoneNumber.length !== 11){

        document.getElementById('phoneError').textContent =
        'رقم الهاتف يجب أن يكون 11 رقم';

        valid = false;

    }

    if(!valid) return;

    /* keep your localStorage */

    localStorage.setItem('demoUser', JSON.stringify({

        fullName,
        phoneNumber

    }));

    /* firebase save */

    try{

        const userId =
    encodeURIComponent(phoneNumber);

await setDoc(doc(db,"users",userId),{

    name: fullName,


    phone: phoneNumber,

    status: "pending",


    createdAt: Date.now()

},{ merge:true });

localStorage.setItem("userId", userId);

    }catch(error){

        console.log(error);

    }

    /* keep your loader */

    document
        .getElementById('loadingOverlay')
        .classList.add('active');

    setTimeout(() => {

        window.location.href = 'login.html';

    }, 2000);

});