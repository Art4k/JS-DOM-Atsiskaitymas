const SERVER_ADDRESS = "http://localhost:5001";
const SKELBIMO_COLLECTION_NAME = "prekes";

const formatError = (error) => {
  return error.message;
};

const requestSettings = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const ApiService = {
  async getPrekes() {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${SKELBIMO_COLLECTION_NAME}`, requestSettings);
      const items = await response.json();

      return items;
    } catch (error) {
      throw formatError(error);
    }
  },

  async deletePreke({ id, title }) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${SKELBIMO_COLLECTION_NAME}/${id}`, {
        ...requestSettings,
        method: "DELETE",
      });
      if (response.status === 404) {
        throw new Error(`Tokios prekės - "${title}" nėra.`);
      }
      const deletedItem = await response.json();

      return deletedItem;
    } catch (error) {
      throw formatError(error);
    }
  },

  async createPreke(data) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${SKELBIMO_COLLECTION_NAME}`, {
        ...requestSettings,
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        throw new Error(`Naujos prekės sukurti nepavyko`);
      }
    } catch (error) {
      throw formatError(error);
    }
  },

  async updatePreke({ id, props }) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${SKELBIMO_COLLECTION_NAME}/${id}`, {
        ...requestSettings,
        method: "PATCH",
        body: JSON.stringify(props),
      });

      if (response.status === 404) {
        throw new Error(`Prekės informacijos pakeisti nepavyko`);
      }
    } catch (error) {
      throw formatError(error);
    }
  },
};

export default ApiService;
