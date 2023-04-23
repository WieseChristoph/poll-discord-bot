import type { Interaction } from "discord.js";
import buttonHandler from "../handlers/buttonHandler";

export default function interactionCreateHandler(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    // chat slash command
    const command = interaction.client.commands.get(interaction.commandName);

    if (command) command.execute(interaction).catch(console.error);
  } else if (interaction.isButton()) {
    // button click
    buttonHandler(interaction).catch(console.error);
  } else if (interaction.isAutocomplete()) {
    // autocomplete
    const command = interaction.client.commands.get(interaction.commandName);

    if (command && command.autocomplete)
      command.autocomplete(interaction).catch(console.error);
  }
}
