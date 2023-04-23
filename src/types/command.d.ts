import type {
  SlashCommandBuilder,
  CommandInteraction,
  AutocompleteInteraction,
} from "discord.js";

export default interface Command {
  command: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}
