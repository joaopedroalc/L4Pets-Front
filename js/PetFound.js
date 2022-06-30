const formFound = document.querySelector('.cadastraPetFound');

const apiFound = "http://localhost:8089/PetFound"

function pegaApiFound() {
  axios.get(apiFound)
    .then(response => {
      response.data.map(obj => {
        console.log(obj.IdentificationImage_PetFound)
        let card = ` 
        <div class="card">
          <i class="ph-pencil" style="font-size:40px;" onclick="atualizaDadosFound(${obj.Id_PetFound})"></i>
          <div style='background-image: ${obj.IdentificationImage_PetFound}' class="card-image"></div>
          <h2 class="${obj.DescriptionPet_PetFound}">Descrição do Pet Encontrado: ${obj.DescriptionPet_PetFound}</h2>
          <p>Localização do Pet: ${obj.Location_PetFound}</p>
          <i class="ph-trash" style="font-size:40px;" onclick="deletarDadosFound(${obj.Id_PetFound})"></i>
      </div>`
        const cards = document.querySelector('.cards')
        cards.innerHTML += card

      })
      console.log(response.data);
    })
    .catch(error => console.log(error))
}

botaoRegistrarPet.addEventListener("click", () => {
  formFound.style.display = 'block';
  formFound.style.visibility = 'visible';

  const image_input = document.querySelector(".IdentificationImage_PetFound");

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector("#display-image-found").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  });
})

formFound.addEventListener("submit", (e) => {
  e.preventDefault();
  const DescriptionPet_PetFound = document.querySelector('.DescriptionPet_PetFound');
  const Location_PetFound = document.querySelector('.Location_PetFound');
  const IdentificationImage_PetFound = document.querySelector("#display-image-found").style.backgroundImage;

  console.log(IdentificationImage_PetFound)

  const novoPet = {
    DescriptionPet_PetFound: DescriptionPet_PetFound.value,
    Location_PetFound: Location_PetFound.value,
    IdentificationImage_PetFound: IdentificationImage_PetFound,
  }
  axios.post(`${apiFound}/insert`, novoPet).then(response => {
    const data = response.data;
    console.log(data)

    pegaApiFound()
    window.location.reload()
  }).catch(e => console.log(e))
});

function atualizaDadosFound(idPet) {
  alert("Preencha o formulário para atualizar os dados")
  const DescriptionPet_PetFound = document.querySelector('.DescriptionPet_PetFound');
  const Location_PetFound = document.querySelector('.Location_PetFound');
  const IdentificationImage_PetFound = document.querySelector("#display-image-found").style.backgroundImage;

  const atualizandoUser = {
    "DescriptionPet_PetFound": `${DescriptionPet_PetFound.value}`,
    "Location_PetFound": `${Location_PetFound.value}`,
    "IdentificationImage_PetFound": `${IdentificationImage_PetFound}`,
  }

  console.log(idPet)
  axios.put(`${apiFound}/update/${idPet}`, atualizandoUser).then(response => {
    const data = response.data;
    console.log(data)
  }).catch(e => console.log(e))
}

function deletarDadosFound(idPet) {
  axios.delete(`${apiFound}/${idPet}`).then(response => {
    pegaApiFound()
    window.location.reload()
  }).catch(e => console.log(e))
}

pegaApiFound()