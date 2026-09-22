class AppHeader extends HTMLElement {
  async connectedCallback() {
    const response = await fetch('./html/components/header.html');
    const html = await response.text();

    this.innerHTML = html;
  }
}

customElements.define('app-header', AppHeader);
