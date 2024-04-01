import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import PageEntity from './PageEntity';
import PortfolioEntity from './PortfolioEntity';

@ObjectType('PortfolioVersion')
@Entity()
export default class PortfolioVersionEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  public version: string;

  @Field()
  @Column('varchar', { nullable: true })
  public description: string;

  @ManyToOne(() => PortfolioEntity, { nullable: false })
  portfolio: PortfolioEntity;

  @OneToMany(() => PageEntity, (page) => page.portfolioVersion)
  pages: PageEntity[];
}
