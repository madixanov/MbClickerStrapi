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
      method: 'GET',
      path: '/payments',
      handler: 'payment.find',
      config: {
        auth: false, // или true, если хочешь защитить
      },
    },
    {
      method: 'GET',
      path: '/payments/:documentId',
      handler: 'payment.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/payments/:documentId',
      handler: 'payment.update',
      config: {
        auth: false,
      },
    },
  ],
};
