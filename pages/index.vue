<template>
  <section>
    <h1>Creative excellence.</h1>
    <h2>Designed. Developed. Delivered.</h2>
    <div v-for="user in allUsers" :key="user.id">
      {{ user.name }}: {{ user.id }}
    </div>
  </section>
</template>

<script>
// Tutorial: https://strapi.io/blog/cooking-a-deliveroo-clone-with-nuxt-vue-js-graphql-strapi-and-stripe-setup-part-1-7/
import usersQuery from '~/apollo/queries/users/users'

export default {
  data () {
    return {
      users: []
    }
  },
  apollo: {
    allUsers: {
      prefetch: true,
      query: usersQuery,
      variables () {
        return { count: 3 }
      }
    }
  }
}
</script>
