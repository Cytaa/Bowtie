import { Client } from "discord.js";

export const getUserById = async (
    client: Client,
    id: string,
    guildId: string
) => {
    const guild = client.guilds.cache.get(guildId);
    const user = guild?.members.cache.get(id);
    console.log(user);
};
