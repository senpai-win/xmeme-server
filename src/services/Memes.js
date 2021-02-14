// # All the business logic is here
const { Op } = require("sequelize");

const { Meme } = require("../models");

class Memes {
  constructor() {}

  async addMemeToCollection(data) {
    const { name, caption, url } = data;
    // valid url regex
    const result = await Meme.findAll({
      where: {
        active: 1,
        [Op.or]: [{ name: name }, { caption: caption }, { url: url }],
      },
      attributes: ["id"],
    });
    if (result.length > 0) {
      return { status: -1 };
    }
    const {
      dataValues: { id },
    } = await Meme.create(data);
    return { status: 1, id };
  }

  async getMemeById(unformatted_id) {
    //Validation
    const id = Number(unformatted_id);
    if (Number.isNaN(id) || id < 1) return { status: -1 };
    const result = await Meme.findOne({
      where: {
        id: id,
        active: 1,
      },
      attributes: ["id", "name", "url", "caption", "createdAt"],
    });
    if (!result) {
      console.log("Meme not found");
      return { status: -1 };
    }
    return { status: 1, result };
  }

  // Implemented Soft Delete
  async softDeleteMemeById(unformatted_id) {
    //Validation
    const id = Number(unformatted_id);
    if (Number.isNaN(id) || id < 1) return { status: -1 };
    const result = await Meme.update(
      { active: 0 },
      {
        where: {
          id: id,
          active: 1,
        },
      }
    );
    return { status: 1 };
  }

  async updateMeme(unformatted_id, data) {
    //Validation
    const id = Number(unformatted_id);
    if (Number.isNaN(id) || id < 1)
    return { status: -1 };
    
    const { caption, url } = data;
    await Meme.update(
      { ...(caption && { caption }), ...(url && { url }) }, // Short Circuit Evaluation Technique
      {
        where: {
          id: id,
          active: 1,
        },
      }
    );
    return { status: 1 };
  }

  async getAllMemes() {
    const result = await Meme.findAll({
      where: {
        active: 1,
      },
      limit: 100,
      order: [["id", "DESC"]],
      attributes: ["id", "name", "url", "caption", "createdAt"],
    });
    return result;
  }

  async hardDeleteMemes() {
    const result = await Meme.destroy({
      where: {
        active: 0,
      },
    });
    return;
  }
}

module.exports = new Memes();
