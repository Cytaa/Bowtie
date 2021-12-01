import { Client, GuildMember } from "discord.js";

export const getUserById = (
    client: Client,
    id: string,
    guildId: string
): GuildMember | undefined => {
    const guild = client.guilds.cache.get(guildId);
    return guild?.members.cache.get(id);
};
