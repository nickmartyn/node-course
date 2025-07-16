import { nanoid } from 'nanoid';

export class BrewsModel {
  
  static scope = 'singleton';

  #store = new Map();

  getAllBrews() {
    return Array.from(this.#store.values());
  }

  getBrewById(id) {
    return this.#store.get(id);
  }

  createBrew(brewData) {
    const id = nanoid();
    const brew = { id, ...brewData };
    this.#store.set(id, brew);
    return brew;
  }

  updateBrew(id, brewData) {
    if (!this.#store.has(id)) {
      return null;
    }
    const updatedBrew = { ...this.#store.get(id), ...brewData };
    this.#store.set(id, updatedBrew);
    return updatedBrew;
  }

  deleteBrew(id) {
    if (!this.#store.has(id)) {
      return null;
    }
    this.#store.delete(id);
    return id;
  }

}