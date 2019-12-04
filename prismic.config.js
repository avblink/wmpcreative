// export default {
//   apiEndpoint: "https://wmpcreative.cdn.prismic.io/api/v2"
// };

import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

const config = {
  baseUrl: 'https://wmpcreative.cdn.prismic.io/api/v2'
  //   access_token: '<ACCESS_TOKEN>'
};

export const initApi = (req) => {
  return Prismic.getApi(config.baseUrl, {
    // accessToken: config.access_token,
    req
  });
};

export const linkResolver = (doc) => {
  if (doc.type === 'blog_post') {
    return `/blog/${doc.uid}`;
  }

  if (doc.uid === 'home') {
    return '/';
  }

  return `/${doc.uid}`;
};

export const generatePageData = (documentType, data) => {
  switch (documentType) {
    case 'homepage':
      const sections = {};

      data.body.map((slice) => {
        switch (slice.slice_type) {
          case 'page_hero':
            sections[slice.slice_type] = {
              title: PrismicDOM.RichText.asText(slice.primary.title),
              subTitle: PrismicDOM.RichText.asText(slice.primary.subtitle),
              linkTitle: PrismicDOM.RichText.asText(slice.primary.link_title),
              link: slice.primary.link,
              videoBackground: slice.primary.video_background,
              gallery: slice.primary.image_gallery
            };
            break;
          case 'text':
            sections[slice.slice_type] = {
              text: PrismicDOM.RichText.asHtml(slice.primary.text)
            };
            break;
          case 'image_gallery':
            const gallery = [];

            slice.items.map((item) => {
              gallery.push({
                image: item.gallery_image,
                link: item.link,
                linkTitle: PrismicDOM.RichText.asText(item.link_title)
              });
            });

            sections[slice.slice_type] = gallery;

            break;
        }
      });

      return {
        sections
      };
  }
};
