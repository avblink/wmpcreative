<template>
  <div>
    <header>
      <ul>
        <li v-for="item in mainMenu.edges[0].node.menuItems.edges" :key="item.node.id">
          {{ item.node.label }}
          <ul v-if="item.node.childItems.edges.length > 0">
            <li v-for="subItem in item.node.childItems.edges" :key="subItem.node.id">
              {{ subItem.node.label }}
            </li>
          </ul>
        </li>
      </ul>
    </header>

    <div id="page-content">
      <div id="logo">
        <img src="//wmpcreative.com/wp-content/uploads/2017/11/wmp-white.png">
      </div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import menusQuery from '~/apollo/queries/menus'

export default {
  apollo: {
    mainMenu: {
      prefetch: true,
      query: menusQuery
    }
  }
}
</script>
