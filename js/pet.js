const form = document.querySelector(".cadastraPet")

let apiUrl = 'http://localhost:8089/PetLost';

let dadosApi = [];

function exibirPets() {
  fetch(apiUrl)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      dadosApi = data;
      console.log(dadosApi[0]);
      console.log(dadosApi)

      dadosApi.map(obj => {
        let card = ` 
        <div class="card">
        <img src="${obj.IdentificationImage_PetLost}" />
        <h2>${obj.DescriptionPet_PetLost}</h2>
        <p>Localização: ${obj.Location_PetLost}</p>
        <p>Valor de Recompensa: ${obj.Reword_PetLost}</p>
        <p>Data de registro do Pet: ${obj.DateRegistered_PetLost}</p>
      </div>`

        const cards = document.querySelector('.cards')
        cards.innerHTML += card
      });
    })
}

exibirPets()



function fecharModal() {
  const hidden = document.querySelector('.modal-content').parentElement
  hidden.classList.add('hidden')
}