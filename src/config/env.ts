import { z } from 'zod';

const envSchema = z.object({
  DB_NAME: z.string({
    required_error: 'DB_NAME is required',
  }),
  DB_HOST: z.string({
    required_error: 'DB_HOST is required',
  }),
  DB_USERNAME: z.string({
    required_error: 'DB_USERNAME is required',
  }),
  DB_PASSWORD: z.string({
    required_error: 'DB_PASSWORD is required',
  }),
  DB_PORT: z.string({
    required_error: 'DB_PORT is required',
  }),
  RABBITMQ_URL: z.string({
    required_error: 'RABBITMQ_URL is required',
  }),
  REDIS_PASSWORD: z.string({
    required_error: 'REDIS_PASSWORD is required',
  }),
  REDIS_PORT: z.string({
    required_error: 'REDIS_PORT is required',
  }),
  REDIS_HOST: z.string({
    required_error: 'REDIS_HOST is required',
  }),
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = () => {
  try {
    const envValidated = envSchema.parse(process.env);
    return envValidated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorIntro = `ENV validation failed. Total Errors: ${error.errors.length} `;

      const errorsMessages = error.errors
        .map((error, index) => `\n${index + 1}. ${error.message}`)
        .join('');
      throw new Error(`${errorIntro} ${errorsMessages}`);
    }
    throw new Error(`ENV validation failed: ${error}`);
  }
};
