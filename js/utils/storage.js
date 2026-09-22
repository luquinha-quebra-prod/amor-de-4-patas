export function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

export function carregarDados(chave) {
  const dadosSalvos = localStorage.getItem(chave);

  if (!dadosSalvos) return null;

  return JSON.parse(dadosSalvos);
}
