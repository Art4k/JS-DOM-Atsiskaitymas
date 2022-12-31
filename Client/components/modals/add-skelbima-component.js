class AddSkelbimaComponent {
  htmlElement;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement("form");
    this.htmlElement.className = "add-skelbima-modal";
    this.htmlElement.innerHTML = `
    <div class="add-skelbima-form w-25">
    <h2 class="h2 text-center mb-4 fw-normal">Sukurti skelbimą
    <span class="close-modal float-end">&times;</span></h2>
    <div class="mb-1">
      <label for="skelbimo-title" class="form-label">Aprašymas</label>
      <input type="text" class="form-control" id="skelbimo-title" name="title">
    </div>
    <div class="mb-1">
      <label for="skelbimo-img" class="form-label">Nuotrauka</label>
      <input type="text" class="form-control" id="skelbimo-img" name="img">
    </div>
    <div class="row">
    <div class="mb-1 col-6">
      <label for="skelbimo-location" class="form-label">Miestas</label>
      <input type="text" class="form-control" id="skelbimo-location" name="location">
    </div>
    <div class="mb-3 col-6">
      <label for="skelbimo-price" class="form-label">Kaina</label>
      <input type="text" class="form-control" id="skelbimo-price" name="price">
    </div>
    </div>
    <div class="text-center">
    <div class="mb-4 form-check form-check-inline">
      <input type="radio" class="form-check-input" id="skelbimo-quality" name="quality" value="Poor">
      <label class="form-check-label text-danger" for="skelbimo-quality">Poor</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" class="form-check-input" id="skelbimo-quality2" name="quality" value="Normal">
      <label class="form-check-label text-warning" for="skelbimo-quality2">Normal</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" class="form-check-input" id="skelbimo-quality3" name="quality" value="Good">
      <label class="form-check-label text-success" for="skelbimo-quality3">Good</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" class="form-check-input" id="skelbimo-quality4" name="quality" value="Excellent">
      <label class="form-check-label text-primary" for="skelbimo-quality4">Excellent</label>
    </div>
    </div>
    <button type="submit" class="btn btn-success w-100">Patalpinti</button>
    </div>`;

    // Modalo uzdarymas
    this.htmlElement.querySelector(".close-modal").addEventListener("click", () => {
      this.htmlElement.remove();
    });

    this.htmlElement.addEventListener("submit", async (e) => {
      e.preventDefault();

      const skelbimoForm = new FormData(e.target);
      const title = skelbimoForm.get("title");
      const img = skelbimoForm.get("img");
      const location = skelbimoForm.get("location");
      const price = skelbimoForm.get("price");
      const quality = skelbimoForm.get("quality");

      // Checker..
      onSubmit({ title, img, location, price, quality });

      e.target.reset();
    });
  }
}

export default AddSkelbimaComponent;
