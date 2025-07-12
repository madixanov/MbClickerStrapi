import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::payment.payment' as any, {
  config: {
    routes: [
      {
        method: 'POST',
        path: '/payment/create',
        handler: 'payment.create',
        config: {
          auth: false,
        },
      },
    ],
  },
});
