const formLost = document.querySelector('.cadastraPetLost');

const apiLost = "https://api-l4pets.herokuapp.com/PetLost"


function pegaApiLost() {
  axios.get(apiLost)
    .then(response => {
      response.data.map(obj => {
        console.log(obj.Id_PetLost)
        let card = ` 
        <div class="card">
          <div style='background-image: ${obj.IdentificationImage_PetLost}' class="card-image"></div>
          <p class="email-card" style="display: none;">${obj.email}</p>
          <p class="${obj.DescriptionPet_PetLost}">Descrição do Pet Perdido: ${obj.DescriptionPet_PetLost}</p>
          <p>Localização do Pet: ${obj.Location_PetLost}</p>
          <p>Valor de recompensa do Pet: R$ ${obj.Reword_PetLost}</p>
          <div class="phone-container">
            <p>Telefone para contato: ${obj.Phone_PetLost}</p>
            <a href="https://wa.me/${obj.Phone_PetLost}">
              <img src="/assets/wpp.png" alt="wpp" class="wpp" />
            </a>
          </div>
          <div class="icons-container">
            <i class="ph-trash" style="font-size:40px;" onclick="deletarDadosLost(${obj.Id_PetLost})"></i>
            <i class="ph-pencil" style="font-size:40px;" onclick="atualizaDadosLost(${obj.Id_PetLost})"></i>
          </div>
          </div>`
        const cardsLost = document.querySelector('.cardsLost')
        cardsLost.innerHTML += card

        const cardImages = document.querySelectorAll('.card-image');
        // console.log(cardImages)
        cardImages.forEach(card => {
          // console.log(card)
          if (card.style.backgroundImage === "") {
            const container = card.parentElement
            container.style.display = "none";
            container.style.visibility = "hidden";
          }
        })

      })
      // console.log(response.data);
    })
    .catch(error => console.log(error))
}

botaoRegistrarPet.addEventListener("click", () => {
  formLost.style.display = 'block';
  formLost.style.visibility = 'visible';

  const image_input = document.querySelector(".IdentificationImage_PetLost");

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector("#display-image-lost").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  });
})

formLost.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector(".emailUserLogadoLost")
  const DescriptionPet_PetLost = document.querySelector('.DescriptionPet_PetLost');
  const Location_PetLost = document.querySelector('.Location_PetLost');
  const Reword_PetLost = document.querySelector('.Reword_PetLost');
  const Phone_PetLost = document.querySelector('.Phone_PetLost');
  const IdentificationImage_PetLost = document.querySelector("#display-image-lost").style.backgroundImage;

  // console.log(IdentificationImage_PetLost)

  const novoPet = {
    email: email.value,
    DescriptionPet_PetLost: DescriptionPet_PetLost.value,
    Location_PetLost: Location_PetLost.value,
    Reword_PetLost: Reword_PetLost.value,
    Phone_PetLost: Phone_PetLost.value,
    IdentificationImage_PetLost: IdentificationImage_PetLost,
  }
  axios.post(`${apiLost}/insert`, novoPet).then(response => {
    const data = response.data;
    // console.log(data)

    pegaApiLost()
    window.location.reload()
  }).catch(e => console.log(e))
});

function atualizaDadosLost(idPet) {
  alert("Preencha o formulário para atualizar os dados")
  const email = document.querySelector(".emailUserLogadoLost")
  const DescriptionPet_PetLost = document.querySelector('.DescriptionPet_PetLost');
  const Location_PetLost = document.querySelector('.Location_PetLost');
  const Reword_PetLost = document.querySelector('.Reword_PetLost');
  const Phone_PetLost = document.querySelector('.Phone_PetLost');
  const IdentificationImage_PetLost = document.querySelector("#display-image-lost").style.backgroundImage;

  const atualizandoUser = {
    "email": `${email.value}`,
    "DescriptionPet_PetLost": `${DescriptionPet_PetLost.value}`,
    "Location_PetLost": `${Location_PetLost.value}`,
    "Reword_PetLost": `${Reword_PetLost.value}`,
    "Phone_PetLost": `${Phone_PetLost.value}`,
    "IdentificationImage_PetLost": `${IdentificationImage_PetLost}`,
  }

  console.log(idPet)
  axios.put(`${apiLost}/update/${idPet}`, atualizandoUser).then(response => {
    const data = response.data;
    // console.log(data)
    pegaApiLost()
  }).catch(e => console.log(e))
}

function deletarDadosLost(idPet) {
  axios.delete(`${apiLost}/${idPet}`).then(response => {
    pegaApiLost()
    window.location.reload()
  }).catch(e => console.log(e))
}

pegaApiLost()