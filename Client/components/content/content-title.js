class ContentTitle {
  htmlElement;

  constructor({ text, count, className, elementType = "h1" }) {
    this.htmlElement = document.createElement(elementType);

    if (className) this.htmlElement.className = className;

    this.htmlElement.innerText = text + ` (${count})`;
  }
}

export default ContentTitle;
