import {
  type Client,
  Collection,
  REST,
  Routes,
  type SlashCommandBuilder,
} from "discord.js";
import type Command from "../types/command";
import { join } from "path";
import { readdirSync } from "fs";

export async function registerSlashCommands(client: Client) {
  client.commands = new Collection<string, Command>();

  const commands: SlashCommandBuilder[] = [];

  const commandsDir = join(__dirname, "../commands");

  for (const file of readdirSync(commandsDir)) {
    if (!file.endsWith(".js")) return;
    const commandModule = (await import(`${commandsDir}/${file}`)) as {
      default: Command;
    };
    const command = commandModule.default;
    commands.push(command.command);
    client.commands.set(command.command.name, command);
  }

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN,
  );

  rest
    .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands.map((command) => command.toJSON()),
    })
    .then((data: unknown) => {
      if (data instanceof Array)
        console.log(`Successfully loaded ${data.length} slash command(s)`);
    })
    .catch(console.error);
}
