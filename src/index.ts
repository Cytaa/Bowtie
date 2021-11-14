import { Client, Intents, Message } from "discord.js";
const { token } = require("../config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log("Bowtie is up and running :D");
});

client.on("message", (msg: Message<boolean>) => {
    if (msg.content === "ping") {
        msg.reply("pong");
    }
});

client.login(token);
