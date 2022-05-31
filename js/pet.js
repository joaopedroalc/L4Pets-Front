const form = document.querySelector(".cadastraPet")

function cadastrarPet() {
  form.style.display = 'block';

  const image_input = document.querySelector("#image-input");

  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  });

}

function salvarDadosPet() {
  // SALVAR DADOS NO BANCO AO CLICAR NO BOTAO ANUNCIAR
  const atributos = document.querySelectorAll("input")
  const anunciar = document.querySelector(".anunciar")
  if (atributos['required'] == 'true') {
    anunciar['type' === '']
    form.style.display = 'none';
  }
}