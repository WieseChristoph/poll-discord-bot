import * as dotenv from "dotenv";
import { checkEnvVars } from "./utils/env";
import { Client, Events, GatewayIntentBits } from "discord.js";
import interactionCreateHandler from "./events/interactionCreate";
import { registerSlashCommands } from "./handlers/slashCommandHandler";

dotenv.config();

// check for required environment variables
const envVars = ["DISCORD_BOT_TOKEN", "DISCORD_CLIENT_ID"];
checkEnvVars(envVars);

async function main() {
  // create a client
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  // register slash commands
  await registerSlashCommands(client);

  // --- register event handlers ---
  client.on(Events.InteractionCreate, interactionCreateHandler);

  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    console.log("Invite the bot to your server with the following URL:");
    console.log(
      `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=2147485696&scope=bot`,
    );
  });
  // --- end event handlers ---

  // login to discord
  client.login(process.env.DISCORD_BOT_TOKEN).catch(console.error);
}

main().catch(console.error);
