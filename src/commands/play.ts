import { CommandInteraction } from "discord.js";
import { VideoSearchResult } from "yt-search";
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const execute = (message: CommandInteraction, args: any) => {};

export const videoFinder = async (query: string): Promise<Video> => {
    let topResult: Video;

    const results = await ytSearch(query);
    topResult = results.videos[0];
    return topResult;
};

const streamVideo = (video: Video) => {
    const stream = ytdl(video.url, { filter: "audioonly" });
};
