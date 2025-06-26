import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);

export default {
  async beforeCreate(event) {
    const { data } = event;

    if (!data.invite_code) {
      data.invite_code = nanoid(); // Генерация уникального кода
    }
  },
};
