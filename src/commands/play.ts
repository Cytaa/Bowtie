import {
    AudioPlayer,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    JoinVoiceChannelOptions,
    StreamType,
    VoiceConnection,
} from "@discordjs/voice";
import { CommandInteraction, StageChannel, VoiceChannel } from "discord.js";

const fs = require("fs");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { token, guildId } = require("../../config.json");

export const joinChannel = (
    voiceChannel: VoiceChannel | StageChannel
): VoiceConnection => {
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
    });
    return connection;
};

export const videoFinder = async (query: string): Promise<Video> => {
    let topResult: Video;
    const results = await ytSearch(query);
    topResult = results.videos[0];
    return topResult;
};

const streamVideo = (video: Video) => {
    ytdl(video.url, { filter: "audioonly" })
        .pipe(fs.createWriteStream("./src/assets/audio.mp3"))
        .on("finish", () => console.log("Done"));
};

export const play = async (
    voiceChannel: VoiceChannel | StageChannel,
    query: string
) => {
    const connection = joinChannel(voiceChannel);
    connection.setSpeaking(true);
    const video = await videoFinder(query);
    streamVideo(video);
    const player = createAudioPlayer();
    const resource = createAudioResource("./src/assets/audio.mp3");
    resource.volume?.setVolume(0.5);
    connection.subscribe(player);
    player.play(resource);
    console.log(resource.audioPlayer);
};
