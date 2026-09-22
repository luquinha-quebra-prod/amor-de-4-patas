class AppButton extends HTMLElement {
  async connectedCallback() {
    const label = this.textContent.trim();

    const response = await fetch('./html/components/button.html');
    const html = await response.text();

    const variant = this.getAttribute('variant') || 'primary';

    this.innerHTML = html;

    const button = this.querySelector('button');

    button.textContent = label;
    button.classList.add(`button-${variant}`);
  }
}

customElements.define('app-button', AppButton);
