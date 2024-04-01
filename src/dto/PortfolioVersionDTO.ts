import { Field, ObjectType } from 'type-graphql';
import { PortfolioPageDTO } from './PortfolioPageDTO';

@ObjectType()
export class PortfolioVersionDTO {
  @Field()
  id: number;

  @Field()
  public version: string;

  @Field({ nullable: true }) 
  public description?: string;

  @Field(() => [PortfolioPageDTO])
  pages: PortfolioPageDTO[];
}
