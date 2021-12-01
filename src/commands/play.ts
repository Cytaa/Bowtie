import { joinVoiceChannel, JoinVoiceChannelOptions } from "@discordjs/voice";
import { CommandInteraction, VoiceChannel } from "discord.js";
import { VideoSearchResult } from "yt-search";

const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { token, guildId } = require("../../config.json");

const play = (voiceChannel: VoiceChannel) => {
    //const connection = joinVoiceChannel(voiceChannel,);
};

export const videoFinder = async (query: string): Promise<Video> => {
    let topResult: Video;

    const results = await ytSearch(query);
    topResult = results.videos[0];
    return topResult;
};

const streamVideo = (video: Video) => {
    const stream = ytdl(video.url, { filter: "audioonly" });
};
