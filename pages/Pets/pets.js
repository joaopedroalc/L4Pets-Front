
const apiLost = "https://api-l4pets.herokuapp.com/PetLost/Pets"

function pegaApiLost() {
  axios.get(apiLost)
    .then(response => {
      response.data.map(obj => {
        console.log(obj.Id_PetLost)
        let cardLost = ` 
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
          </div>`
        let petsLost = document.querySelector('.card_PetsLost')
        petsLost.innerHTML += cardLost

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
pegaApiLost()


const apiFound = "https://api-l4pets.herokuapp.com/PetFound/Pets"

function pegaApiFound() {
  axios.get(apiFound)
    .then(response => {
      response.data.map(obj => {
        console.log(obj.Id_PetFound)
        let cardFound = ` 
        <div class="card">
          <div style='background-image: ${obj.IdentificationImage_PetFound}' class="card-image"></div>
          <p class="email-card" style="display: none;">${obj.email}</p>
          <p class="${obj.DescriptionPet_PetFound}">Descrição do Pet Perdido: ${obj.DescriptionPet_PetFound}</p>
          <p>Localização do Pet: ${obj.Location_PetFound}</p>
          <div class="phone-container">
            <p>Telefone para contato: ${obj.Phone_PetFound}</p>
            <a href="https://wa.me/${obj.Phone_PetFound}">
              <img src="/assets/wpp.png" alt="wpp" class="wpp" />
            </a>
          </div>
          </div>`
        let petsFound = document.querySelector('.card_PetsFound')
        petsFound.innerHTML += cardFound

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
pegaApiFound()

const json = localStorage.getItem('userInfos');
const obj = JSON.parse(json);
console.log(obj)