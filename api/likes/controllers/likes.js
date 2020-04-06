"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;

    const [likes] = await strapi.services.likes.find({
      "user.id": ctx.state.user.id,
    });

    if (likes) {
      return ctx.unauthorized(`You have already liked this`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.likes.create(data, { files });
    } else {
      entity = await strapi.services.likes.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.likes });
  },
};
