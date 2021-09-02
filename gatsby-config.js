const url = 'https://zhjngli.com'; // for now. update when actual url is purchased
const title = 'zli';
const description = "Zhijiang Li's tech musings and notes";

module.exports = {
  siteMetadata: {
    siteUrl: url,
    title: title,
    description: description,
    author: 'Zhijiang Li'
  },
  plugins: [
    'gatsby-plugin-netlify-cms', // TODO: revisit cms settings
    'gatsby-plugin-preact',
    'gatsby-plugin-glamor',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '283460659'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-preload-fonts',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: title,
        short_name: `zli`,
        description: description,
        start_url: url,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: 'src/images/master-512.png',
        icon_options: {
          purpose: `any maskable`
        }
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: [
          'gatsby-remark-prismjs',
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          }
        ]
      }
    },
    'gatsby-plugin-mdx',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/theme/typography`
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts/`
      },
      __key: 'posts'
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-prettier-eslint',
      options: {
        prettier: {
          patterns: [
            // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
            '**/*.{css,scss,less}',
            '**/*.{json,json5}',
            '**/*.{graphql}',
            '**/*.{md,mdx}',
            '**/*.{html}',
            '**/*.{yaml,yml}'
          ]
        },
        eslint: {
          patterns: '**/*.{js,jsx,ts,tsx}',
          ignorePatterns: ['.eslintrc.js', 'gatsby-config.js', 'gatsby-node.js'],
          customOptions: {
            fix: true,
            env: {
              browser: true,
              node: true
            }
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-no-javascript-utils',
      options: {
        noScript: true,
        noSourcemaps: true,
        removeGeneratorTag: true,
        removeReactHelmetAttrs: true,
        noInlineStyles: true,
        removeGatsbyAnnouncer: false, // doesn't seem to work when true
      }
    }
  ]
};
