export type ThemeMode = "light" | "dark";

export interface Skill {
  id?: string;
  skill_name: string;
  field: string[];
  skill_logo: string;
  order: number;
}

export interface Project {
  id?: string;
  preview_img?: string;
  project_description: string;
  project_description_raw_data?: string;
  project_link?: string;
  project_name: string;
  used_technologies?: UsedTechnologies;
}

export interface UsedTechnologyGroup {
  category: string;
  items: string[];
}

export type UsedTechnologies = string[] | UsedTechnologyGroup[];
