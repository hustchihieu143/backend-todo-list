export default () => ({
  type: process.env.type,
  port: parseInt(process.env.port, 10),
  host: process.env.host,
  username: process.env.username,
  password: '',
  database: process.env.database,
  entities: process.env.entities,
  synchronize: process.env.synchronize,
});
