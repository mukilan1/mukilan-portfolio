import achievementsData from '../../data/achievements.json';

class GalleryModel {
  constructor() {
    this.data = achievementsData;
  }

  getAllAchievements() {
    return this.data.achievements;
  }

  getFeaturedAchievements() {
    return this.data.achievements.filter(achievement => achievement.featured);
  }

  getAchievementsByCategory(category) {
    if (category === 'All') {
      return this.data.achievements;
    }
    return this.data.achievements.filter(achievement => achievement.category === category);
  }

  getCategories() {
    return this.data.categories;
  }

  getAchievementById(id) {
    return this.data.achievements.find(achievement => achievement.id === id);
  }

  getPageMetadata() {
    return {
      title: this.data.title,
      subtitle: this.data.subtitle
    };
  }
}

export default GalleryModel;
