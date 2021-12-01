import {
    Client,
    GuildManager,
    GuildMember,
    Intents,
    Interaction,
    VoiceChannel,
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
    const { commandName, options, user } = interaction;

    if (commandName === "play") {
        const video: Video = await videoFinder(
            options.getString("query", true)
        );
        interaction.reply(`Link do twojego video: ${video.url}`);
        return;
        //play(options.getString("query", true), user.id);
    }

    interaction.reply(`basic response to: ${commandName}`);
});

const play = (option: string, userId: string) => {
    const user: GuildMember | undefined = getUserById(client, userId, guildId);
    console.log(user?.voice.channel);
};

client.login(token);
