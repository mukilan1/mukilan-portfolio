import GalleryModel from '../../models/gallery/model';

class GalleryController {
  constructor() {
    this.model = new GalleryModel();
  }

  getGalleryData() {
    return {
      pageMetadata: this.model.getPageMetadata(),
      categories: this.model.getCategories(),
      achievements: this.model.getAllAchievements()
    };
  }

  filterAchievements(category) {
    return this.model.getAchievementsByCategory(category);
  }

  getAchievementDetails(id) {
    return this.model.getAchievementById(parseInt(id));
  }

  getFeaturedAchievements() {
    return this.model.getFeaturedAchievements();
  }
}

export default GalleryController;
