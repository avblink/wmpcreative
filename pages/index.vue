<template>
  <div class="content-wrapper">
    <section class="hero">
      <div class="vimeo-wrapper">
        <client-only>
          <vimeo-player
            ref="player"
            :video-id="252855772"
            :autoplay="true"
            :options="{
              background: 1,
              autoplay: 1,
              loop: 'true',
              byline: 0,
              title: 0
            }"
            @play="vimeoPlaying"
          />
        </client-only>
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

        <div class="showreel mt-60">
          <a
            :href="html.sections.page_hero.link.url"
            class="circle"
            data-rel="lightcase"
            @click.prevent="showShowReel"
          >
            <fa icon="play" />
          </a>
          <strong>
            Showreel
          </strong>
        </div>
      </div>
    </section>

    <section class="desc do-anim">
      <div class="wrapper-small" v-html="html.sections.text[0].text" />
    </section>
    <section class="gallery">
      <alink
        v-for="item in html.sections.image_gallery[0]"
        :key="item.id"
        :url="item.link"
        class="item do-anim"
      >
        <img :src="item.image.url" :alt="item.linkTitle" />
        <h3 class="title">{{ item.linkTitle }}</h3>
      </alink>
    </section>

    <div class="center">
      <alink url="/work" class="button white view-all mt-100">View All</alink>
    </div>

    <section class="brands center mt-100">
      <h3 class="do-anim" v-html="html.sections.text[1].text" />
      <img
        v-for="item in html.sections.image_gallery[1]"
        :key="item.id"
        :src="item.image.url"
        class="item do-anim"
        alt="brands"
      />
    </section>

    <div class="center">
      <alink url="/contact" class="button white contact mt-100"
        >Get in touch
      </alink>
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
      html = generatePageData('homepage', context.payload.data);
    } else {
      html = await initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('my.page.uid', 'home'))
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
    $(window).on('scroll', () => {
      this.animateOnScroll();
    });
  },
  methods: {
    vimeoPlaying() {
      $(this.$refs.videoBackground).hide();
    },
    showShowReel(event) {
      lightcase.start({
        href: event.target.href,
        overlayOpacity: 0.9,
        maxWidth: 1300,
        maxHeight: 1100,
        shrinkFactor: 1,
        liveResize: true,
        fullScreenModeForMobile: true,
        iframe: {
          width: 854,
          height: 480,
          allowfullscreen: 1
        }
      });
    },
    animateOnScroll() {
      if ($("[class*='do-anim']").length > 0) {
        $("[class*='do-anim']")
          .not('.animated')
          .filter(function(i, d) {
            return $(d).visible(true);
          })
          .each(function(i) {
            var thisItem = $(this);
            var delayMulti = 200;
            if (thisItem.hasClass('do-anim-modern')) {
              delayMulti = 100;
            }
            var delay = i * delayMulti + 100; // + 150 is to add a small delay
            thisItem.delay(delay).queue(function() {
              thisItem.addClass('animated');
            });
          });
      }
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
