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

  /* @Column()
  public portafolioId: number

  @Column()
  public pageId: number */

  /* @Field()
  @Column({
    type: 'enum',
    enum: IVersionType,
    default: IVersionType.DRAFT,
  })
  public version: IVersionType; */

  @Field()
  @Column()
  public version: string;

  @ManyToOne(() => PortfolioEntity, { nullable: false })
  portfolio: PortfolioEntity;

  @OneToMany(() => PageEntity, (page) => page.portfolioVersion)
  pages: PageEntity[];
}
