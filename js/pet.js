const form = document.querySelector(".cadastraPet")

let apiUrl = 'http://localhost:8089/PetLost';

function pegarBackend() {
  const pegaApi = fetch(apiUrl)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
    })
  return pegaApi
}
pegarBackend();

var uploaded_image;
function cadastrarPet() {
  form.style.display = 'block';
  form.style.visibility = 'visible';

  const image_input = document.querySelector("#image-input");

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  });

}

function petCard() {
  const infosForm = document.querySelector(".form");
  infosForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nomePet = document.querySelector('input[name="Texto"]').value;
    const localizacao = document.querySelector('input[name="Local"]').value;
    const imagem = document.querySelector("#display-image").style.backgroundImage;
    const infos = {
      nomePet: nomePet,
      localizacao: localizacao,
      imagem: imagem
    }
    //JOGAR DADOS PARA O BANCO
    console.log(infos);

    let card = ` 
    <div class="card">
    <img src="${uploaded_image}" alt="dog" />
    <h2 class="nomePet">${nomePet}</h2>
    <button
      type="button"
      class="btn-modal"
      onclick="abreModal('${nomePet}')"
    >
      Ver informações
    </button>
    <div class="${nomePet} hidden"></div>
  </div>`
    const cards = document.querySelector('.cards')
    cards.innerHTML += card
  });
}

function abreModal(pet) {
  const divPet = document.getElementsByClassName(`${pet}`)
  console.log(divPet)

  divPet.classList.remove('hidden')
  divPet.classList.add('modal')
  divPet.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="${pet}">
        ${pet}
      </h5>
      <button class="close-modal" onclick="fecharModal()">X</button>
    </div>
    <div class="modal-body">
      <p>${localizacao}</p>
      <img src="${uploaded_image}"/>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="close-modal"
        onclick="fecharModal()"
      >
        Fechar
      </button>
    </div>
  </div>`
  return info
}

function fecharModal() {
  const hidden = document.querySelector('.modal-content').parentElement
  hidden.classList.add('hidden')
}

petCard()

function salvarDadosPet() {
  // SALVAR DADOS NO BANCO AO CLICAR NO BOTAO ANUNCIAR
  const atributos = document.querySelectorAll("input")
  const anunciar = document.querySelector(".anunciar")
  if (atributos['required'] == 'true') {
    anunciar['type' === '']
    form.style.display = 'none';
  }
}