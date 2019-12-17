<template>
  <div class="content-wrapper">
    <section class="hero">
      <div class="vimeo-wrapper">
        <iframe
          ref="heroVideo"
          title="wmp showreel"
          src="https://player.vimeo.com/video/252855772?background=1&autoplay=1&loop=1&byline=0&title=0"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        />
        <div ref="videoBackground" class="video-background">
          <img
            :src="html.sections.page_hero.videoBackground.url"
            alt="wmp showreel background"
          />
        </div>
        <div class="overlay" />
      </div>
      <div class="text-wrapper">
        <h1>{{ html.sections.page_hero.title }}</h1>
        <h2>{{ html.sections.page_hero.subTitle }}</h2>
        <a :href="html.sections.page_hero.link.url">Showreel</a>
      </div>
    </section>

    <section class="desc">
      <div class="wrapper-small" v-html="html.sections.text[0].text" />
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
      <a href="/work" class="button white view-all">View All</a>
    </div>

    <section class="brands center">
      <h3 v-html="html.sections.text[1].text" />
      <img
        v-for="item in html.sections.image_gallery[1]"
        :key="item.id"
        :src="item.image.url"
        class="item"
        alt="brands"
      />
    </section>

    <div class="center">
      <a href="/contact" class="button white contact">Get in touch</a>
    </div>
  </div>
</template>

<script>
import Player from '@vimeo/player';
import Prismic from 'prismic-javascript';
import { initApi, generatePageData } from '@/prismic.config';
import $ from 'jquery';

export default {
  async asyncData(context) {
    let html;

    if (context.payload) {
      html = generatePageData('homepage', context.payload.data);
    } else {
      html = await initApi().then(api => {
        return api
          .query(
            Prismic.Predicates.at('document.type', 'page', { uid: 'home' })
          )
          .then(response => {
            return generatePageData('homepage', response.results[0].data);
          });
      });
    }

    return {
      html
    };
  },
  mounted() {
    this.initVimeoPlayer();
  },
  methods: {
    initVimeoPlayer() {
      // https://github.com/vimeo/player.js#onevent-string-callback-function-void
      const iframe = this.$refs.heroVideo;
      const player = new Player(iframe);
      player.on('loaded', () => {
        // console.log('video loaded');
      });

      player.ready().then(() => {
        // console.log('video ready');
        $(this.$refs.videoBackground).fadeOut();
        // console.log($b);
      });

      // player.getVideoId().then(function(id) {
      // console.log('video id:', id);
      // });
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: ['page-home'].join(' ')
      }
    };
  }
};
</script>
