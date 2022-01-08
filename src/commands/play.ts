import { joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import { StageChannel, VoiceChannel } from "discord.js";
import { Video } from "../models/video";

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
    return ytdl(video.url, { filter: "audioonly" });
};

export const youtube = async (query: string) => {
    const video = await videoFinder(query);

    return video.url;
};
