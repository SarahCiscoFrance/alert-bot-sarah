/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const axios = require("axios");
const jsxapi = require("jsxapi");
const Store = require("jfs");
const db = new Store("./data/data.json");

const titlesAndImages = {
  fireAlert: {
    title: "Alerte incendie",
    image: "https://i.postimg.cc/DS0rJ7Gv/house.png"
  },
  drillEvacuation: {
    title: "Exercice d'évacuation",
    image: "https://i.postimg.cc/3dnjxkdf/evacuate.png"
  }
};

module.exports = function(controller) {
  controller.hears("alert", "message, direct_message", async (bot, message) => {
    await bot.reply(message, {
      text: "Formulaire d'envoi d'une alerte",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: {
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            type: "AdaptiveCard",
            version: "1.0",
            body: [
              {
                type: "ColumnSet",
                columns: [
                  {
                    type: "Column",
                    width: "auto",
                    items: [
                      {
                        type: "Image",
                        url: "https://i.postimg.cc/pdhnp8f5/bell.png",
                        size: "small"
                      }
                    ]
                  },
                  {
                    type: "Column",
                    verticalContentAlignment: "center",
                    items: [
                      {
                        type: "TextBlock",
                        text: "Voulez-vous envoyer une alerte ?",
                        size: "large",
                        weight: "bolder"
                      }
                    ]
                  }
                ]
              }
            ],
            actions: [
              {
                type: "Action.ShowCard",
                title: "Oui",
                card: {
                  type: "AdaptiveCard",
                  body: [
                    {
                      type: "TextBlock",
                      text: "Précisez le type de l'alerte"
                    },
                    {
                      type: "Input.ChoiceSet",
                      id: "alertType",
                      style: "expanded",
                      style: "compact",
                      value: "fireAlert",
                      choices: [
                        {
                          title: "Alerte incendie",
                          value: "fireAlert"
                        },
                        {
                          title: "Exercice d'évacuation",
                          value: "drillEvacuation"
                        }
                      ]
                    },
                    {
                      type: "ColumnSet",
                      columns: [
                        {
                          type: "Column",
                          items: [
                            {
                              type: "TextBlock",
                              text: "Qui voulez-vous alerter ?"
                            },
                            {
                              type: "Input.ChoiceSet",
                              id: "whoNotify",
                              isMultiSelect: true,
                              value: "user",
                              style: "expanded",
                              choices: [
                                {
                                  title: "Les users",
                                  value: "user"
                                },
                                {
                                  title: "Les devices",
                                  value: "device"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          type: "Column",
                          items: [
                            {
                              type: "TextBlock",
                              text: "Quelle est la durée de l'alerte ?"
                            },
                            {
                              type: "Input.ChoiceSet",
                              id: "alertDuration",
                              style: "expanded",
                              isMultiSelect: false,
                              value: "1",
                              choices: [
                                {
                                  title: "1 min.",
                                  value: "1"
                                },
                                {
                                  title: "5 min.",
                                  value: "5"
                                },
                                {
                                  title: "10 min.",
                                  value: "10"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: "ColumnSet",
                      columns: [
                        {
                          type: "Column",
                          items: [
                            {
                              type: "TextBlock",
                              text: "Quel(s) étage(s) voulez-vous alerter ?"
                            },
                            {
                              type: "Input.ChoiceSet",
                              id: "floorNotify",
                              isMultiSelect: true,
                              value: "1",
                              style: "expanded",
                              choices: [
                                {
                                  title: "Etage 1",
                                  value: "1"
                                },
                                {
                                  title: "Etage 2",
                                  value: "2"
                                },
                                {
                                  title: "Etage 3",
                                  value: "3"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          type: "Column",
                          items: [
                            {
                              type: "TextBlock",
                              text: "Quelle(s) équipes(s) voulez-vous alerter ?"
                            },
                            {
                              type: "Input.ChoiceSet",
                              id: "teamNotify",
                              isMultiSelect: true,
                              value: "collab",
                              style: "expanded",
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
                          ]
                        }
                      ]
                    },
                    {
                      type: "TextBlock",
                      text: "Veuillez décrire votre alerte"
                    },
                    {
                      type: "Input.Text",
                      id: "description",
                      placeholder: "Ecrivez ici...",
                      isMultiline: true
                    },
                    {
                      type: "TextBlock",
                      text: "Veuillez ajouter une URL pour la partie signage"
                    },
                    {
                      type: "Input.Text",
                      id: "url",
                      placeholder: "Collez l'URL ici",
                      value:
                        "https://www.youtube.com/embed/mTkHFF-jcvE?controls=0&autoplay=1"
                    }
                  ],
                  actions: [
                    {
                      type: "Action.Submit",
                      title: "Envoyer l'alerte",
                      data: {
                        type: "alerte"
                      }
                    }
                  ]
                }
              },
              {
                type: "Action.ShowCard",
                title: "Non, montrez-moi les capacités du bot",
                card: {
                  type: "AdaptiveCard",
                  body: [
                    {
                      type: "TextBlock",
                      text: "*alert*"
                    },
                    {
                      type: "TextBlock",
                      text: "Envoyer une alerte",
                      isSubtle: true,
                      spacing: "none",
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text: "*netatmo status*"
                    },
                    {
                      type: "TextBlock",
                      text:
                        "Ce sont les données météorologiques en temps réel du Showroom",
                      isSubtle: true,
                      spacing: "none",
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text: "*netatmo graph*"
                    },
                    {
                      type: "TextBlock",
                      text:
                        "C'est le graphique sur la journée du taux de CO2 en Kandinsky",
                      isSubtle: true,
                      spacing: "none",
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text: "*netatmo battery*"
                    },
                    {
                      type: "TextBlock",
                      text:
                        "C'est le niveau de batterie du module Netatmo installé dans la salle Van Gogh",
                      isSubtle: true,
                      spacing: "none",
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text: "*stats*"
                    },
                    {
                      type: "TextBlock",
                      text: "Ce sont des informations sur mon taux d'usage",
                      isSubtle: true,
                      spacing: "none",
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text:
                        "Voici les commandes exécutables par un administrateur",
                      separator: true
                    },
                    {
                      type: "TextBlock",
                      text: "*add user*"
                    },
                    {
                      type: "TextBlock",
                      text:
                        "Ajouter un utilisateur qui pourra être notifié par l'alerte",
                      isSubtle: true,
                      spacing: "none",
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text: "*delete user*"
                    },
                    {
                      type: "TextBlock",
                      text: "Supprimer un utilisateur",
                      isSubtle: true,
                      spacing: "none",
                      wrap: true
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    });
  });

  controller.on("attachmentActions", async (bot, attachmentActions) => {
    console.log(attachmentActions.inputs);
    switch (attachmentActions.inputs.type) {
      case "alerte":
        await sendAlert(attachmentActions, bot);
        break;
      default:
        break;
    }
  });

  const sendAlert = async (attachmentActions, bot) => {
    await new Promise(async (resolve, reject) => {
      let devices = [];
      let users = [];

      let floors = attachmentActions.inputs.floorNotify.split(",");
      let teams = attachmentActions.inputs.teamNotify.split(",");
      let whosNotify = attachmentActions.inputs.whoNotify.split(",");

      const resultAxios = await axios.get(
        "http://localhost:15161/codecs/app/alertbot"
      );
      const tempDevices = resultAxios.data.codecs;
      const tempUsers = db.getSync("users");

      if (whosNotify.includes("device")) {
        for (let device in tempDevices) {
          if (
            floors.includes(tempDevices[device].floor) ||
            teams.includes(tempDevices[device].team)
          ) {
            devices.push(tempDevices[device]);
          }
        }

        notifyDevices(attachmentActions, devices, bot);
      }

      if (whosNotify.includes("user")) {
        for (let user in tempUsers) {
          if (
            teams.includes(tempUsers[user].team) ||
            floors.includes(tempUsers[user].floor)
          ) {
            users.push(tempUsers[user]);
          }
        }

        notifyUser(attachmentActions, users, bot);
      }
    });
  };

  const notifyUser = (attachmentActions, users, bot) => {
    users.forEach(async user => {
      await bot.api.messages
        .create({
          text: `Réception d'une alerte`,
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard",
                version: "1.0",
                body: [
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "auto",
                        items: [
                          {
                            type: "Image",
                            url:
                              titlesAndImages[
                                attachmentActions.inputs.alertType
                              ].image,
                            size: "small"
                          }
                        ]
                      },
                      {
                        type: "Column",
                        verticalContentAlignment: "center",
                        items: [
                          {
                            type: "TextBlock",
                            text:
                              titlesAndImages[
                                attachmentActions.inputs.alertType
                              ].title,
                            size: "large",
                            weight: "bolder"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: "TextBlock",
                    text: "Description",
                    size: "medium"
                  },
                  {
                    type: "TextBlock",
                    text: `${attachmentActions.inputs.description}`,
                    weight: "lighter"
                  }
                ]
              }
            }
          ],
          toPersonEmail: user.email
        })
        .then(() => {
          bot.api.messages.create({
            text: `Le user ${user.email} a bien été notifié.`,
            roomId: attachmentActions.roomId
          });

          setTimeout(() => {
            bot.api.messages.create({
              text: "L'alerte est terminée.",
              toPersonEmail: user.email
            });
          }, parseInt(attachmentActions.inputs.alertDuration) * 60000);
        });
    });

    setTimeout(() => {
      bot.api.messages.create({
        text: "L'alerte des users est terminée.",
        roomId: attachmentActions.roomId
      });
    }, parseInt(attachmentActions.inputs.alertDuration) * 60000);
  };

  const notifyDevices = (attachmentActions, devices, bot) => {
    devices.forEach(async device => {
      await processDevice(device, bot, attachmentActions);

      bot.api.messages.create({
        text: `Le device ${device.ip} a bien été notifié.`,
        roomId: attachmentActions.roomId
      });
    });

    setTimeout(() => {
      bot.api.messages.create({
        text: "L'alerte des devices est terminée.",
        roomId: attachmentActions.roomId
      });
    }, parseInt(attachmentActions.inputs.alertDuration) * 60000);
  };

  const processDevice = async (device, bot, attachmentActions) => {
    let defaultSignageUrl = null;
    let stateWebEngine = null;

    const xapi = jsxapi.connect(`ssh://${device.ip}`, {
      username: device.login,
      password: device.password
    });

    xapi.on("error", err => {
      bot.api.messages.create({
        text: `Erreur : le device ${device.ip} n'a pas été notifié. (${err})`,
        roomId: attachmentActions.roomId
      });
    });

    await xapi.status.get("").then(status => {
      if (
        status["WebEngine"] !== undefined &&
        status.SystemUnit.State.NumberOfActiveCalls === "0"
      ) {
        stateWebEngine = status.WebEngine.Features.WebEngine;

        xapi.config.set("WebEngine Mode", "On");
        xapi.config.set("Standby Signage Mode", "On");
        xapi.config.set("Standby Signage Audio", "On");

        xapi.config.get("Standby Signage Url").then(url => {
          defaultSignageUrl = url;

          xapi.config.set("Standby Signage Url", attachmentActions.inputs.url);

          xapi.command("Standby Halfwake");

          setTimeout(() => {
            if (stateWebEngine === "Off") {
              xapi.config.set("WebEngine Mode", "Off");
              xapi.config.set("Standby Signage Mode", "Off");
              xapi.config.set("Standby Signage Audio", "Off");
            }

            xapi.config.set("Standby Signage Url", defaultSignageUrl);
          }, parseInt(attachmentActions.inputs.alertDuration) * 60000);
        });
      } else {
        xapi.command("UserInterface Message Alert Display", {
          Duration: 0,
          Text: attachmentActions.inputs.description,
          Title: titlesAndImages[attachmentActions.inputs.alertType].title
        });

        setTimeout(() => {
          xapi.command("UserInterface Message Alert Clear");
        }, parseInt(attachmentActions.inputs.alertDuration) * 60000);
      }
    });
  };
};
