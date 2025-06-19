"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'frame-ancestors': ["'self'", 'https://t.me'],
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
                'https://mbclicker.netlify.app/',
                'https://mbclickerstrapi.onrender.com/',
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
