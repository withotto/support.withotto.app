import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import starlightImageZoom from "starlight-image-zoom";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://support.withotto.app",
  adapter: netlify(),

  integrations: [
    starlight({
      plugins: [starlightImageZoom()],
      customCss: ["./src/styles/global.css", "./src/styles/brand.css"],
      title: "With Otto support",
      logo: {
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      favicon: "/favicons/favicon.svg",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            href: "/favicons/favicon-96x96.png",
            sizes: "96x96",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "shortcut icon",
            href: "/favicons/favicon.ico",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            href: "/favicons/apple-touch-icon.png",
            sizes: "180x180",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "apple-mobile-web-app-title",
            content: "With Otto",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "manifest",
            href: "/favicons/site.webmanifest",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "sitemap",
            href: "/sitemap-index.xml",
          },
        },
      ],
      sidebar: [
        {
          label: "Bank Rec",
          items: [
            {
              label: "Getting started",
              items: [
                {
                  label: "Onboarding",
                  slug: "bank-rec/getting-started/onboarding",
                },
                {
                  label: "Making the most of your trial",
                  slug: "bank-rec/getting-started/making-the-most-of-your-trial",
                },
                {
                  label: "Giving Otto access to your clients",
                  slug: "bank-rec/getting-started/giving-otto-access-to-your-clients",
                },
              ],
            },
            {
              label: "Guides",
              items: [
                {
                  label: "Bank rules",
                  slug: "bank-rec/guides/bank-rules",
                },
                {
                  label: "SmartMatch",
                  slug: "bank-rec/guides/smartmatch",
                },
                {
                  label: "GuidedMatch",
                  slug: "bank-rec/guides/guidedmatch",
                },
                {
                  label: "Feedback",
                  slug: "bank-rec/guides/feedback",
                },
                {
                  label: "What can be reconciled?",
                  slug: "bank-rec/guides/what-can-be-reconciled",
                },
                {
                  label: "How does Otto decide what to reconcile?",
                  slug: "bank-rec/guides/how-does-otto-decide-what-to-reconcile",
                },
              ],
            },
            {
              label: "The portal",
              items: [
                {
                  label: "Dashboard",
                  slug: "bank-rec/portal/dashboard",
                },
                {
                  label: "Clients",
                  slug: "bank-rec/portal/clients",
                },
                {
                  label: "Practice and client settings",
                  slug: "bank-rec/portal/settings",
                },
                {
                  label: "User management",
                  slug: "bank-rec/portal/user-management",
                },
                {
                  label: "Your settings",
                  slug: "bank-rec/portal/user-profile",
                },
                {
                  label: "Securing your account",
                  slug: "bank-rec/portal/securing-your-account",
                },
                {
                  label: "Billing",
                  slug: "bank-rec/portal/billing",
                },
              ],
            },
          ],
        },
        {
          label: "Capture",
          items: [
            {
              label: "Overview",
              slug: "capture",
            },
            {
              label: "Getting started",
              items: [
                {
                  label: "Overview",
                  slug: "capture/getting-started",
                },
                {
                  label: "Connecting Xero",
                  slug: "capture/getting-started/connecting-xero",
                },
                {
                  label: "Configuring clients",
                  slug: "capture/getting-started/configuring-clients",
                },
                {
                  label: "Submitting documents",
                  slug: "capture/getting-started/submitting-documents",
                },
              ],
            },
            {
              label: "Guides",
              items: [
                {
                  label: "How Capture processes documents",
                  slug: "capture/guides/processing",
                },
                {
                  label: "Reviewing and publishing",
                  slug: "capture/guides/reviewing",
                },
                {
                  label: "Data flow",
                  slug: "capture/guides/data-flow",
                },
                {
                  label: "Organisation settings",
                  slug: "capture/guides/organisation-settings",
                },
                {
                  label: "Custom email domain",
                  slug: "capture/guides/custom-email-domain",
                },
              ],
            },
            {
              label: "FAQ",
              slug: "capture/faq",
            },
          ],
        },
      ],
    }),
    sitemap({
      lastmod: new Date(),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
