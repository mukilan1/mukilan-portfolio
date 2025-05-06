class HomeModel {
  constructor() {
    this.heroData = {
      name: "Mukilan",
      title: "App Developer | Automation Specialist | Robotics Engineer | Backend Developer as Django | Prompt Engineering | Leadership Quality",
      subTitle: "Bringing innovative solutions to life through technology",
      entrepreneur: "Entrepreneur & Technology Visionary",
      image: "/profile.jpg"
    };
    
    this.skillsData = [
      { name: "App Development", level: 95, icon: "/icons/app-dev.svg" },
      { name: "Automation", level: 90, icon: "/icons/automation.svg" },
      { name: "Robotics", level: 85, icon: "/icons/robotics.svg" },
      { name: "Leadership", level: 92, icon: "/icons/leadership.svg" },
      { name: "Public Speaking", level: 88, icon: "/icons/speaking.svg" }
    ];
    
    this.projectsData = [
      {
        title: "Autonomous Robot Assistant",
        description: "Created an AI-powered robot for home and office automation",
        image: "/projects/robot.jpg",
        tags: ["Robotics", "AI", "IoT"]
      },
      {
        title: "Enterprise Automation Platform",
        description: "Developed a comprehensive solution for business process automation",
        image: "/projects/automation.jpg",
        tags: ["Automation", "Enterprise", "SaaS"]
      },
      {
        title: "Mobile App Ecosystem",
        description: "Designed and built a suite of interconnected mobile applications",
        image: "/projects/app.jpg",
        tags: ["Mobile", "React Native", "API"]
      }
    ];
  }
  
  getHeroData() {
    return this.heroData;
  }
  
  getSkillsData() {
    return this.skillsData;
  }
  
  getProjectsData() {
    return this.projectsData;
  }
}

export default HomeModel;
