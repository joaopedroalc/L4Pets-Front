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
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  cellphone = document.getElementById('cellphone').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false || validate_field(full_name) == false || validate_field(cellphone) == false) {
    alert('Um ou mais campos extras estão indefinidos!!')
    return
    // Don't continue running the code
  }


  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Push to Firebase Database

      firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          // Email verification sent!
          // ...
          // Add this user to Firebase Database
          var database_ref = database.ref()

          var date = new Date();

          // Create User data
          var user_data = {
            email: email,
            full_name: full_name,
            cellphone: cellphone,
            last_login: date.toISOString()
          }

          database_ref.child('users/' + user.uid).set(user_data)


          alert('Link de confirmação via email')
        });

      // DOne
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email ou Senha estão vazios!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      var date = new Date();

      // Create User data
      var user_data = {
        last_login: date.toISOString(),
      }

      console.log(user_data)

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      localStorage.setItem('email', email);

      // DOne
      alert('Usuário Logado!!')

      window.location.pathname = '/index.html';

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

async function forgotPassword() {
  //redefinir Senha
  email = document.getElementById('email').value
  await firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Verifique sua caixa de e-mail.')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}