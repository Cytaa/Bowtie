import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest/";
const { Routes } = require("discord-api-types/v9");
const { token, guildId, clientId } = require("../../config.json");

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("replay with ping"),
    new SlashCommandBuilder()
        .setName("play")
        .setDescription("Do implementacji"),
].map((command: SlashCommandBuilder) => command.toJSON());

export const deploy = async (): Promise<void> => {
    const rest = new REST().setToken(token);

    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log("Commands deployed");
    } catch (error) {
        console.error(error);
    }
};
