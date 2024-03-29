import { ConnectionOptions, createConnection } from 'typeorm';
import PortfolioEntity from '../entities/PortfolioEntity';
import development from '../config/development';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import IVersionType from '../enums/IVersionType';
import PageEntity from '../entities/PageEntity';

async function seed() {
  const dbConfig: ConnectionOptions = { ...development.database };
  const connection = await createConnection(dbConfig);

  const portfolio1 = await connection.getRepository(PortfolioEntity).save({ name: 'port1', url: 'port1@example.com' });
  const portfolio2 = await connection.getRepository(PortfolioEntity).save({ name: 'port2', url: 'port2@example.com' });

  const version1 = await connection.getRepository(PortfolioVersionEntity).save({
    version: IVersionType.DRAFT,
    url: 'page100@example.com',
    portfolio: portfolio1,
    pages: [{ name: 'page101', url: 'page201.com' }],
  });
  const version2 = await connection.getRepository(PortfolioVersionEntity).save({
    version: IVersionType.PUBLISHED,
    url: 'page100@example.com',
    portfolio: portfolio1,
  });
  const version3 = await connection.getRepository(PortfolioVersionEntity).save({
    version: IVersionType.DRAFT,
    url: 'page200@example.com',
    portfolio: portfolio2,
  });

  await connection.getRepository(PageEntity).save([
    { name: 'page101', url: 'page101.com', portfolioVersion: version1 },
    { name: 'page102', url: 'page102.com', portfolioVersion: version1 },
    { name: 'page200', url: 'page200.com', portfolioVersion: version2 },
    { name: 'page201', url: 'page201.com', portfolioVersion: version3 },
    { name: 'page301', url: 'page301.com', portfolioVersion: version3 },
    { name: 'page302', url: 'page302.com', portfolioVersion: version3 },
  ]);

  await connection.close();
}

seed()
  .then(() => console.log('Seed completed'))
  .catch((error) => console.error('Error seeding data:', error));
