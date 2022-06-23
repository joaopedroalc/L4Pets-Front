// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const form = document.querySelector(".cadastraPet")

var uploaded_image;
function cadastrarPet() {
  form.style.display = 'block';
  form.style.visibility = 'visible';

  const image_input = document.querySelector("#image-input");

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector(".img").src = `${uploaded_image}`;
    });
    reader.readAsDataURL(this.files[0]);
  });

}

const infosForm = document.querySelector(".form");
infosForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nomePet = document.querySelector('input[name="Texto"]').value;
  const localizacao = document.querySelector('input[name="Local"]').value;
  const imagem = document.querySelector(".img").src;
  const description = document.querySelector(".description").value;
  console.log(imagem)
  const infos = {
    nomePet: nomePet,
    localizacao: localizacao,
    imagem: imagem,
    description: description
  }
  //JOGAR DADOS PARA O BANCO
  console.log(infos);

  db.collection("PetLost").add(infos)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

function mostraDados() {
  db.collection("PetLost").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      let card = ` 
      <div class="card">
        <img src="${doc.data().imagem}" alt="dog" class="img-card" />
        <h2 class="${doc.data().nomePet}">Nome do Pet: ${doc.data().nomePet}</h2>
        <p>Descrição do Pet: ${doc.data().description}</p>
    </div>`
      const cards = document.querySelector('.cards')
      cards.innerHTML += card
    });
  });
}
mostraDados()



