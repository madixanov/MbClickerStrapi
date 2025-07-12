import { factories } from '@strapi/strapi';
import { Context } from 'koa';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { connect } from 'http2';

const checkout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID!,
  secretKey: process.env.YOOKASSA_SECRET_KEY!,
});

const SUBSCRIPTION_PRICES: Record<number, { value: string; name: string; months: number }> = {
  1: { value: '149.00', name: 'Мини-подписка', months: 1 },
  2: { value: '359.00', name: 'Стандарт-подписка', months: 3 },
  3: { value: '759.00', name: 'Премиум-подписка', months: 6 },
};

export default factories.createCoreController('api::payment.payment' as any, ({ strapi }) => ({
  // 🟢 Кастомный метод создания платежа
  async create(ctx: Context) {
    try {
      const { type, telegramId } = ctx.request.body as {
        type: number;
        telegramId: number;
      };

      if (![1, 2, 3].includes(type)) {
        return ctx.badRequest('Неверный тип подписки');
      }

      if (!telegramId) {
        return ctx.badRequest('Не передан telegramId');
      }

      const sub = SUBSCRIPTION_PRICES[type];
      const player = await strapi.db.query('api::player.player').findOne({
            where: {
                telegram_id: telegramId,
            },
            });

      // 🧾 Создаём платёж в YooKassa
      const payment = await checkout.createPayment({
        amount: {
          value: sub.value,
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: 'https://t.me/bengal_click_bot',
        },
        capture: true,
        description: `${sub.name} в Telegram-боте`,
        metadata: {
          telegramId: String(telegramId),
          type: String(type),
        },
      });

      // 💾 Сохраняем платёж в Strapi
      const createdPayment = await strapi.db.query('api::payment.payment').create({
        data: {
          telegram_id: telegramId,
          type,
          amount: sub.value,
          months: sub.months,
          payment_status: 'pending',
          paymentId: payment.id,
          confirmationUrl: payment.confirmation.confirmation_url,
          player: player.id
        },
      });

      ctx.send({ url: payment.confirmation.confirmation_url });
    } catch (error) {
      console.error('Ошибка создания платежа:', error);
      ctx.throw(500, 'Ошибка при создании платежа');
    }
  },

  async find(ctx: Context) {
  const { query } = ctx;
  const entries = await strapi.entityService.findMany('api::payment.payment' as any, query);
  const sanitized = await Promise.all(entries.map(entry => this.sanitizeOutput(entry, ctx)));
  return this.transformResponse(sanitized);
}
,
  async update(ctx: Context) {
    return await super.update(ctx);
  },

  async findOne(ctx: Context) {
  const { id } = ctx.params;

  const entry = await strapi.entityService.findOne('api::payment.payment' as any, id, ctx.query);
  const sanitized = await this.sanitizeOutput(entry, ctx);
  return this.transformResponse(sanitized);
}
}));
