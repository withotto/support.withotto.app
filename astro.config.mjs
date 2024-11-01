import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            components: {
                // Override the default components
                Footer: './src/components/Footer.astro',
            },
            customCss: [
                "./src/style.css",
            ],
            title: 'With Otto support',
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
            }],
        }),
        tailwind({
            applyBaseStyles: false,
        })
    ]
});
