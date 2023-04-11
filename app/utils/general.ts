export function getVideoBaseUrl(site: string): string {
  switch (site) {
    case "YouTube":
      return "https://www.youtube.com/watch?v=";
    case "Vimeo":
      return "https://vimeo.com/";
    default:
      throw new Error("Unknown site");
  }
}
