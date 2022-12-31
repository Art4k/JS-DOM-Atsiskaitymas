class FlexComponent {
  htmlElement;

  constructor({ children }) {
    this.htmlElement = document.createElement("sector");
    this.htmlElement.id = "skelbimu-sarasas";
    this.htmlElement.append(...children);
  }
}

export default FlexComponent;
