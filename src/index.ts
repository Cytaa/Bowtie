import { Client, Intents, Interaction } from "discord.js";
import { deploy } from "./commands/deployCommands";
const { token } = require("../config.json");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    deploy();
    console.log("Bowtie is up and running :D");
});

client.on("messageCreate", (msg) => {
    if (msg.content === "ping") {
        msg.reply("pong");
    }
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    console.log(await interaction.toJSON());
    const { commandName, options } = interaction;

    if (commandName === "ping") {
        interaction.reply("siemanko");
    }
});

// client.on("message", )

client.login(token);
