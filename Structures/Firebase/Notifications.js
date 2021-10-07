const prisma = require("../Prisma");
const firebase = require("./Firebase");

module.exports = class Notifications {
  /**
   *
   * @param {import(".prisma/client").Pet} pet
   * @param {Number} userid
   */
  static async petGotFed(pet, userid) {
    const user = await prisma.user.findFirst({
      where: { id: userid },
    });

    firebase
      .messaging()
      .sendToTopic(`${pet.id}-fed`, {
        notification: {
          titleLocKey: "note.fed.title",
          titleLocArgs: JSON.stringify([pet.name]),
          bodyLocKey: "note.fed.body",
          bodyLocArgs: JSON.stringify([pet.name, user.name]),
        },
        data: {
          feederID: user.id.toString(),
        },
      })
      .catch(console.error);
  }
};
