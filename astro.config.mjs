import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: "https://withotto.app",
    adapter: netlify(),
    integrations: [
        starlight({
            components: {
                // Override the default components
                Footer: './src/components/Footer.astro'
            },
            customCss: ["./src/style.css"],
            title: 'With Otto support',
            favicon: '/favicons/favicon.svg',
            head: [{
                tag: 'link',
                attrs: {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicons/favicon-96x96.png',
                    sizes: '96x96'
                }
            }, {
                tag: 'link',
                attrs: {
                    rel: 'shortcut icon',
                    href: '/favicons/favicon.ico'
                }
            }, {
                tag: 'link',
                attrs: {
                    rel: 'apple-touch-icon',
                    href: '/favicons/apple-touch-icon.png',
                    sizes: '180x180'
                }
            }, {
                tag: 'meta',
                attrs: {
                    name: 'apple-mobile-web-app-title',
                    content: 'With Otto'
                }
            }, {
                tag: 'link',
                attrs: {
                    rel: 'manifest',
                    href: '/favicons/site.webmanifest'
                }
            }, {
                tag: 'link',
                attrs: {
                    rel: 'sitemap',
                    href: '/sitemap-index.xml'
                }
            },
            ],
            sidebar: [{
                label: 'Getting started',
                items: [{
                    label: 'Onboarding',
                    slug: 'getting-started/onboarding'
                }, {
                    label: 'Making the most of your trial',
                    slug: 'getting-started/making-the-most-of-your-trial'
                }, {
                    label: 'Giving Otto access to your clients',
                    slug: 'getting-started/giving-otto-access-to-your-clients'
                }]
            }, {
                label: 'Guides',
                items: [{
                    label: 'Bank rules',
                    slug: 'guides/bank-rules'
                }, {
                    label: 'SmartMatch',
                    slug: 'guides/smartmatch'
                }, {
                    label: 'GuidedMatch',
                    slug: 'guides/guidedmatch'
                }, {
                    label: 'Feedback',
                    slug: 'guides/feedback'
                }, {
                    label: 'What can be reconciled?',
                    slug: 'guides/what-can-be-reconciled'
                }, {
                    label: 'How does Otto decide what to reconcile?',
                    slug: 'guides/how-does-otto-decide-what-to-reconcile'
                }]
            }, {
                label: 'The portal',
                items: [{
                    label: 'Dashboard',
                    slug: 'portal/dashboard'
                }, {
                    label: 'Clients',
                    slug: 'portal/clients'
                }, {
                    label: 'Settings',
                    slug: 'portal/settings'
                }, {
                    label: 'Billing',
                    slug: 'portal/billing'
                }]
            }]
        }),
        tailwind({
            applyBaseStyles: false
        }),
        sitemap({
            lastmod: new Date(),
        }),
    ]
});
