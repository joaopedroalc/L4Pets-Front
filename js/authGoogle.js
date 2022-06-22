// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0fhvvy2_hccvrVB-vOtuBcjor9EjKbYo",
  authDomain: "l4pets.firebaseapp.com",
  projectId: "l4pets",
  databaseURL: "https://l4pets-default-rtdb.firebaseio.com",
  storageBucket: "l4pets.appspot.com",
  messagingSenderId: "484489501549",
  appId: "1:484489501549:web:3ec7a9321b61c24b775864",
  measurementId: "G-ZWYMQFVEQT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

document.getElementById('dashboard').style.display = "none"

document.getElementById('login').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

let provider = new firebase.auth.GoogleAuthProvider()

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res => {
    let user = auth.currentUser

    let database_ref = database.ref()

    let date = new Date();

    // Create User data
    const user_data = {
      email: user.email,
      full_name: user.displayName,
      last_login: date.toISOString()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    document.getElementById('LoginScreen').style.display = "none"
    document.getElementById('dashboard').style.display = "block"
    showUserDetails(res.user)
  }).catch(e => {
    console.log(e)
  })
}

function showUserDetails(user) {
  document.getElementById('userDetails').innerHTML = `
        <img src="${user.photoURL}" class="userPhoto" onclick="exibirInfosUser()">
        <p class="name">Nome: ${user.displayName}</p>
        <p class="email">Email: ${user.email}</p>
      `
}

function exibirInfosUser() {
  document.querySelector('.name').style.display = "block"
  document.querySelector('.name').style.visibility = "visible"
  document.querySelector('.email').style.display = "block"
  document.querySelector('.email').style.visibility = "visible"
}

const cadastrarPet = document.querySelector(".cadastrarPet");

function checkAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      cadastrarPet.style.display = "block";
      cadastrarPet.style.visibility = "visible";

      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // var uid = user.uid;
      // ...
      document.getElementById('LoginScreen').style.display = "none"
      document.getElementById('dashboard').style.display = "block"
      if (user.GoogleLogin) {
        showUserDetails(user)
      }
    } else {
      cadastrarPet.style.display = "none";
      cadastrarPet.style.visibility = "hidden";
    }
  })
}

function LogoutUser() {
  firebase.auth().signOut().then(() => {
    cadastrarPet.style.display = "none";
    cadastrarPet.style.visibility = "hidden";
    document.getElementById('LoginScreen').style.display = "flex";
    document.getElementById('dashboard').style.display = "none";
  }).catch(e => {
    console.log(e)
  })
}
checkAuthState()