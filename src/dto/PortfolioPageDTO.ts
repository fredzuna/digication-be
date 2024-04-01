import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PortfolioPageDTO {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  url: string;
}
