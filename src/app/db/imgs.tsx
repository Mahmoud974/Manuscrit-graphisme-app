// types/project.ts
export interface Project {
    id: number;
    title: string;
    category: "Identité Graphique" | "Pitch Deck" | "UI Design";
    slug: string;
   
    thumbnailImage: string;
  
    detailImages: [string, string, string];
  
    tools: string[];
    projectType: string[];
    colors: string[];
    description: string;
    subtitle?: string;
  }
  
  // data/projects.ts
  export const projects: Project[] = [
    {
      id: 1,
      title: "Aitom",
      category: "UI Design",
      slug: "aitom",
      thumbnailImage: "/images/portfolios/aitom/thumbnail.png",
      detailImages: [
        "/images/portfolios/aitom/detail-1.png",
        "/images/portfolios/aitom/detail-2.png",
        "/images/portfolios/aitom/detail-3.png",
      ],
      tools: ["Adobe Photoshop", "Figma"],
      projectType: ["Interface utilisateur", "Prototype interactif"],
      colors: ["#1717bc", "#bbc2ff", "#ff6942", "#ffcbbf"],
      description: "Une interface moderne et intuitive pour une expérience utilisateur optimale.",
      subtitle: "UI Design – Moderne · Intuitif · Élégant",
    },
    {
      id: 2,
      title: "WebWize",
      category: "Identité Graphique",
      slug: "webwize",
      thumbnailImage: "/images/portfolios/webwize/thumbnail.png",
      detailImages: [
        "/images/portfolios/webwize/detail-1.png",
        "/images/portfolios/webwize/detail-2.png",
        "/images/portfolios/webwize/detail-3.png",
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      projectType: ["Identité visuelle", "Logo"],
      colors: ["#2C3E50", "#E74C3C", "#ECF0F1"],
      description: "Une identité forte et mémorable pour une agence web innovante.",
      subtitle: "Identité graphique – Innovant · Professionnel · Tech",
    },
    {
      id: 3,
      title: "React Energy Drink",
      category: "Identité Graphique",
      slug: "react-energy-drink",
      thumbnailImage: "/images/portfolios/react/thumbnail.png",
      detailImages: [
        "/images/portfolios/react/detail-1.png",
        "/images/portfolios/react/detail-2.png",
        "/images/portfolios/react/detail-3.png",
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      projectType: ["Packaging", "Identité visuelle"],
      colors: ["#61DAFB", "#282C34", "#FFD700"],
      description: "Un design énergique et dynamique pour une boisson révolutionnaire.",
      subtitle: "Identité graphique – Énergique · Dynamique · Audacieux",
    },
 
  ];
 
  export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
  }
  
  export function getAdjacentProjects(currentSlug: string): {
    previous: Project | null;
    next: Project | null;
  } {
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    
    return {
      previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
    };
  }