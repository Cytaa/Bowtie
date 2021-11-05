import { Client, Intents } from "discord.js";
const { token } = require("../config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log("Bowtie is up and running :D");
});

client.on("interactionCreate", async (interaction: any) => {
    console.log(typeof interaction);
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    if (commandName === "ping") {
        await interaction.reply("Pong!");
    } else {
        await interaction.reply("Co?");
    }
});

client.login(token);
