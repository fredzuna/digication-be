import { BuildSchemaOptions } from 'type-graphql';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default interface ConfigInterface {
  readonly env: 'development' | 'test' | 'staging' | 'production';
  readonly database: MysqlConnectionOptions;
  readonly graphQLPath: string;
  readonly resolvers: BuildSchemaOptions['resolvers'];
}
