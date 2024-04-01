import IVersionType from '../../src/enums/IVersionType';
import createApolloServer from '../test_helpers/createApolloServer';
import { createPortfolioEntity, mockData } from '../test_helpers/createPortfolioHelper';

describe('PortfoliosResolver', () => {
  const QUERY = `
    query AllPortfolio {
      allPortfolio {
        name
        url
      }
    }
  `;

  const QUERY_PORTFOLIO_VERSIONS = `
    query PortfolioVersions {
      portfolioVersions {
        version
      }
    }
  `;

  const QUERY_PAGES_BY_VERSION = `
    query PortfolioPagesByVersion($versionType: String!) {
      portfolioPagesByVersion(versionType: $versionType) {
        name
        url
      }
    }
  `;

  const MUTATION_CREATE_SNAPSHOT_FROM_DRAFT = `
    mutation CreateSnapshotFromDraft($portfolioId: Float!) {
      createSnapshotFromDraft(portfolioId: $portfolioId) {
        description
        version
        pages {
          name
          url
        }
      }
    }
  `;

  beforeAll(async () => {
    await createPortfolioEntity();
  });

  test('return portfolio items', async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {},
    });

    expect(response).toGraphQLResponseData({
      allPortfolio: [
        {
          name: mockData[0].name,
          url: mockData[0].url,
        },
        {
          name: mockData[1].name,
          url: mockData[1].url,
        },
      ],
    });
  });

  test('return all avaialable versions', async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY_PORTFOLIO_VERSIONS,
      variables: {},
    });

    expect(response).toGraphQLResponseData({
      portfolioVersions: [
        {
          version: IVersionType.DRAFT,
        },
        {
          version: IVersionType.PUBLISHED,
        },
      ],
    });
  });

  test('return pages by version', async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY_PAGES_BY_VERSION,
      variables: { versionType: IVersionType.PUBLISHED },
    });

    expect(response).toGraphQLResponseData({
      portfolioPagesByVersion: [
        {
          name: mockData[0].portfolioVersion[1].pages[0].name,
          url: mockData[0].portfolioVersion[1].pages[0].url,
        },
      ],
    });
  });

  test('return create snapshot version from draft version', async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: MUTATION_CREATE_SNAPSHOT_FROM_DRAFT,
      variables: { portfolioId: 1 },
    });

    const draftPortFolio = mockData.find(
      (item) => item.id === 1 && item.portfolioVersion.find((version) => version.version === IVersionType.DRAFT)
    );
    const draftVersion = draftPortFolio?.portfolioVersion[0];

    expect(response).toGraphQLResponseData({
      createSnapshotFromDraft: {
        description: 'Snapshot version created from draft',
        pages: draftVersion?.pages.map((item) => ({ name: item.name, url: item.url })),
        version: IVersionType.SNAPSHOT,
      },
    });
  });
});
