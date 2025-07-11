export default {
  routes: [
    {
      method: 'POST',
      path: '/payment/create',
      handler: 'payment.create',
      config: {
        auth: false,
      },
    }
  ],
};
