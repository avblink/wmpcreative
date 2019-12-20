<template>
  <a :href="`${prefix}${url}`">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: this.$router.options.base.replace(/\/$/, '')
    };
  }
};
</script>
