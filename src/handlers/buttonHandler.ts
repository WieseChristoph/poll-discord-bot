import type { ButtonInteraction } from "discord.js";
import { handleVote } from "./voteHandler";

export default async function buttonHandler(interaction: ButtonInteraction) {
  try {
    const pollEmbed = interaction.message.embeds.at(0);
    if (!pollEmbed) {
      await interaction.reply({ content: "Missing embed!", ephemeral: true });
      return;
    }

    const editedPollEmbed = handleVote(
      pollEmbed,
      interaction.user.id,
      interaction.component.label ?? "",
    );

    await interaction.update({ embeds: [editedPollEmbed] });
  } catch (error) {
    if (error instanceof Error)
      await interaction.reply({ content: error.message, ephemeral: true });
    else console.error(error);
  }
}
