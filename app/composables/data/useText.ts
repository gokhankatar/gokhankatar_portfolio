export const useText = () => {
  const formatField = (field?: string) => {
    return field ? field.replace(/_/g, " ") : "";
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trim()}...`;
  };

  return {
    formatField,
    truncateText,
  };
};
