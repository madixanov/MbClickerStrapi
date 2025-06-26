import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);

export default {
  async beforeCreate(event) {
    const { params } = event;

    console.log("🔥 beforeCreate hook запускается");

    if (!params.data.invite_code) {
      const code = nanoid();
      console.log("🎲 Генерируем invite_code:", code);
      params.data.invite_code = code;
    }
  },
};
