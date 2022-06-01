const ENV = require(`./environment.${process.env.NODE_ENV || 'development'}`)
  .default

export { ENV }
