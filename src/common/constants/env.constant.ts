export const PORT =
  Number.parseInt(process.env.SCRAPER_PORT || process.env.PORT, 10) || 8080;
