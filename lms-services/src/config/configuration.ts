export default () => ({
  port: parseInt(process.env.LMS_SERVICE_PORT) || 3000,
  //   database: {
  //     host: process.env.DATABASE_HOST,
  //     port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  //   },
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtSecret: process.env.JWT_SECRET,
});
