import config from './env.json';
const env = config[process.env.NODE_ENV || 'development'];

export default env;