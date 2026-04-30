export interface ResumeData {
  name: string
  title: string
  location: string
  email: string
  website: string
  linkedin: string
  github: string
  phone: string
  about: string
  experience: Experience[]
  projects: Project[]
  awards: Award[]
  coursework: Course[]
  education: Education[]
  technologies: Technologies
}

export interface Experience {
  role: string
  company: string
  period: string
  bullets: string[]
}

export interface Project {
  name: string
  period: string
  description: string
  bullets: string[]
  tools: string[]
  categories: string[]
}

export interface Award {
  title: string
  period: string
  bullets: string[]
  tools: string[]
}

export interface Course {
  title: string
  organization: string
  period: string
  bullets: string[]
  tools: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
  gpa?: string
}

export interface Technologies {
  languages: string[]
  toolsAndFrameworks: string[]
  databaseAndInfrastructure: string[]
}
