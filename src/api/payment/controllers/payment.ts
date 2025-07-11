import { Context } from 'koa';
import { YooCheckout } from '@a2seven/yoo-checkout';

const checkout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID!,
  secretKey: process.env.YOOKASSA_SECRET_KEY!,
});

const SUBSCRIPTION_PRICES: Record<number, { value: string; name: string }> = {
  1: { value: '149.00', name: 'Мини-подписка' },
  2: { value: '359.00', name: 'Стандарт-подписка' },
  3: { value: '759.00', name: 'Премиум-подписка' },
};

export default {
  async create(ctx: Context) {
    try {
      const { type } = ctx.request.body;

      if (![1, 2, 3].includes(type)) {
        return ctx.badRequest('Неверный тип подписки');
      }

      const sub = SUBSCRIPTION_PRICES[type];

      const payment = await checkout.createPayment({
        amount: {
          value: sub.value,
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: 'https://t.me/your_bot_username',
        },
        capture: true,
        description: `${sub.name} в Telegram-боте`,
      });

      ctx.send({ url: payment.confirmation.confirmation_url });
    } catch (error) {
      console.error('Ошибка создания платежа:', error);
      ctx.throw(500, 'Ошибка при создании платежа');
    }
  },
};
