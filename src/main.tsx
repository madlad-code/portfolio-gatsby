import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

// Initiera QueryClient för datahantering och caching (TanStack Query)
const queryClient = new QueryClient();

// Konfigurera routern med den genererade rutträdet
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent", // Förladda rutter när användaren hovrar över länkar
});

// Registrera routern för typsäkerhet i hela applikationen
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Renders appen och injicerar providers för routing och datafetching
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
