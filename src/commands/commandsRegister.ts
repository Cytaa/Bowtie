import {
    SlashCommandBuilder,
    SlashCommandStringOption,
} from "@discordjs/builders";
import { REST } from "@discordjs/rest/";
const { Routes } = require("discord-api-types/v9");
const { token, guildId, clientId } = require("../../config.json");

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("replay with pong"),
    new SlashCommandBuilder()
        .setName("play")
        .setDescription("To do")
        .addStringOption((option: SlashCommandStringOption) => {
            return option
                .setName("query")
                .setDescription("insert your query")
                .setRequired(true);
        }),
].map((command) => command.toJSON());

export const deploy = async (): Promise<void> => {
    const rest = new REST().setToken(token);

    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log("Commands deployed");
    } catch (error) {
        console.error("Error while deploing: " + error);
    }
};
