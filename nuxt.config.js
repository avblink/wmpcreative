import Prismic from 'prismic-javascript';
import { initApi } from './prismic.config';
import webpack from 'webpack';

export default {
  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/wmpcreative/' : '/'
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Poppins:300,400&display=swap'
      }
    ],
    script: []
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/styles.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/jquery.client.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    'nuxt-compress'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://wmpcreative.com/graphql'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {}
  },

  // https://nebulab.it/blog/create-fast-nuxtjs-website-prismic/
  generate: {
    routes() {
      const homepage = initApi().then(api => {
        return api
          .query(
            Prismic.Predicates.at('document.type', 'page', { uid: 'home' })
          )
          .then(response => {
            return response.results.map(payload => {
              return {
                route: '/',
                payload
              };
            });
          });
      });

      return Promise.all([homepage]).then(values => {
        return [...values[0]];
      });
    }
  }
};
