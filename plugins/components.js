import Vue from 'vue';

import alink from '~/components/alink';

const components = { alink };

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
