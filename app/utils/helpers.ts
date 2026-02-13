function getVideoBaseUrl(site: string): string {
  switch (site.toLowerCase()) {
    case "youtube":
      return "https://www.youtube.com/watch?v=";
    case "vimeo":
      return "https://vimeo.com/";
    default:
      return "";
  }
}

export { getVideoBaseUrl };
