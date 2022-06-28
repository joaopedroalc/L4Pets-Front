const form = document.querySelector('.cadastraPet');
// const botaoRegistrarPet = document.querySelector('.botaoRegistrarPet');

const api = "http://localhost:8089/PetLost"

function pegaApi() {
  axios.get(api)
    .then(response => {
      response.data.map(obj => {
        console.log(obj.IdentificationImage_PetLost)
        let card = ` 
        <div class="card">
          <i class="ph-pencil" style="font-size:40px;" onclick="atualizaDados(${obj.Id_PetLost})"></i>
          <div style='background-image: ${obj.IdentificationImage_PetLost}' class="card-image"></div>
          <h2 class="${obj.DescriptionPet_PetLost}">Descrição do Pet: ${obj.DescriptionPet_PetLost}</h2>
          <p>Localização do Pet: ${obj.Location_PetLost}</p>
          <p>Valor de recompensa do Pet: ${obj.Reword_PetLost}</p>
          <i class="ph-trash" style="font-size:40px;" onclick="deletarDados(${obj.Id_PetLost})"></i>
      </div>`
        const cards = document.querySelector('.cards')
        cards.innerHTML += card

      })
      console.log(response.data);
    })
    .catch(error => console.log(error))
}

botaoRegistrarPet.addEventListener("click", () => {
  form.style.display = 'block';
  form.style.visibility = 'visible';

  const image_input = document.querySelector(".IdentificationImage_PetLost");

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  });
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const DescriptionPet_PetLost = document.querySelector('.DescriptionPet_PetLost');
  const Location_PetLost = document.querySelector('.Location_PetLost');
  const Reword_PetLost = document.querySelector('.Reword_PetLost');
  const IdentificationImage_PetLost = document.querySelector("#display-image").style.backgroundImage;

  console.log(IdentificationImage_PetLost)

  const novoPet = {
    DescriptionPet_PetLost: DescriptionPet_PetLost.value,
    Location_PetLost: Location_PetLost.value,
    Reword_PetLost: Reword_PetLost.value,
    IdentificationImage_PetLost: IdentificationImage_PetLost,
  }
  axios.post(`${api}/insert`, novoPet).then(response => {
    const data = response.data;
    console.log(data)

    pegaApi()
    window.location.reload()
  }).catch(e => console.log(e))
});

function atualizaDados(idPet) {
  alert("Preencha o formulário para atualizar os dados")
  const DescriptionPet_PetLost = document.querySelector('.DescriptionPet_PetLost');
  const Location_PetLost = document.querySelector('.Location_PetLost');
  const Reword_PetLost = document.querySelector('.Reword_PetLost');
  const IdentificationImage_PetLost = document.querySelector("#display-image").style.backgroundImage;

  const atualizandoUser = {
    "DescriptionPet_PetLost": `${DescriptionPet_PetLost.value}`,
    "Location_PetLost": `${Location_PetLost.value}`,
    "Reword_PetLost": `${Reword_PetLost.value}`,
    "IdentificationImage_PetLost": `${IdentificationImage_PetLost}`,
  }

  console.log(idPet)
  axios.put(`${api}/update/${idPet}`, atualizandoUser).then(response => {
    const data = response.data;
    console.log(data)
  }).catch(e => console.log(e))
}

function deletarDados(idPet) {
  axios.delete(`${api}/${idPet}`).then(response => {
    pegaApi()
    window.location.reload()
  }).catch(e => console.log(e))
}

pegaApi()