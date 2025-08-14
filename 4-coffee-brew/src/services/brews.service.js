export class BrewsService {

  static scope = 'scoped';

  constructor(brewsModel) {
    this.brewsModel = brewsModel;
 }

  async getAllBrews(ratingMinFilter = null, methodFilter = null) {
    let data = await this.brewsModel.getAllBrews();
    if (ratingMinFilter) {
      console.log(`Filtering brews with rating >= ${ratingMinFilter}`);
      data = data.filter(brew => brew.rating >= ratingMinFilter);
    }
    if (methodFilter) {
      console.log(`Filtering brews with method: ${methodFilter}`);
      data = data.filter(brew => brew.method === methodFilter);
    }
    return data;
  }

  async getBrewById(id) {
    return this.brewsModel.getBrewById(id);
  }

  async createBrew(brewData) {
    return this.brewsModel.createBrew(brewData);
  }

  async updateBrew(id, brewData) {
    return this.brewsModel.updateBrew(id, brewData);
  }

  async deleteBrew(id) {
    return this.brewsModel.deleteBrew(id);
  }
}