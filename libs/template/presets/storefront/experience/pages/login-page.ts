import { StaticComponent } from '@spryker-oryx/experience';

export const loginPage: StaticComponent = {
  type: 'Page',
  meta: {
    title: 'Login Page',
    route: '/login',
    description: 'Login Page Description',
  },
  options: {
    data: {
      rules: [{ layout: 'flex', padding: '30px 0' }],
    },
  },
  components: [
    {
      type: 'oryx-auth-login',
      options: {
        data: {
          rules: [{ width: '50%', margin: 'auto' }],
        },
      },
    },
  ],
};