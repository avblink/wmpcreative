<template>
  <div id="layout">
    <header :class="{ 'menu-is-open': menuIsOpen }">
      <div id="logo" class="logo-left text-light">
        <alink url="/">
          <img id="light-logo" src="~static/img/logo.png" alt="wmp logo" />
        </alink>
      </div>

      <div class="menu-actions">
        <div class="menu-toggle" @click="toggleMenu()">
          <span class="hamburger" />
        </div>
      </div>

      <div id="menu-inner" class="no-widget">
        <nav id="main-nav" class="underline fade">
          <ul id="primary">
            <li v-for="item in mainMenu" :key="item.url" class="menu-item">
              <alink :url="item.url" @click.native="toggleNav($event)">
                {{ item.label }}
              </alink>

              <ul v-if="item.children" class="sub-menu">
                <li v-for="subItem in item.children" :key="subItem.url">
                  <alink :url="subItem.url">{{ subItem.label }}</alink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <div id="header-widget">
        <div class="widget">
          © <a href="//www.wmpcreative.com">WMP Creative</a> - Founded 1984 -
          <a href="Privacy Policy">Privacy Policy</a>
        </div>
      </div>
    </header>

    <div id="page-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
// import menusQuery from '~/apollo/queries/menus';
import mainMenu from '~/data/menu.json';

export default {
  data() {
    return {
      menuIsOpen: false,
      mainMenu
    };
  },
  // apollo: {
  //   mainMenu: {
  //     prefetch: true,
  //     query: menusQuery
  //   }
  // },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    toggleNav(event) {
      const $link = $(event.currentTarget);
      const $sibling = $link.siblings('ul:first');
      const $parent = $link.parent('li');

      if ($sibling.length) {
        event.preventDefault();
        $sibling.slideDown(400);

        $parent
          .siblings('li')
          .children('ul')
          .slideUp(400);
      }
    }
  }
};
</script>
