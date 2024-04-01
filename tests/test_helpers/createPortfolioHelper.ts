import faker from 'faker';
import { DeepPartial, getRepository } from 'typeorm';
import PortfolioEntity from '../../src/entities/PortfolioEntity';
import IVersionType from '../../src/enums/IVersionType';
import PortfolioVersionEntity from '../../src/entities/PortfolioVersionEntity';
import PageEntity from '../../src/entities/PageEntity';

export const mockData = [
  {
    id: 0,
    name: faker.name.findName(),
    url: faker.internet.url(),
    portfolioVersion: [
      {
        version: IVersionType.DRAFT,
        url: faker.internet.url(),
        description: faker.lorem.text(),
        pages: [
          { id: 1, name: faker.name.findName(), url: faker.internet.url() },
          { id: 2, name: faker.name.findName(), url: faker.internet.url() },
        ],
      },
      {
        version: IVersionType.PUBLISHED,
        url: faker.internet.url(),
        description: faker.lorem.text(),
        pages: [{ id: 3, name: faker.name.findName(), url: faker.internet.url() }],
      },
    ],
  },
  {
    id: 1,
    name: faker.name.findName(),
    url: faker.internet.url(),
    portfolioVersion: [
      {
        version: IVersionType.DRAFT,
        url: faker.internet.url(),
        description: faker.lorem.text(),
        pages: [
          { id: 4, name: faker.name.findName(), url: faker.internet.url() },
          { id: 5, name: faker.name.findName(), url: faker.internet.url() },
          { id: 6, name: faker.name.findName(), url: faker.internet.url() },
        ],
      },
    ],
  },
];

export function buildPortfolioEntity(properties?: DeepPartial<PortfolioEntity>) {
  const repository = getRepository(PortfolioEntity);

  return repository.create({
    name: faker.name.findName(),
    url: faker.internet.url(),
    ...properties,
  });
}

export async function createPortfolioEntity() {
  await Promise.all(
    mockData.map(async (data) => {
      const portfolio = await getRepository(PortfolioEntity).save({ id: data.id, name: data.name, url: data.url });

      await Promise.all(
        data.portfolioVersion.map(async (portfolioVersionData) => {
          const version = await getRepository(PortfolioVersionEntity).save({
            version: portfolioVersionData.version,
            description: portfolioVersionData.description,
            portfolio,
          });

          await Promise.all(
            portfolioVersionData.pages.map(async (pageData) => {
              await getRepository(PageEntity).save({
                id: pageData.id,
                name: pageData.name,
                url: pageData.url,
                portfolioVersion: version,
              });
            })
          );
        })
      );
    })
  );
}

export default createPortfolioEntity;
