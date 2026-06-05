// In SPA mode all config comes from import.meta.env (Vite).
// Prefix public vars with VITE_ in your .env file.
export function getServerConfig() {
  return {
    nodeEnv: import.meta.env.MODE,
  };
}
