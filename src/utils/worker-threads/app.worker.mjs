import { workerData, parentPort } from 'node:worker_threads'

const transform = () => {
  return 'App Worker is ready to use'
}

parentPort.postMessage({
  value: transform(workerData),
})
