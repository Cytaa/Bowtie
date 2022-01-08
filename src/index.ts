import { Client, Intents } from "discord.js";
import { youtube } from "./commands/play";

import { Player, Queue, Track } from "discord-player";
import { stringify } from "querystring";
import { deploy } from "./commands/commandsRegister";
const { token, guildId } = require("../config.json");
import { getUserById } from "./utils/utils";
import { videoFinder, joinChannel, play } from "./commands/play";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

const player = new Player(client);
player.on("trackStart", (queue: Queue<any>, track: Track) => {
    queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`);
    client.once("ready", () => {
        console.log("ready");
    });
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

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    // /play track:Despacito
    // will play "Despacito" in the voice channel
    if (interaction.commandName === "play") {
        if (!interaction.member.voice.channelId)
            return await interaction.reply({
                content: "You are not in a voice channel!",
                ephemeral: true,
            });
        if (
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !==
                interaction.guild.me.voice.channelId
        )
            return await interaction.reply({
                content: "You are not in my voice channel!",
                ephemeral: true,
            });
        const query = interaction.options.get("query").value;
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel,
            },
        });

        // verify vc connection
        try {
            if (!queue.connection)
                await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({
                content: "Could not join your voice channel!",
                ephemeral: true,
            });
        }

        await interaction.deferReply();
        const track = await player
            .search(query, {
                requestedBy: interaction.user,
            })
            .then((x) => x.tracks[0]);
        if (!track)
            return await interaction.followUp({
                content: `❌ | Track **${query}** not found!`,
            });

        queue.play(track);

        return await interaction.followUp({
            content: `⏱️ | Loading track **${track.title}**!`,
        });
    }

    if (interaction.commandName === "spotify") {
        interaction.reply({
            content:
                "https://open.spotify.com/playlist/5Dxi0RFBPZqIbr6FQxBZn1?si=f85e909fe205434e",
        });
    }

    if (interaction.commandName === "youtube") {
        const url = await youtube(interaction.options.get("url").value);
        console.log(url);
        interaction.reply({
            content: url,
        });
    }
});

client.login(token);
