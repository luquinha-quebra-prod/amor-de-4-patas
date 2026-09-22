class AppFooter extends HTMLElement {
  async connectedCallback() {
    const response = await fetch('./html/components/footer.html');
    const html = await response.text();

    this.innerHTML = html;
  }
}

customElements.define('app-footer', AppFooter);
