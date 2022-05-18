const primeiroModal = document.querySelector('.primeiroModal')
const segundoModal = document.querySelector('.segundoModal')
const terceiroModal = document.querySelector('.terceiroModal')

function esconderModal(modal) {
  modal.classList.add('hidden')
  modal.classList.remove('modal')
}

function fecharModal(modal) {
  console.log(modal.getAttribute('id'))
  switch (modal.getAttribute('id')) {
    case 'primeiroTitulo':
      esconderModal(primeiroModal)
    case 'segundoTitulo':
      esconderModal(segundoModal)
    case 'terceiroTitulo':
      esconderModal(terceiroModal)
  }
}

function modal(modal, title, name, infos) {
  //PEGAR OS DADOS DO BANCO
  modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${title}">
            ${name}
          </h5>
          <button class="close-modal" onclick="fecharModal(${title})">X</button>
        </div>
        <div class="modal-body">
          <p>${infos}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="close-modal"
            onclick="fecharModal(${title})"
          >
            Fechar
          </button>
        </div>
      </div>
  `

  return modal.innerHTML
}

function abrirModal(modal) {
  modal.classList.remove('hidden')
  modal.classList.add('modal')
  console.log(modal)
}

modal(primeiroModal, 'primeiroTitulo', 'Carlos', 'Informacoes do pet 1')
modal(segundoModal, 'segundoTitulo', 'Jack', 'Informacoes do pet 2')
modal(terceiroModal, 'terceiroTitulo', 'Drico', 'Informacoes do pet 3')
