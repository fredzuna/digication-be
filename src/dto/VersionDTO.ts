import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class VersionDTO {
  @Field()
  public version: string;
}
