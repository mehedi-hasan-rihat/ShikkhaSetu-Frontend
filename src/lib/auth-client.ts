import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    onRequest: async (context) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (token) {
        context.headers.set("Authorization", `Bearer ${token}`);
      }
      return context;
    },
  },
});