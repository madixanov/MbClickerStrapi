export default {
  routes: [
    {
      method: 'POST',
      path: '/payment/create',
      handler: 'payment.create',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/payment/webhook',
      handler: 'payment.webhook',
      config: {
        auth: false,
      },
    }
  ],
};
