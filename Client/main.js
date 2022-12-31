// API imports
import ApiService from "./api-service.js";

// Site header imports
import SiteHeaderComponent from "./components/wrappers/siteHeader-component.js";
import SiteHeader from "./components/header/siteHeader.js";
import HeaderImage from "./components/header/headerImage.js";

// Site footer imports
import SiteFooter from "./components/footer/siteFooter.js";

// Skelbimu content imports
import ContentTitle from "./components/content/content-title.js";
import SkelbimaiComponent from "./components/content/skelbimai.js";

// Other imports
import ContainerComponent from "./components/wrappers/container-component.js";
import FlexComponent from "./components/wrappers/flex-component.js";

// Modal imports
import AddSkelbimaComponent from "./components/modals/add-skelbima-component.js";

const rootHtmlElement = document.querySelector("#root");
if (rootHtmlElement === null) throw new Error("Error: #root element was not found in HTML file. Please refresh the page.");

// Header
let siteHeader;
let headerImage;

// Footer
let siteFooter;

// Content
let skelbimaiComponent;

// Modals
let addSkelbimaComponent;

const onDeletePreke = async ({ id, title, img, location, price, quality }) => {
  try {
    await ApiService.deletePreke({ id, title, img, location, price, quality });
  } catch (error) {
    alert(error);
  } finally {
    const sarasas = await ApiService.getPrekes();
    skelbimaiComponent.displayActions(sarasas);
  }
};

const onCreatePreke = async ({ title, img, location, price, quality }) => {
  try {
    await ApiService.createPreke({ title, img, location, price, quality });
  } catch (error) {
    alert(error);
  } finally {
    const sarasas = await ApiService.getPrekes();
    skelbimaiComponent.displayActions(sarasas);
  }
};

const onUpdatePreke = async ({ id, props }) => {
  try {
    await ApiService.updatePreke({ id, props });
  } catch (error) {
    alert(error);
  } finally {
    const sarasas = await ApiService.getPrekes();
    skelbimaiComponent.displayActions(sarasas);
  }
};

ApiService.getPrekes()
  .then((sarasas) => {
    // Headeris
    headerImage = new HeaderImage({
      text: `Nelankomiausias skelbimų portalas`,
      url: "./assets/img/logotipas_ua.svg",
      className: "header-image",
    });

    siteHeader = new SiteHeader({
      menuItems: ["PRIDĖTI SKELBIMĄ", "EN", "Siuntos", "Įsiminti", "Peržiūrėti", "Paieškos", "Prisijungti", "Registruotis"],
    });

    siteFooter = new SiteFooter({ footerText: "Copyright 1995" });

    const header = new SiteHeaderComponent({
      children: [headerImage.htmlElement, siteHeader.htmlElement],
    });
    // END-Headeris

    // Modal toggle
    siteHeader.htmlElement.firstChild.addEventListener("click", () => {
      rootHtmlElement.append(addSkelbimaComponent.htmlElement);
    });

    // Contentas
    const skelbimaiContent = new ContentTitle({
      text: "Visi Skelbimai",
      count: sarasas.length,
      className: "content-title text-uppercase lead",
    });
    skelbimaiComponent = new SkelbimaiComponent({ sarasas, onDeletePreke, onSubmit: onUpdatePreke });
    // Modalas
    addSkelbimaComponent = new AddSkelbimaComponent({ onSubmit: onCreatePreke });
    // END-Contentas

    // Wrappers
    const flexComponent = new FlexComponent({
      children: [skelbimaiComponent.htmlElement],
    });
    const container = new ContainerComponent({
      children: [header.htmlElement, skelbimaiContent.htmlElement, flexComponent.htmlElement, siteFooter.htmlElement],
    });

    rootHtmlElement.append(container.htmlElement);
  })
  .catch((error) => {
    console.error(error);
  });
