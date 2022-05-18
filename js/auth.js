// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0fhvvy2_hccvrVB-vOtuBcjor9EjKbYo",
  authDomain: "l4pets.firebaseapp.com",
  projectId: "l4pets",
  storageBucket: "l4pets.appspot.com",
  messagingSenderId: "484489501549",
  appId: "1:484489501549:web:3ec7a9321b61c24b775864",
  measurementId: "G-ZWYMQFVEQT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('dashboard').style.display = "none"

document.getElementById('login').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

let provider = new firebase.auth.GoogleAuthProvider()

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res => {
    console.log(res.user)
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
      `
}

function exibirInfosUser() {
  document.querySelector('.name').style.display = "block"
  document.querySelector('.name').style.visibility = "visible"
}

function checkAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById('LoginScreen').style.display = "none"
      document.getElementById('dashboard').style.display = "block"
      showUserDetails(user)
    } else {

    }
  })
}

function LogoutUser() {
  firebase.auth().signOut().then(() => {
    document.getElementById('LoginScreen').style.display = "block"
    document.getElementById('dashboard').style.display = "none"
  }).catch(e => {
    console.log(e)
  })
}
checkAuthState()