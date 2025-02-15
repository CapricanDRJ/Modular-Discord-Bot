const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    commandData: new SlashCommandBuilder()
        .setName('worldhello')
        .setDescription('Replies with a button that says "Push World"'),

    allowedButtons: ['push_world_button'], // Define allowed button ID

    executeCommand: async (interaction) => {
        if (interaction.commandName === 'worldhello') {
            // Create a button
            const button = new ButtonBuilder()
                .setCustomId('push_world_button')
                .setLabel('Push World')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder().addComponents(button);

            // Reply with the button
            await interaction.reply({
                content: "Here's a button for you:",
                components: [row],
                ephemeral: true
            });
        }
    },

    handleInteraction: async (client, interaction) => {
        // Firewall for command interactions
        if (interaction.isCommand() && interaction.commandName !== 'worldhello') {
            return; // Exit if the command is not allowed
        }

        // Firewall for button interactions
        if (interaction.isButton() && !module.exports.allowedButtons.includes(interaction.customId)) {
            return; // Exit if the button is not allowed
        }

        // Handle the allowed interactions
        if (interaction.isCommand()) {
            await module.exports.executeCommand(interaction);
        }

        if (interaction.isButton() && interaction.customId === 'push_world_button') {
            await interaction.reply({
                content: "Rockets launched 🚀",
                ephemeral: true
            });
        }
    },

    main: (client) => {
        console.log("Main function for worldhello module.");
    }
};
