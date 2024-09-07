# Simple Modular Discord Bot

A modular Discord bot built with Node.js and Discord.js v14, designed for easy extension and customization through modules.

## Features

- **Modular Design**: Easily add or remove functionality by placing new modules in the `/modules` directory.
- **Slash Commands & Interactions**: Define and handle commands, buttons, and other interactions.

## Getting Started

### Configuration

1. **Ensure Node.js is Installed**:

   - Make sure you have [Node.js](https://nodejs.org/) installed on your system. You can check this by running `node -v` in your terminal or command prompt.

2. **Navigate to Your Bot's Directory**:

   - Open your terminal or command prompt and navigate to the directory where your bot's code is located:

   ```bash
   cd path/to/your/bot
   ```

3. **Install Dependencies** (if not already installed):

   - If you haven't installed the dependencies yet, run:

   ```bash
   npm install
   ```

4. **Edit `config.json`:**

   - Add your bot token and client ID:

   ```json
   {
       "Token": "YOUR_BOT_TOKEN",
       "ClientID": "YOUR_CLIENT_ID"
   }
   ```

5. **Run the Bot:**

   ```bash
   node index.js
   ```

## Example Module

- **`helloworld.js`**: Adds a `/hello` command with a "Push me" button that replies "Hello world!".

## License

MIT License. See the [LICENSE](LICENSE) file for more details.
