
export class BrewsController { 

  static scope = 'scoped';

  constructor(brewsService) {
    console.log(`BrewsController initialized`);
    this.brewsService = brewsService;
  }

  async getAllBrews(req, res) {
    const filter = req.query.minRating ? req.query.minRating : null;
    try {
      const brews = await this.brewsService.getAllBrews(filter);
      res.status(200).json(brews);
    } catch (_error) {
      res.status(400).json({ error: 'Failed to fetch brews' });
    }
  }

  async getBrewById(req, res) {
    const { id } = req.params;
    try {
      const brew = await this.brewsService.getBrewById(id);
      if (!brew) {
        return res.status(404).json({ error: 'Brew not found' });
      }
      res.status(200).json(brew);
    } catch (_error) {
      res.status(400).json({ error: 'Failed to fetch brew' });
    }
  } 

  async createBrew(req, res) {
    try {
      const brew = await this.brewsService.createBrew(req.body);
      res.status(201).json(brew);
    } catch (_error) {
      res.status(400).json({ error: 'Failed to create brew' });
    }
  }

  async updateBrew(req, res) {
    const { id } = req.params;
    try {
      const updatedBrew = await this.brewsService.updateBrew(id, req.body);
      if (!updatedBrew) {
        return res.status(404).json({ error: 'Brew not found' });
      }
      res.status(200).json(updatedBrew);
    } catch (_error) {
      res.status(400).json({ error: 'Failed to update brew' });
    }
  }

  async deleteBrew(req, res) {
    const { id } = req.params;
    try {
      this.brewsService.deleteBrew(id);
      res.status(204).send(id);
    } catch (_error) {
      res.status(400).json({ error: 'Failed to delete brew' });
    }
  } 
}
