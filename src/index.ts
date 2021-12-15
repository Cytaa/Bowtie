import {
    Client,
    GuildManager,
    GuildMember,
    Intents,
    Interaction,
    StageChannel,
    VoiceChannel,
} from "discord.js";
import { stringify } from "querystring";
import { deploy } from "./commands/commandsRegister";
const { token, guildId } = require("../config.json");
import { getUserById } from "./utils/utils";
import { videoFinder, joinChannel, play } from "./commands/play";
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
        // const video: Video = await videoFinder(
        //     options.getString("query", true)
        // );
        // interaction.reply(`Link do twojego video: ${video.url}`);
        // return;
        play2(options.getString("query", true), user.id);
        interaction.reply(`cos sie dzieje byq`);
        return;
    }

    if (commandName === "spotify") {
        interaction.reply(
            `link do playlisty spotify: https://open.spotify.com/playlist/5Dxi0RFBPZqIbr6FQxBZn1?si=14462bd9eef44760`
        );
        return;
    }

    interaction.reply(`basic response to: ${commandName}`);
});

const play2 = (option: string, userId: string) => {
    const user: GuildMember | undefined = getUserById(client, userId, guildId);
    let voiceChannel: VoiceChannel | StageChannel;
    if (user?.voice.channel) {
        voiceChannel = user?.voice.channel;
        play(voiceChannel, option);
    } else {
        console.log("nie ma typa na voice channelu");
    }
    return;
};
client.login(token);
