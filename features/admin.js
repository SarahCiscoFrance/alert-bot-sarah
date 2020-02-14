/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const Store = require("jfs");
const db = new Store("./data/data.json");

module.exports = function(controller) {
  let admins = null;

  db.get("admins", (err, obj) => {
    admins = obj;
  });

  /* controller.hears(
    "add device",
    "message,direct_message",
    async (bot, message) => {
      if (admins.includes(message.personEmail)) {
        await bot.reply(message, {
          text: "Formulaire d'ajout d'un device",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard",
                version: "1.0",
                body: [
                  {
                    type: "TextBlock",
                    text: "Ajouter un nouveau device",
                    size: "large"
                  },
                  {
                    type: "TextBlock",
                    text: "Son adresse IP",
                    wrap: true
                  },
                  {
                    type: "Input.Text",
                    id: "ipAddress",
                    placeholder: "Adresse IP"
                  },
                  {
                    type: "TextBlock",
                    text: "Son login",
                    wrap: true
                  },
                  {
                    type: "Input.Text",
                    id: "login",
                    placeholder: "Login"
                  },
                  {
                    type: "TextBlock",
                    text: "Son mot de passe",
                    wrap: true
                  },
                  {
                    type: "Input.Text",
                    id: "password",
                    placeholder: "Mot de passe"
                  },
                  {
                    type: "TextBlock",
                    text: "Dans quel étage est-il installé ?",
                    wrap: true
                  },
                  {
                    type: "Input.ChoiceSet",
                    id: "floor",
                    style: "expanded",
                    style: "compact",
                    value: "1",
                    choices: [
                      {
                        title: "1er étage",
                        value: "1"
                      },
                      {
                        title: "2ème étage",
                        value: "2"
                      },
                      {
                        title: "3ème étage",
                        value: "3"
                      }
                    ]
                  },
                  {
                    type: "TextBlock",
                    text: "A quelle équipe appartient-il ?",
                    wrap: true
                  },
                  {
                    type: "Input.ChoiceSet",
                    id: "team",
                    style: "expanded",
                    style: "compact",
                    value: "collab",
                    choices: [
                      {
                        title: "Collaboration",
                        value: "collab"
                      },
                      {
                        title: "Commercial",
                        value: "sales"
                      },
                      {
                        title: "Data Center",
                        value: "dc"
                      }
                    ]
                  }
                ],
                actions: [
                  {
                    type: "Action.Submit",
                    title: "Ajouter le device",
                    data: {
                      type: "addDevice"
                    }
                  }
                ]
              }
            }
          ]
        });
      } else {
        await bot.reply(
          message,
          "Vous n'êtes pas autorisé à utiliser cette commande."
        );
      }
    }
  ); */

  controller.hears(
    "add user",
    "message,direct_message",
    async (bot, message) => {
      if (admins.includes(message.personEmail)) {
        await bot.reply(message, {
          text: "Formulaire d'ajout d'un user",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard",
                version: "1.0",
                body: [
                  {
                    type: "TextBlock",
                    text: "Ajouter un nouveau user",
                    size: "large"
                  },
                  {
                    type: "TextBlock",
                    text: "Son email",
                    wrap: true
                  },
                  {
                    type: "Input.Text",
                    id: "email",
                    placeholder: "Email"
                  },
                  {
                    type: "TextBlock",
                    text: "Le nom de son équipe",
                    wrap: true
                  },
                  {
                    type: "Input.ChoiceSet",
                    id: "team",
                    style: "expanded",
                    style: "compact",
                    value: "collab",
                    choices: [
                      {
                        title: "Collaboration",
                        value: "collab"
                      },
                      {
                        title: "Commercial",
                        value: "sales"
                      },
                      {
                        title: "Data Center",
                        value: "dc"
                      }
                    ]
                  },
                  {
                    type: "TextBlock",
                    text: "A quel étage est-il installé ?",
                    wrap: true
                  },
                  {
                    type: "Input.ChoiceSet",
                    id: "floor",
                    style: "expanded",
                    style: "compact",
                    value: "1",
                    choices: [
                      {
                        title: "1er étage",
                        value: "1"
                      },
                      {
                        title: "2ème étage",
                        value: "2"
                      },
                      {
                        title: "3ème étage",
                        value: "3"
                      }
                    ]
                  }
                ],
                actions: [
                  {
                    type: "Action.Submit",
                    title: "Ajouter le user",
                    data: {
                      type: "addUser"
                    }
                  }
                ]
              }
            }
          ]
        });
      } else {
        await bot.reply(
          message,
          "Vous n'êtes pas autorisé à utiliser cette commande."
        );
      }
    }
  );

  controller.hears(
    "delete user",
    "message,direct_message",
    async (bot, message) => {
      if (admins.includes(message.personEmail)) {
        await bot.reply(message, {
          text: "Formulaire de suppression d'un user",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard",
                version: "1.0",
                body: [
                  {
                    type: "TextBlock",
                    text: "Supprimer un user",
                    size: "large"
                  },
                  {
                    type: "TextBlock",
                    text: "Son email",
                    wrap: true
                  },
                  {
                    type: "Input.Text",
                    id: "email",
                    placeholder: "Email"
                  }
                ],
                actions: [
                  {
                    type: "Action.Submit",
                    title: "Supprimer le user",
                    data: {
                      type: "deleteUser"
                    }
                  }
                ]
              }
            }
          ]
        });
      } else {
        await bot.reply(
          message,
          "Vous n'êtes pas autorisé à utiliser cette commande."
        );
      }
    }
  );

  controller.on("attachmentActions", async (bot, attachmentActions) => {
    switch (attachmentActions.inputs.type) {
      case "addDevice":
        await addDevice(attachmentActions, bot);
        break;
      case "addUser":
        await addUser(attachmentActions, bot);
        break;
      case "deleteUser":
        await deleteUser(attachmentActions, bot);
        break;
      default:
        break;
    }
  });

  const addDevice = async (attachmentActions, bot) => {
    await new Promise((resolve, reject) => {
      let devices = null;

      db.get("devices", (err, obj) => {
        devices = obj;
      });

      for (let device in devices) {
        if (devices[device].ipAddress === attachmentActions.inputs.ipAddress) {
          bot.reply(
            attachmentActions,
            `Le device (${attachmentActions.inputs.ipAddress}) existe déjà.`
          );

          return;
        }
      }

      devices.push({
        ipAddress: attachmentActions.inputs.ipAddress,
        login: attachmentActions.inputs.login,
        password: attachmentActions.inputs.password,
        floor: attachmentActions.inputs.floor,
        team: attachmentActions.inputs.team
      });

      db.save("devices", devices, async err => {
        await bot.api.messages.create({
          text: `Le device (${attachmentActions.inputs.ipAddress}) a bien été ajouté.`,
          roomId: attachmentActions.roomId
        });
      });
    });
  };

  const addUser = async (attachmentActions, bot) => {
    await new Promise((resolve, reject) => {
      let users = null;

      db.get("users", (err, obj) => {
        users = obj;
      });

      for (let user in users) {
        if (users[user].email === attachmentActions.inputs.email) {
          bot.reply(
            attachmentActions,
            `Le user (${attachmentActions.inputs.email}) existe déjà.`
          );

          return;
        }
      }

      users.push({
        email: attachmentActions.inputs.email,
        team: attachmentActions.inputs.team,
        floor: attachmentActions.inputs.floor
      });

      db.save("users", users, async err => {
        await bot.api.messages.create({
          text: `Le user (${attachmentActions.inputs.email}) a bien été ajouté.`,
          roomId: attachmentActions.roomId
        });
      });
    });
  };

  const deleteUser = async (attachmentActions, bot) => {
    await new Promise(async (resolve, reject) => {
      let users = null;

      db.get("users", (err, obj) => {
        users = obj;
      });

      for (let user in users) {
        if (users[user].email === attachmentActions.inputs.email) {
          users.splice(user, 1);

          db.save("users", users, async err => {
            await bot.api.messages.create({
              text: `Le user (${attachmentActions.inputs.email}) a bien été supprimé.`,
              roomId: attachmentActions.roomId
            });
          });

          return;
        }
      }

      await bot.api.messages.create({
        text: `Le user (${attachmentActions.inputs.email}) n'existe pas.`,
        roomId: attachmentActions.roomId
      });
    });
  };
};
