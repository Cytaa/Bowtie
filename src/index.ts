import {
    Client,
    GuildManager,
    GuildMember,
    Intents,
    Interaction,
} from "discord.js";
import { stringify } from "querystring";
import { deploy } from "./commands/commandsRegister";
const { token, guildId } = require("../config.json");
import { getUserById } from "./utils/utils";
import { videoFinder } from "./commands/play";
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
        return;
    }
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;

    if (commandName === "play") {
        const video: Video = await videoFinder(
            options.getString("query", true)
        );
        interaction.reply(`Link do twojego video: ${video.url}`);
        return;
    }

    interaction.reply(`basic response to: ${commandName}`);
});

client.login(token);
