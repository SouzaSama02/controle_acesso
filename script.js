function validar(event) {
  event.preventDefault(); // Prevenir envio do formulário

  const login = document.getElementById("user_id").value; //Recebendo o valor do primeiro input
  const password = document.getElementById("password_user").value; //Recebendo o valor do segundo input
  const lab = document.getElementById("class_lab");
  const traje = document.getElementById("class_traje");
  const rocket = document.getElementById("class_rocket");

  fetch("./user.json") //Realizando solicitação do arquivo json com os dados do usuario
    .then((response) => response.json()) // obtendo resposta do arquivo json em objeto response.json - receber a resposta em corpo
    .then((data) => {
      let userFound = false; // definidindo usuario como não encontrado para futuramente realizar a confirmação caso encontrado
      data.user.forEach((user) => {
        // realizando a analise por cada usuario da array apresentada pelo response.json
        if (login == user.id) {
          //verificando usuario apresentasse no json
          if (password == user.senha) {
            //verificando se a senha do usuario condiz com o id encontrado no json
            console.log("Ok");
            userFound = true;
            if (user.cargo == "cientista") {
              lab.removeAttribute("disabled");
            } else if (user.cargo == "tecnico") {
              traje.removeAttribute("disabled");
            } else {
              rocket.removeAttribute("disabled");
            }
          }
        }
      });

      if (!userFound) {
        //se o user continuar false até aqui significa que não foi encontrado
        console.log("Usuário não encontrado ou senha incorreta");
        // Exibir uma mensagem de erro para o usuário
      }
    })
    .catch((error) => console.error("Erro no JSON", error)); //caso não consiga fazer a busca pelo Json
}
