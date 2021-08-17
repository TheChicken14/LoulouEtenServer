const { Document } = require("mongoose");
const Food = require("../Models/Food");

class FoodManager {
  async giveFood(options) {
    const { name, date, type } = options;

    const found = await this.hasFood();
    if (found) {
      return found;
    }

    const hour = new Date().getHours();
    const defaultType = hour > 12 ? "evening" : "morning";

    const newDoc = new Food({
      type: type || defaultType,
      by: name,
      date: new Date(date) || new Date(),
    });

    return newDoc.save();
  }

  /**
   * @returns {Promise<(Document|undefined)>}
   */
  async hasFood() {
    const isEvening = new Date().getHours() > 12;

    const search = isEvening
      ? {
          $gte: new Date().setHours(13, 0, 0),
          $lt: new Date().setHours(23, 59, 59),
        }
      : {
          $gte: new Date().setHours(0, 0, 0),
          $lt: new Date().setHours(13, 0, 0),
        };

    const found = await Food.find({
      date: search,
    });

    return found[0] || null;
  }

  async undoFood() {
    const found = await this.hasFood();
    if (found) {
      return Food.deleteOne({ _id: found._id });
    } else {
      return null;
    }
  }
}

module.exports = new FoodManager();
