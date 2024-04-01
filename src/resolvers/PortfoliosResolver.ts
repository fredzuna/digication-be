import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { PortfolioService } from '../services/PortfolioService';
import IVersionType from '../enums/IVersionType';
import { PortfolioPageDTO } from '../dto/PortfolioPageDTO';
import { VersionDTO } from '../dto/VersionDTO';
import { PortfolioVersionDTO } from '../dto/PortfolioVersionDTO';
import { PortfolioDTO } from '../dto/PortfolioDTO';

@Resolver()
@Service()
export default class PortfoliosResolver {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Query(() => [PortfolioDTO], { description: 'portfolios list' })
  async allPortfolio(): Promise<PortfolioDTO[]> {
    try {
      const portfolios = await this.portfolioService.getAllPortfolio();

      return portfolios.map((portfolio) => ({
        id: portfolio.id,
        name: portfolio.name,
        url: portfolio.url,
        portfolioVersion: portfolio.portfolioVersion
      }));
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch portfolios');
    }
  }

  @Query(() => [VersionDTO], { description: 'portfolios list' })
  async portfolioVersions(): Promise<VersionDTO[]> {
    try {
      const versions = await this.portfolioService.getAllPortfolioVersions();

      return versions.map((version) => ({
        version: version.version,
      }));
    } catch (error) {
      throw new Error('Failed to fetch portfolios');
    }
  }

  @Query(() => [PortfolioPageDTO])
  async portfolioPagesByVersion(
    @Arg('versionType', () => String) versionType: IVersionType
  ): Promise<PortfolioPageDTO[]> {
    try {
      const versions = await this.portfolioService.getPortfolioPagesByVersion(versionType);

      let pagesList: PortfolioPageDTO[] = [];

      versions.forEach((version) => {
        pagesList = pagesList.concat(version.pages);
      });

      return pagesList;
    } catch (error) {
      throw new Error('Failed to fetch pages by version');
    }
  }

  @Mutation(() => PortfolioVersionDTO, { description: 'Create snapshot from draft' })
  async createSnapshotFromDraft(@Arg('portfolioId') portfolioId: number): Promise<PortfolioVersionDTO> {
    try {
      const version = await this.portfolioService.createSnapshotFromDraft(portfolioId);
      
      return {
        id: version.id,
        version: version.version,
        description: version.description,
        pages: version.pages,
      };
    } catch (error) {
      console.log(error)
      throw new Error('Failed to create snapshot from draft');
    }
  }
}
