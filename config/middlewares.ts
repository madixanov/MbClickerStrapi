export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:'],
          'img-src': ["'self'", 'data:', 'blob:', 'cdn.jsdelivr.net', 'strapi.io', 't.me'],
          'media-src': ["'self'", 'data:', 'blob:', 'cdn.jsdelivr.net', 'strapi.io', 't.me'],
          'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
          'frame-src': ["'self'", 't.me', 'telegram.org'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://mbclicker.netlify.app',
        'https://web.telegram.org',
        'https://telegram.org',
        /\.telegram\.org$/,
        /\.t\.me$/,
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'X-Requested-With',
        'X-Telegram-Init-Data',
      ],
      credentials: true,
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];