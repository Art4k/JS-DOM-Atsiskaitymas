class SiteFooter {
  htmlElement;

  constructor({ footerText }) {
    this.htmlElement = document.createElement("footer");
    this.htmlElement.className = "site-footer py-3";
    this.htmlElement.innerHTML = `<div class="site-footer-text text-center">${footerText}</div>`;
  }
}

export default SiteFooter;
