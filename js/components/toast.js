class AppToast extends HTMLElement {
  constructor() {
    super();

    this.ready = this.init();
  }

  async init() {
    const response = await fetch('./html/components/toast.html');
    const html = await response.text();

    this.innerHTML = html;
  }

  async show(mensagem, variant) {
    await this.ready;

    const toast = this.querySelector('.toast');

    if (!toast) return;

    toast.className = `toast toast-${variant}`;
    toast.querySelector('span').textContent = mensagem;
    toast.classList.add('show');

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

customElements.define('app-toast', AppToast);
