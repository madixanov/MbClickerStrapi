import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);

export default {
  async beforeCreate(event) {
    const { params } = event;

    if (!params.data.invite_code) {
      params.data.invite_code = nanoid(); // Уникальный код
    }
  },
};
