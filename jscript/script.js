let destinatario = [];
let montarContatos;

let usuario;
document.getElementById("botao").onclick = function login() {
  nome = document.getElementById("nome").value;
  usuario = {
    name: nome,
  };

  const logar = axios
    .post(
      "https://mock-api.driven.com.br/api/v4/uol/participants",
      { name: usuario.name }
    )
    .then(function (response) {
      document.querySelector(".tela-login").style.display = "none";
      setTimeout(function () {
        document.querySelector(".tela-carregando").style.display = "none";
        document.querySelector("header").style.display = "flex";
        document.querySelector("footer").style.display = "flex";
        listarMensagem();
      }, 2000);

      console.log(response);
    })
    .catch(function (error) {
      // alert(error);
      alert("Este nome já esta sendo utilizado");
      document.getElementById("nome").value = "";
      



    });
};



function listarMensagem() {
  const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages",)
    .then(function (response) {
      const mensagem = response.data;
      renderizarMensagens(mensagem);
    })
    .catch(function(error){
      alert.error(error);
    });
}


function renderizarMensagens(mensagem) {

  for (let i = 0; i < mensagem.length; i++) {

    let montarTexto = `<li class=${mensagem[i].type}> <p>`
    if (mensagem[i].type == "status") {
      montarTexto += `
            <span>(${mensagem[i].time})</span><strong>${mensagem[i].from}</strong> ${mensagem[i].text}`

    }

    if (mensagem[i].type == "message") {
      montarTexto += `
            <span>(${mensagem[i].time})</span><strong>${mensagem[i].from}</strong> para <strong>${mensagem[i].to}</strong>: ${mensagem[i].text}`
    }

    if (mensagem[i].type == "private_message") {

      montarTexto += `
            <span>(${mensagem[i].time})</span><strong>${mensagem[i].from}</strong> reservadamente para < strong > ${mensagem[i].to}</strong >: ${mensagem[i].text}`
    }
    montarTexto += `</p ></li > `;

    document.querySelector("ul").innerHTML += montarTexto;

    setInterval(estouOnline(), 2000);

    const elementoQueQueroQueApareca = document.querySelector('ul').lastElementChild;
    elementoQueQueroQueApareca.scrollIntoView();

    
    // setTimeout(function () {
    //   window.location.reload(1);
    // }, 3000);

  }

}


//avisar que estou online

function estouOnline() {
  const online = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuario);
}


//enviar mensagem


function enviarMensagem() {
  let texto = document.querySelector("textarea").value;
  if (texto) {
    const mensagem = {
      from: usuario.name,
      to: 'Todos',
      text: texto,
      type: "message",
    };
    // console.log(mensagem);
    const chat = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagem)
    chat.then(mensagemOK);
    chat.catch(mensagemErro);

  } else {
    alert("Você não escreveu nenhuma mensagem");
  }
  document.querySelector("textarea").value = "";
}

function mensagemOK() {
  setInterval(listarMensagem(), 3000);

}

function mensagemErro(erro) {
  window.location.reload();
}



function contatos() {
  const participante = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
  // participante.then(listarParticipantes); 
  participante.then(listarContatos);
}

function listarContatos(response) {
  const pessoas = response.data;
  renderizarContatos(pessoas);
}

function renderizarContatos(pessoas) {
  for (let i = 0; i < pessoas.length; i++) {

     montarContatos = `
      <li class="person" onclick="selecionarContato(this)">
        <span><ion-icon name="person-circle"></ion-icon></span>
        <div class="name">
           <span>${pessoas[i].name}</span>
           <!-- <span class="checkmark"><ion-icon name="checkmark-outline"></ion-icon></span> -->
        </div>
      </li>
      `;
    
    document.querySelector(".contatos").innerHTML += montarContatos;

    setInterval(estouOnline(), 1000);

    const elementoQueQueroQueApareca = document.querySelector('.contatos').lastElementChild;
    elementoQueQueroQueApareca.scrollIntoView();

    

  }
}

function selecionarContato(pessoa) {

      destinatario= pessoa.querySelector(".name span").innerHTML;
      tipo = "private_message";
}

function abrirMenu() {
  
  contatos();

  const sobreposicao = document.querySelector(".sobreposicao").style.display = "flex"; 
  const menuContatos = document.querySelector("aside");

  
  menuContatos.addEventListener("click", function(e){
    e.stopPropagation();
  });
}

function sobrePosicao(){
  document.querySelector(".sobreposicao").style.display="none";
}

