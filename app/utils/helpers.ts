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

function getVideoThumbnail(site?: string, key?: string): string | undefined {
  if (!site || !key) return undefined;

  switch (site.toLowerCase()) {
    case "youtube":
      return `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;
    case "vimeo":
      return `https://vumbnail.com/${key}.jpg`;
    default:
      return undefined;
  }
}

export { getVideoBaseUrl, getVideoThumbnail };
