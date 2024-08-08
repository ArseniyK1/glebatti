const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "products",
        component: () => import("pages/ProductCatalogues.vue"),
      },
      { path: "profile", component: () => import("pages/UserProfile.vue") },
      { path: "cart", component: () => import("pages/CartPage.vue") },
      { path: "shops", component: () => import("pages/ShopsPage.vue") },
      { path: "admin-panel", component: () => import("pages/AdminPage.vue") },
    ],
  },
  { path: "/auth", component: () => import("pages/AuthPage.vue") },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
