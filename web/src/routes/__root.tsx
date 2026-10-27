import { createRootRouteWithContext } from "@tanstack/react-router";

import RootLayout from "@/app/layouts/RootLayout";
import type { RouterContext } from "@/shared/types/router-context";

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        title: "Ecommerce Operations",
      },
      {
        name: "description",
        content: "Ecommerce operations management system",
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: () => <p>Page not found</p>,
});
