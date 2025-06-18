export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'frame-ancestors': ["'self'", 'https://t.me'], // разрешаем Telegram webview
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://t.me',
        'https://web.telegram.org',
        'https://mbclicker.netlify.app/', // если у тебя фронт хостится отдельно
        'http://localhost:3000', // для разработки
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
