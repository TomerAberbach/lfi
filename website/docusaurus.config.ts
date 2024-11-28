import { themes as prismThemes } from 'prism-react-renderer'
import type { Config, Plugin } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import type { TypeDocOptions as TypedocOptions } from 'typedoc'
import type { PluginOptions as TypedocMarkdownPluginOptions } from 'docusaurus-plugin-typedoc'

const githubOrganizationName = `TomerAberbach`
const githubProjectName = `lfi`
const gitHubUrl = `https://github.com/${githubOrganizationName}/${githubProjectName}`
const editUrl = `${gitHubUrl}/tree/main/website/`

const config: Config = {
  title: `lfi`,
  tagline: `A lazy functional sync, async, and concurrent iteration library`,
  favicon: `img/logo.svg`,

  url: `https://lfi.dev`,
  baseUrl: `/`,
  trailingSlash: false,

  organizationName: githubOrganizationName,
  projectName: githubProjectName,

  onBrokenAnchors: `throw`,
  onBrokenLinks: `throw`,
  onBrokenMarkdownLinks: `throw`,

  i18n: {
    defaultLocale: `en`,
    locales: [`en`],
  },

  presets: [
    [
      `classic`,
      {
        docs: {
          sidebarPath: `./sidebars.ts`,
          editUrl,
          sidebarItemsGenerator: async ({
            defaultSidebarItemsGenerator,
            ...args
          }) =>
            (await defaultSidebarItemsGenerator(args)).map(item =>
              `link` in item &&
              item.link &&
              `id` in item.link &&
              item.link.id === `api/index`
                ? // eslint-disable-next-line typescript/no-unsafe-assignment
                  { ...item, items: require(`./docs/api/typedoc-sidebar.cjs`) }
                : item,
            ),
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: [`rss`, `atom`], xslt: true },
          editUrl,
          onInlineTags: `warn`,
          onInlineAuthors: `warn`,
          onUntruncatedBlogPosts: `warn`,
        },
        theme: { customCss: `./src/css/custom.css` },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    (): Plugin => ({
      name: `docusaurus-plugin-tailwind`,
      configurePostCss: postcssOptions => {
        postcssOptions.plugins = [
          require(`postcss-import`),
          require(`tailwindcss`),
          require(`autoprefixer`),
        ]
        return postcssOptions
      },
    }),
    [
      `docusaurus-plugin-typedoc`,
      {
        name: `API`,
        entryPoints: [`../src/index.d.ts`],
        tsconfig: `../tsconfig.json`,
        readme: `none`,
        excludeInternal: true,
        intentionallyNotExported: [
          `Integer`,
          `MaybePromiseLike`,
          `NonNegativeInteger`,
          `PositiveInteger`,
        ],
        indexFormat: `htmlTable`,
        watch: Boolean(process.env.TYPEDOC_WATCH),
      } satisfies Partial<TypedocOptions | TypedocMarkdownPluginOptions>,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: `lfi`,
      items: [
        {
          type: `doc`,
          docId: `getting-started`,
          label: `Getting started`,
          position: `left`,
        },
        {
          type: `doc`,
          docId: `recipes`,
          label: `Recipes`,
          position: `left`,
        },
        {
          type: `doc`,
          docId: `api/index`,
          label: `API`,
          position: `left`,
        },
        { to: `/playground`, label: `Playground`, position: `left` },
        { href: gitHubUrl, label: `GitHub`, position: `right` },
      ],
    },
    footer: {
      style: `dark`,
      links: [
        {
          title: `Docs`,
          items: [
            { label: `Getting started`, to: `/docs/getting-started` },
            { label: `Recipes`, to: `/docs/recipes` },
            { label: `API`, to: `/docs/api` },
          ],
        },
        {
          title: `Community`,
          items: [
            {
              label: `Bluesky`,
              href: `https://bsky.app/profile/tomeraberba.ch`,
            },
            {
              label: `Sponsor`,
              href: `https://github.com/sponsors/${githubOrganizationName}`,
            },
          ],
        },
        {
          title: `More`,
          items: [
            { label: `Playground`, href: `/playground` },
            { label: `GitHub`, href: gitHubUrl },
          ],
        },
      ],
      copyright: `
        Copyright © ${new Date().getFullYear()}
        <a href="https://tomeraberba.ch" target="_blank" rel="noopener noreferrer">Tomer Aberbach</a>.
        <br />
        Sloth logo by <a href="https://jillmarbach.com" target="_blank" rel="noopener noreferrer">Jill Marbach</a>.
      `,
    },
    prism: {
      theme: prismThemes.gruvboxMaterialLight,
      darkTheme: prismThemes.gruvboxMaterialDark,
    },
    algolia: {
      appId: `7TUBJY7HWC`,
      apiKey: `868e4d57ced7c758bc2275eac02deb37`,
      indexName: `lfi`,
    },
  } satisfies Preset.ThemeConfig,

  headTags:
    process.env.NODE_ENV === `production`
      ? [
          {
            tagName: `script`,
            attributes: {
              src: `https://cdn.usefathom.com/script.js`,
              'data-site': `AUHTRHDD`,
              defer: `defer`,
            },
          },
        ]
      : [],
}

export default config
