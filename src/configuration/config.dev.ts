export default () => ({
  database: {
    user: process.env.DATABASEUSER,
    password: process.env.DATABASPASSWORD,
    database: process.env.DATABASENAME,
    server: process.env.DATABASESERVER,
  },
  jwt: {
    secret: process.env.SECRETTOKEN,
  },
  bcrypt: {
    saltOrRounds: process.env.ROUNDSBCRYPT,
  },
  push: {
    publicKey: process.env.PUSHPUBLICKEY,
    privateKey: process.env.PUSHPRIVATEKEY,
  },
});
