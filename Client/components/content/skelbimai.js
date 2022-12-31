class SkelbimaiComponent {
  htmlElement;
  onDeletePreke;
  onSubmit;
  constructor({ sarasas, onDeletePreke, onSubmit }) {
    this.htmlElement = document.createElement("ul");
    this.htmlElement.className = "skelbimo-list row";
    this.onDeletePreke = onDeletePreke;
    this.onSubmit = onSubmit;
    this.sarasas = sarasas;
    this.displayActions(sarasas);
  }

  enablePrekesEditAction = ({ editButton, enableEditing }) => {
    editButton.addEventListener("click", () => {
      enableEditing();
    });
  };

  enablePrekesDeleteAction = ({ id, initialState, deleteButton }) => {
    deleteButton.addEventListener("click", () => this.onDeletePreke({ id, title: initialState.title }));
  };

  enablePrekiuActions = ({ li, id, title, img, location, price, quality }) => {
    const initialState = { title, img, location, price, quality };
    const deleteButton = li.querySelector(".btn-danger");
    const editButton = li.querySelector(".btn-warning");

    const enableEditing = () => {
      li.innerHTML = `
      <form class="edit-skelbima-form">
      <h2 class="h2 text-center mb-4 fw-normal medium">Redaguoti skelbimą
      <span class="close-modal float-end">&times;</span></h2>
      <div class="mb-1">
        <label for="skelbimo-title" class="form-label">Aprašymas</label>
        <input type="text" class="form-control" id="skelbimo-title" name="title" value="${title}">
      </div>
      <div class="mb-1">
        <label for="skelbimo-img" class="form-label">Nuotrauka</label>
        <input type="text" class="form-control" id="skelbimo-img" name="img" value="${img}">
      </div>
      <div class="row">
      <div class="mb-1 col-6">
        <label for="skelbimo-location" class="form-label">Miestas</label>
        <input type="text" class="form-control" id="skelbimo-location" name="location" value="${location}">
      </div>
      <div class="mb-3 col-6">
        <label for="skelbimo-price" class="form-label">Kaina</label>
        <input type="text" class="form-control" id="skelbimo-price" name="price" value="${price}">
      </div>
      </div>
      <div class="text-center">
      <div class="mb-4 form-check form-check-inline">
        <input type="radio" class="form-check-input" id="skelbimo-quality" name="quality" value="Poor" 
        ${quality === "Poor" ? "checked" : null}>
        <label class="form-check-label text-danger" for="skelbimo-quality">Poor</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" class="form-check-input" id="skelbimo-quality2" name="quality" value="Normal"
        ${quality === "Normal" ? "checked" : null}
        >
        <label class="form-check-label text-warning" for="skelbimo-quality2">Normal</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" class="form-check-input" id="skelbimo-quality3" name="quality" value="Good"
        ${quality === "Good" ? "checked" : null}
        >
        <label class="form-check-label text-success" for="skelbimo-quality3">Good</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" class="form-check-input" id="skelbimo-quality4" name="quality" value="Excellent"
        ${quality === "Excellent" ? "checked" : null}
        >
        <label class="form-check-label text-primary" for="skelbimo-quality4">Excellent</label>
      </div>
      </div>
      <button type="submit" class="btn btn-success w-100">Atnaujinti</button>
      </form>`;

      li.querySelector(".close-modal").addEventListener("click", (e) => {
        this.displayActions(this.sarasas);
      });

      li.addEventListener("submit", async (e) => {
        e.preventDefault();

        const skelbimoForm = new FormData(e.target);
        const title = skelbimoForm.get("title");
        const img = skelbimoForm.get("img");
        const location = skelbimoForm.get("location");
        const price = skelbimoForm.get("price");
        const quality = skelbimoForm.get("quality");
        const props = { title, img, location, price, quality };

        this.onSubmit({ id, props });

        e.target.reset();
      });
    };

    const rowProps = {
      id,
      initialState,
      li,
      deleteButton,
      editButton,
      enableEditing,
    };

    this.enablePrekesDeleteAction(rowProps);
    this.enablePrekesEditAction(rowProps);
  };

  createPrekiuList = ({ id, title, img, location, price, quality }) => {
    const li = document.createElement("li");
    li.className = "skelbimo-box col-3 m-1 mb-5 p-2";
    li.innerHTML = `
    <div style="display:none" id="${id}"></div>
      <img class="skelbimo-img" src="${img}" alt="Skelbimo nuotrauka">
      <span class="skelbimo-title text-center">${title}</span>
      <div class="row text-center">
      <div class="skelbimo-location col-6">${location}</div>
      <div class="skelbimo-price col-6 text-success">${price} eur.</div>
      </div>
      <span class="skelbimo-quality text-center">Būklė: ${quality}</span>
      <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-warning btn-sm">⟳ Atnaujinti</button>
        <button class="btn btn-danger btn-sm">✕ Ištrinti</button>
      </div>`;

    this.enablePrekiuActions({ li, id, title, img, location, price, quality });

    return li;
  };

  displayActions = (sarasas) => {
    this.htmlElement.innerHTML = null;
    const prekiuSarasasHtmlElements = sarasas.map(this.createPrekiuList);
    this.htmlElement.append(...prekiuSarasasHtmlElements);
  };
}

export default SkelbimaiComponent;
