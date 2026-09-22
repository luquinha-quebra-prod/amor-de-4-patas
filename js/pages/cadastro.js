import { aplicarMascaraCPF, aplicarMascaraTelefone, aplicarMascaraCEP } from '../utils/masks.js';

import { validarIdade, mostrarErro, limparErro } from '../utils/validation.js';

import { salvarDados, carregarDados } from '../utils/storage.js';

function obterDadosFormulario(form) {
  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());
}

export function initCadastro() {
  const form = document.querySelector('.cadastro');

  if (!form) return;

  const toast = document.querySelector('app-toast');

  const dadosSalvos = carregarDados('cadastro');

  if (dadosSalvos) {
    Object.entries(dadosSalvos).forEach(([campo, valor]) => {
      const elemento = form.elements[campo];

      if (elemento) {
        elemento.value = valor;
      }
    });
  }

  const cpf = document.querySelector('#cpf');
  const telefone = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');
  const nascimento = document.querySelector('#nascimento');

  const campos = form.querySelectorAll('input, select');

  campos.forEach((campo) => {
    campo.addEventListener('input', () => {
      if (campo.checkValidity()) {
        limparErro(campo);
      }
    });

    campo.addEventListener('change', () => {
      if (campo.checkValidity()) {
        limparErro(campo);
      }
    });
  });

  cpf?.addEventListener('input', () => {
    aplicarMascaraCPF(cpf);
  });

  telefone?.addEventListener('input', () => {
    aplicarMascaraTelefone(telefone);
  });

  cep?.addEventListener('input', () => {
    aplicarMascaraCEP(cep);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      campos.forEach((campo) => {
        if (!campo.checkValidity()) {
          if (campo.validity.valueMissing) {
            mostrarErro(campo, 'Este campo é obrigatório.');
          } else if (campo.validity.typeMismatch) {
            mostrarErro(campo, 'Informe um formato válido.');
          } else if (campo.validity.patternMismatch) {
            mostrarErro(campo, 'Informe o formato correto.');
          }
        } else {
          limparErro(campo);
        }
      });

      toast?.show('Preencha os campos corretamente.', 'error');

      return;
    }

    if (!validarIdade(nascimento.value)) {
      mostrarErro(nascimento, 'É necessário ter pelo menos 18 anos.');

      toast?.show('É necessário ter pelo menos 18 anos para realizar o cadastro.', 'error');

      nascimento.focus();

      return;
    }

    const dados = obterDadosFormulario(form);

    salvarDados('cadastro', dados);

    toast?.show('Cadastro realizado com sucesso!', 'success');

    form.reset();
  });
}
