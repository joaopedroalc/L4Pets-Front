
const apiLost = "http://localhost:8089/PetLost"

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
          </div>`
        const petsLost = document.querySelector('.card_PetsLost')
        petsLost.innerHTML += card

        console.log(petsLost.innerHTML)

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


const apiFound = "http://localhost:8089/PetFound"

function pegaApiFound() {
  axios.get(apiFound)
    .then(response => {
      response.data.map(obj => {
        console.log(obj.Id_PetFound)
        let card = ` 
        <div class="card">
          <div style='background-image: ${obj.IdentificationImage_PetFound}' class="card-image"></div>
          <p class="email-card" style="display: none;">${obj.email}</p>
          <p class="${obj.DescriptionPet_PetFound}">Descrição do Pet Perdido: ${obj.DescriptionPet_PetFound}</p>
          <p>Localização do Pet: ${obj.Location_PetFound}</p>
          <p>Valor de recompensa do Pet: R$ ${obj.Reword_PetFound}</p>
          <div class="phone-container">
            <p>Telefone para contato: ${obj.Phone_PetFound}</p>
            <a href="https://wa.me/${obj.Phone_PetFound}">
              <img src="/assets/wpp.png" alt="wpp" class="wpp" />
            </a>
          </div>
          </div>`
        const petsFound = document.querySelector('.card_PetsFound')
        petsFound.innerHTML += card

        console.log(pets.innerHTML)

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