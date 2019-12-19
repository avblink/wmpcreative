<template>
  <div class="content-wrapper">
    <section class="hero">
      <h1>{{ html.sections.page_hero.title }}</h1>
    </section>

    <section class="gallery">
      <a
        v-for="item in html.sections.image_gallery[0]"
        :key="item.id"
        :href="item.link.url"
        class="item"
      >
        <img :src="item.image.url" :alt="item.linkTitle" />
        <h3 class="title">{{ item.linkTitle }}</h3>
      </a>
    </section>

    <div class="center">
      <a href="/contact" class="button white contact mt-100">Get in touch</a>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import { initApi, generatePageData } from '@/prismic.config';

export default {
  async asyncData(context) {
    let html;

    if (context.payload) {
      html = generatePageData('work', context.payload.data);
    } else {
      html = await initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('my.page.uid', 'work'))
          .then(response => {
            return generatePageData('work', response.results[0].data);
          });
      });
    }

    return {
      html
    };
  }
};
</script>

<style lang="scss">
section.hero {
  padding: 134px 40px 100px 40px;
}
</style>
