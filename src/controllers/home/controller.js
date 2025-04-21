import HomeModel from '../../models/home/model';

class HomeController {
  constructor() {
    this.model = new HomeModel();
  }
  
  getHeroData() {
    return this.model.getHeroData();
  }
  
  getSkillsData() {
    return this.model.getSkillsData();
  }
  
  getProjectsData() {
    return this.model.getProjectsData();
  }
  
  // Business logic for filtering projects
  getFilteredProjects(tag) {
    const projects = this.model.getProjectsData();
    if (!tag) return projects;
    return projects.filter(project => project.tags.includes(tag));
  }
}

export default HomeController;
