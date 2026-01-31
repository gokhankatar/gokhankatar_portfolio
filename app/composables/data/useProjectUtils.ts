import type { Project, UsedTechnologies, UsedTechnologyGroup } from "~/composables/core/interfaces";

export const useProjectUtils = () => {
  const getProjectSlug = (project: Project) => {
    if (project.id) return project.id;
    return project.project_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const getProjectTechnologies = (project: Project) => {
    const tech: UsedTechnologies | undefined = project.used_technologies;
    if (!tech) return [];
    if (Array.isArray(tech) && tech.length > 0) {
      if (typeof tech[0] === "string") {
        return tech as string[];
      }
      return (tech as UsedTechnologyGroup[]).flatMap((group) => group.items);
    }
    return [];
  };

  return {
    getProjectSlug,
    getProjectTechnologies,
  };
};
