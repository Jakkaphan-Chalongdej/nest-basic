export default () => ({
  /**
   * config general
   */
  isProduction:
    (process.env.NODE_ENV &&
      process.env.NODE_ENV.toLocaleUpperCase() === 'PRODUCTION') ||
    false,
  port: parseInt(process.env.PORT) || 3000,
  prefixApi: process.env.PREFIX_API || 'api',
  nodeEnv: process.env.NODE_ENV || 'dev',
  siteUrl: process.env.SITE_URL || 'http://127.0.0.1:3021',

  /**
   * config basic auth
   */
  basicUsername: process.env.BASIC_USER || 'admin',
  basicPassword: process.env.BASIC_PASS || 'secretP@ss',

  cors:
    String(process.env.APP_CORS).trim().split(',')[0] === ''
      ? '*'
      : String(process.env.APP_CORS)
          .trim()
          .split(',')
          .map((item) => item.trim()) || '*',
});
