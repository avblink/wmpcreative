<template>
  <div id="layout">
    <header :class="{ 'menu-is-open': menuIsOpen }">
      <div id="logo" class="logo-left text-light">
        <a href="//wmpcreative.com/">
          <img
            id="light-logo"
            src="//wmpcreative.com/wp-content/uploads/2017/11/wmp-white.png"
            alt="wmp-white"
          />
        </a>
      </div>

      <div class="menu-actions">
        <div class="menu-toggle" @click="toggleMenu()">
          <span class="hamburger" />
        </div>
      </div>

      <div id="menu-inner" class="no-widget">
        <nav id="main-nav" class="underline fade">
          <ul id="primary">
            <li
              v-for="item in mainMenu.edges[0].node.menuItems.edges"
              :key="item.node.id"
              class="menu-item"
            >
              <a :href="item.node.url" @click="toggleNav($event)">{{
                item.node.label
              }}</a>

              <ul v-if="item.node.childItems.edges.length > 0" class="sub-menu">
                <li
                  v-for="subItem in item.node.childItems.edges"
                  :key="subItem.node.id"
                >
                  <a :href="subItem.node.url">{{ subItem.node.label }}</a>
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
import menusQuery from '~/apollo/queries/menus';
export default {
  data() {
    return {
      menuIsOpen: false
    };
  },
  apollo: {
    mainMenu: {
      prefetch: true,
      query: menusQuery
    }
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    toggleNav(event) {
      const $link = window.jQuery(event.currentTarget);
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
