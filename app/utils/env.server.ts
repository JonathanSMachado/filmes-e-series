import { z } from "zod";

const schema = z.object({
  APP_NAME: z.string(),
  TMDB_API_KEY: z.string(),
  TMDB_TOKEN: z.string(),
  TMDB_POSTER_IMAGES_URL: z.string().url(),
  TMDB_BACKDROP_IMAGES_URL: z.string().url(),
  SENDGRID_API_KEY: z.string(),
  MAIL_NOTIFICATION_RECIPIENT: z.string().email(),
});

type ENV = z.infer<typeof schema>;

declare global {
  var ENV: ENV;
}

export const getEnv = () => {
  return schema.parse(process.env);
};
