import ConfigInterface from './ConfigInterface';

const config: ConfigInterface = {
  env: 'development',
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'portfoliodb',
    entities: ['src/entities/*.ts'],    
    migrations: ['src/migrations/*.ts'], // Array of migration files (can be js/ts)
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
    },
  },
  graphQLPath: '/graphql',
  resolvers: [`${__dirname}/../resolvers/**/*Resolver.ts`],
};

export default config;
