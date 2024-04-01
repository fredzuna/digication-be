import { Field, ObjectType } from 'type-graphql';
import { PortfolioVersionDTO } from './PortfolioVersionDTO';

@ObjectType()
export class PortfolioDTO {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field(() => [PortfolioVersionDTO])
  portfolioVersion: PortfolioVersionDTO[];
}