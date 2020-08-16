import Discord from 'discord.js';
import config from './config';
import logger from './logger';
import DiscordMessageEvent from './event/message';

/**
 * The main App file.
 */
export class Bot {
    public client: Discord.Client;
    /**
     * Create a new App with the default configured express settings.
     */
    constructor() {
      this.client = new Discord.Client({ // TODO set owner
        presence: {
          status: 'online',
          activity: {
            name: config.activity_name,
            type: 'WATCHING', // FIXME use env variable
            url: config.activity_URL,
          },
        },
      });
    }

    /**
     * Configure the client field.
     */
    public config(): void {
      this.client.once('ready', ()=> {
        logger.log({
          level: 'info',
          message: `Logged in as ${this.client?.user?.tag}!`,
        });
      });
      this.client.on('message', (message) => DiscordMessageEvent.execute(message));
    }
}

// export default new Bot().client;
