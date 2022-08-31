import Discord from "discord.js";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("message", (msg: any) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

let loggedIn = false

if (process.env.DISCORD_BOT_TOKEN) {
  client.login(process.env.DISCORD_BOT_TOKEN);
}


export const writeToDiscord = (message: string) => {
  const channelId = process.env.DISCORD_MESSAGING_CHANNEL_ID
  if (!loggedIn || !channelId) return
  const channel = client.channels.cache.get(channelId)
  // @ts-ignore
  channel?.send(message);
};
