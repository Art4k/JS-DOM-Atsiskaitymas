class HeaderImage {
  htmlElement;
  constructor({ text, url, className, elementType = "div" }) {
    this.htmlElement = document.createElement(elementType);

    if (className) this.htmlElement.className = className;

    this.htmlElement.innerText = text;
    this.htmlElement.innerHTML = `
    <img src="${url}" alt="Neskelbimai, neparduodu - neskelbiu.lt"></img>
    <div class="site-header-slogan">${text}</div>`;
  }
}

export default HeaderImage;
