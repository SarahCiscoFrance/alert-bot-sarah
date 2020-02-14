//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the alert-bot bot.

// Import Botkit's core features
const { Botkit } = require("botkit");

// Import a platform-specific adapter for webex.

const { WebexAdapter } = require("botbuilder-adapter-webex");

// Load process.env values from .env file
require("dotenv").config();

const adapter = new WebexAdapter({
  secret: "alert-bot",
  access_token: process.env.access_token,
  public_address: process.env.public_address
});

const controller = new Botkit({
  webhook_uri: "/api/messages",
  adapter: adapter
});

controller.middleware.receive.use(function(bot, message, next) {
  if (message.personEmail) {
    let domain = message.personEmail.split("@");
    if (
      domain[1] == "cisco.com" ||
      domain[1] == "ciscofrance.com" ||
      domain[1] == "webex.bot"
    ) {
      next();
    }
  } else {
    next();
  }
});

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + "/features");
});

controller.webserver.get("/", (req, res) => {
  res.send(`This app is running Botkit ${controller.version}.`);
});
