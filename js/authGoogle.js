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

const apiUsers = "http://localhost:8089/Users"

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res => {

    let user = auth.currentUser
    // console.log(user)

    let database_ref = database.ref()

    let date = new Date();

    // Create User data
    const user_data = {
      email: user.email,
      full_name: user.displayName,
      last_login: date.toISOString()
    }

    const usersData = {
      "email": `${user.email}`,
      "full_name": `${user.displayName}`,
      "last_login": `${date.toISOString()}`
    }

    // JOGA PRO FIREBASE
    database_ref.child('users/' + user.uid).set(user_data)

    // JOGA PRO MYSQL
    axios.post(`${apiUsers}/insert`, usersData).then(response => {
      const data = response.data;
      // console.log(data)
      window.location.reload()
    }).catch(e => console.log(e))

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
        <p class="email">${user.email}</p>
      `
  const emailCardAll = document.querySelectorAll('.email-card')
  const email = document.querySelector(".email")

  emailCardAll.forEach(emailCard => {
    const divCard = emailCard.parentElement
    const iconsContainer = divCard.querySelector(".icons-container")

    if (emailCard.innerHTML !== email.innerHTML) {
      console.log('email')
      iconsContainer.style.display = 'none'
    }
  })

}

function exibirInfosUser() {
  document.querySelector('.name').style.display = "block"
  document.querySelector('.name').style.visibility = "visible"
  document.querySelector('.email').style.display = "block"
  document.querySelector('.email').style.visibility = "visible"
}

const botaoRegistrarPet = document.querySelector(".botaoRegistrarPet");
const infosPet = document.querySelector(".cadastraPet")
const customSelect = document.querySelector('.custom-select')
const titleSelect = document.querySelector("#selects h1");


function checkAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // console.log(user.email)
      const emailUserLogadoLost = document.querySelector('.emailUserLogadoLost')
      emailUserLogadoLost.value = user.email;
      emailUserLogadoLost.disabled = true;
      emailUserLogadoLost.style.opacity = 0.7;
      emailUserLogadoLost.style.cursor = "not-allowed"

      const emailUserLogadoFound = document.querySelector('.emailUserLogadoFound')
      emailUserLogadoFound.value = user.email;
      emailUserLogadoFound.disabled = true;
      emailUserLogadoFound.style.opacity = 0.7;
      emailUserLogadoFound.style.cursor = "not-allowed"

      botaoRegistrarPet.style.display = "block";
      botaoRegistrarPet.style.visibility = "visible";
      customSelect.style.display = "block";
      customSelect.style.visibility = "visible";
      titleSelect.style.display = "block";
      titleSelect.style.visibility = "visible";
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // var uid = user.uid;
      // ...

      axios.get(apiUsers)
        .then(response => {
          response.data.map(obj => {
            console.log(obj)
            // if (obj.email === user.email) {
            //   phTrash.style.display = 'none';
            //   phPencil.style.display = 'none';
            // }
          })
        })
        .catch(error => console.log(error))

      showUserDetails(user)

      document.getElementById('LoginScreen').style.display = "none"
      document.getElementById('dashboard').style.display = "block"
      // if (user.GoogleLogin) {
      //   showUserDetails(user)
      // }
    } else {
      const phTrash = document.querySelectorAll('.ph-trash');
      const phPencil = document.querySelectorAll('.ph-pencil');

      phTrash.forEach(trash => {
        trash.style.display = 'none';
      })

      phPencil.forEach(pencil => {
        pencil.style.display = 'none';
      })

      botaoRegistrarPet.style.display = "none";
      botaoRegistrarPet.style.visibility = "hidden";
      customSelect.style.display = "none";
      customSelect.style.visibility = "hidden";
      titleSelect.style.display = "none";
      titleSelect.style.visibility = "hidden";
      infosPet.style.display = 'none';
      infosPet.style.visibility = 'hidden';
    }
  })
}

function LogoutUser() {
  firebase.auth().signOut().then(() => {
    const phTrash = document.querySelectorAll('.ph-trash');
    const phPencil = document.querySelectorAll('.ph-pencil');

    phTrash.forEach(trash => {
      trash.style.display = 'none';
    })

    phPencil.forEach(pencil => {
      pencil.style.display = 'none';
    })
    botaoRegistrarPet.style.display = "none";
    botaoRegistrarPet.style.visibility = "hidden";
    customSelect.style.display = "none";
    customSelect.style.visibility = "hidden";
    titleSelect.style.display = "none";
    titleSelect.style.visibility = "hidden";
    infosPet.style.display = 'none';
    infosPet.style.visibility = 'hidden';
    document.getElementById('LoginScreen').style.display = "block"
    document.getElementById('dashboard').style.display = "none"
  }).catch(e => {
    console.log(e)
  })
}
checkAuthState()