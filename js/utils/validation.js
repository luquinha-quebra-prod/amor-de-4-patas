export function validarIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(`${dataNascimento}T00:00:00`);

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());

  if (aindaNaoFezAniversario) {
    idade--;
  }

  return idade >= 18;
}

export function mostrarErro(campo, mensagem) {
  const mensagemErro = document.querySelector(`#erro-${campo.id}`);

  campo.classList.add('erro');

  if (mensagemErro) {
    mensagemErro.textContent = mensagem;
    mensagemErro.classList.add('visivel');
  }
}

export function limparErro(campo) {
  const mensagemErro = document.querySelector(`#erro-${campo.id}`);

  campo.classList.remove('erro');

  if (mensagemErro) {
    mensagemErro.textContent = '';
    mensagemErro.classList.remove('visivel');
  }
}
