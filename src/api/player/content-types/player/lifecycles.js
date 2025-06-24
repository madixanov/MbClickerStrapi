export default {
  async afterCreate(event) {
    const { result } = event;

    // Получить все шаблонные бонусы
    const templateBonuses = await strapi.entityService.findMany('api::bonus.bonus', {
      filters: { isTemplate: true },
      fields: ['Name', 'Prize'], // чтобы не грузить лишнее
    });

    // Создать копии бонусов для нового игрока
    for (const template of templateBonuses) {
      await strapi.entityService.create('api::bonus.bonus', {
        data: {
          Name: template.Name,
          Prize: template.Prize,
          Completed: false,
          player: result.id, // Привязка по ID игрока
          isTemplate: false,
        },
      });
    }
  },
};
