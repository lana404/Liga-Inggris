class HomePage extends  HTMLElement{
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="container">
        <h5> Selamat Data di Liga Inggris <h5>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
