import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 465),
        secure: true, // SSL en 465
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'), // Gmail App Password (16 chars)
        },
      },
      settings: {
        defaultFrom: env('MAIL_FROM', env('SMTP_USER')),
        defaultReplyTo: env('MAIL_REPLY_TO', env('SMTP_USER')),
      },
    },
  },
});

export default config;
