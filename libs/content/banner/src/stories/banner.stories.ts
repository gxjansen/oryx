import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../.constants';
import { BannerContent, BannerOptions } from '../banner.model';

export default {
  title: `${storybookPrefix}/Banner`,
} as Meta;

const Template: Story<BannerOptions & BannerContent> = (
  props
): TemplateResult => {
  const content = {
    title: props.title,
    subtitle: props.subtitle,
    content: props.content,
    image: props.image,
  };
  const options = {
    link: props.link,
    urlTarget: props.urlTarget,
    alt: props.alt,
  };
  return html`
    <oryx-banner .content=${content} .options=${options}></oryx-banner>
  `;
};

export const Banner = Template.bind({});
Banner.args = {
  link: 'url',
  alt: 'banner image',
  title: 'Furniture - Upgrade Your Office',
  subtitle: '',
  content:
    'Keep your office up-to-date with the latest technology and accessories.',
  image:
    'https://www.us.sc-b2b.demo-spryker.com/assets/static/images/section-slider-item-image-10@2x.jpg',
};
