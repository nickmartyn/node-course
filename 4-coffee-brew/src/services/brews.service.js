export class BrewsService {

  static scope = 'scoped';

  constructor(brewsModel) {
    this.brewsModel = brewsModel;
 }

  async getAllBrews(minRatingFilter = null) {
    if (minRatingFilter) {
      console.log(`Filtering brews with rating >= ${minRatingFilter}`);
      const data = await this.brewsModel.getAllBrews().filter(brew => brew.rating >= minRatingFilter);
      return data
    }
    return this.brewsModel.getAllBrews();
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