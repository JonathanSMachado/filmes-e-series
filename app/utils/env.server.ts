import { z } from "zod";

const schema = z.object({
  APP_NAME: z.string(),
  TMDB_API_URL: z.url(),
  TMDB_API_KEY: z.string(),
  TMDB_TOKEN: z.string(),
  TMDB_POSTER_IMAGES_URL: z.url(),
  TMDB_BACKDROP_IMAGES_URL: z.url(),
  // SENDGRID_API_KEY: z.string(),
  RESEND_API_KEY: z.string(),
  MAIL_NOTIFICATION_RECIPIENT: z.email(),
  VITE_LINKEDIN_URL: z.url(),
  VITE_GITHUB_URL: z.url(),
});

export type ENV = z.infer<typeof schema>;

declare global {
  var ENV: ENV;
}

export const getEnv = (): ENV => {
  if (global.ENV) return global.ENV;

  const parsed = schema.parse(process.env);

  global.ENV = parsed;

  return parsed;
};

export const getEnvVar = <K extends keyof ENV>(key: K): ENV[K] => {
  return getEnv()[key];
};

export { schema as envSchema };
