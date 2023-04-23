export function checkEnvVars(envVars: string[]) {
  envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(`Missing environment variable: ${envVar}`);
      process.exit(1);
    }
  });
}
