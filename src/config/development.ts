import ConfigInterface from './ConfigInterface';

const config: ConfigInterface = {
  env: 'development',
  database: {
    type: 'sqlite' as const,
    cache: false,
    database: 'database.db',
    entities: ['src/entities/*.ts'],
    logger: 'advanced-console' as const,
    synchronize: false,
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
