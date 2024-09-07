const Discord = require("discord.js");
const Config = require("./config.json");
const fs = require('fs');
const path = require('path');

const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds],
    partials: [Discord.Partials.User, Discord.Partials.Channel, Discord.Partials.GuildMember, Discord.Partials.Message]
});

// Load all modules from the /modules directory at startup
const modulesDir = path.join(__dirname, 'modules');
const modules = fs.readdirSync(modulesDir)
    .filter(file => file.endsWith('.js'))
    .map(file => require(path.join(modulesDir, file)));

// Register slash commands
const registerCommands = async () => {
    const commands = [];
    modules.forEach(mod => {
        if (mod.commandData) {
            commands.push(mod.commandData.toJSON());
        }
    });

    if (commands.length > 0) {
        const rest = new Discord.REST({ version: '10' }).setToken(Config.Token);
        
        // Fetch the guilds the bot is in
        const guilds = await client.guilds.fetch();

        if (guilds.size === 1) {
            // Register commands to a single guild (server)
            const guildId = guilds.first().id;
            await rest.put(Discord.Routes.applicationGuildCommands(Config.ClientID, guildId), { body: commands });
            console.log(`Successfully registered commands to the guild with ID: ${guildId}.`);
        } else {
            // Register commands globally
            await rest.put(Discord.Routes.applicationCommands(Config.ClientID), { body: commands });
            console.log('Successfully registered global application commands.');
        }
    }
};

client.once('ready', async () => {
    console.log(`Client ready; logged in as ${client.user.tag} (${client.user.id})`);

    // Register commands based on the number of guilds (servers)
    await registerCommands();

    // Initialize the bot using all loaded modules
    modules.forEach(mod => {
        if (mod.initializeBot) mod.initializeBot(client);
        if (mod.loadEvents) mod.loadEvents(client);
    });

    // Call the main function for each module after the bot is ready
    modules.forEach(mod => {
        if (mod.main) mod.main(client);
    });
});

client.on("interactionCreate", async (interaction) => {
    // Execute all handleInteraction functions in parallel
    await Promise.all(modules.map(async (mod) => {
        if (mod.handleInteraction) {
            await mod.handleInteraction(client, interaction);
        }
    }));
});

client.login(Config.Token).catch(console.error);
