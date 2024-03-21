import axios from 'axios';
import { GeneralConfigs, WebSocketConfigs } from '../../app.config.mjs';
import { Logger } from '../logger/logger.mjs';

const emitData = async (key, data) => {
  if (WebSocketConfigs.ENABLE_WEBSOCKET) {
    await axios.post(
      WebSocketConfigs.WEBSOCKET_URL,
      { key, data },
      {
        headers: {
          domain: GeneralConfigs.APP_DOMAIN,
        },
      }
    );
  }
};

const bootstrap = async () => {
  if (WebSocketConfigs.ENABLE_WEBSOCKET) {
    Logger.log('info', `Signal is ready to use`);
  }
};

export { bootstrap, emitData };
