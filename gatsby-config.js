module.exports = {
  siteMetadata: {
    siteUrl: 'https://zhjngli.com', // for now. update when actual url is purchased
    title: 'zli',
    author: 'Zhijiang Li'
  },
  plugins: [
    'gatsby-plugin-netlify-cms', // TODO: revisit cms settings
    'gatsby-plugin-postcss',
    'gatsby-plugin-glamor',
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/master-512.png'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: ['gatsby-remark-prismjs']
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
            cache: true,
            env: {
              browser: true,
              node: true
            }
          }
        }
      }
    }
  ]
};
