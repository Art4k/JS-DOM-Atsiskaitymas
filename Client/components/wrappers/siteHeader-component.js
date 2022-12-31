class SiteHeaderComponent {
  htmlElement;

  constructor({ children }) {
    this.htmlElement = document.createElement("header");
    this.htmlElement.className = "site-header";
    this.htmlElement.append(...children);
  }
}

export default SiteHeaderComponent;
