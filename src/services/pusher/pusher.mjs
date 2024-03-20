import Pusher from 'pusher';
import { PusherConfigs } from '../../app.config.mjs';
import { Logger } from '../../services/logger/logger.mjs';

let pusher;

const bootstrap = async () => {
  if (PusherConfigs.ENABLE_PUSHER) {
    Logger.log('info', `Pusher is ready to use`);

    pusher = new Pusher({
      appId: PusherConfigs.PUSHER_APP_ID,
      key: PusherConfigs.PUSHER_KEY,
      secret: PusherConfigs.PUSHER_SECRET,
      cluster: PusherConfigs.PUSHER_CLUSTER,
      useTLS: true,
    });
  }
};

const broadcast = (message) => {
  pusher.trigger('vnf', 'notification', message);
};

export { bootstrap, broadcast };
