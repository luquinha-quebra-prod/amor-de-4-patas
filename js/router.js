import { initCadastro } from './pages/cadastro.js';
import { initProjetos } from './pages/projetos.js';

const routes = {
  '/': './html/pages/home.html',
  '/projetos': './html/pages/projetos.html',
  '/cadastro': './html/pages/cadastro.html',
};

const app = document.querySelector('#app');

export async function render(path) {
  const route = routes[path];

  if (!route) {
    app.innerHTML = `
      <h1>Página não encontrada</h1>
    `;
    return;
  }

  const response = await fetch(route);
  const html = await response.text();

  app.innerHTML = html;

  if (path === '/projetos') {
    initProjetos();
  }

  if (path === '/cadastro') {
    initCadastro();
  }
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-route]');

  if (!link) return;

  event.preventDefault();

  const path = new URL(link.href).pathname;

  history.pushState({}, '', path);

  render(path);
});

window.addEventListener('popstate', () => {
  render(window.location.pathname);
});
