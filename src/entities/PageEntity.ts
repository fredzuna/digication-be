import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import PortfolioVersionEntity from './PortfolioVersionEntity';

@Entity()
export default class PageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false, unique: true })
  url: string;

  @ManyToOne(() => PortfolioVersionEntity, { nullable: false })
  portfolioVersion: PortfolioVersionEntity;
}
