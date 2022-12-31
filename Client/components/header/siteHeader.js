class SiteHeader {
  htmlElement;

  constructor({ menuItems }) {
    this.htmlElement = document.createElement("ul");
    this.htmlElement.className = "header-menu";

    for (let i = 0; i < menuItems.length; i++) {
      this.htmlElement.innerHTML += `<li>${menuItems[i]}</li>`;
    }
  }
}

export default SiteHeader;
