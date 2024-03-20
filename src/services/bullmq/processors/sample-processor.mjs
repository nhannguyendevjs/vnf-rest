import { Logger } from '../../logger/logger.mjs';

const sampleProcessor = (job) => {
  Logger.log('info', 'Sample Processor: ' + JSON.stringify(job.data));
};

export { sampleProcessor };
