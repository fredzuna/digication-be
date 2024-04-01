import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import PortfolioEntity from '../entities/PortfolioEntity';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import IVersionType from '../enums/IVersionType';

@Service()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity) private readonly portfolioRepository: Repository<PortfolioEntity>,
    @InjectRepository(PortfolioVersionEntity) private readonly versionRepository: Repository<PortfolioVersionEntity>
  ) {}

  async getAllPortfolio(): Promise<PortfolioEntity[]> {
    try {
      return await this.portfolioRepository.find({
        relations: ['portfolioVersion', 'portfolioVersion.pages'],
      });
    } catch (error) {
      throw new Error('Failed to fetch portfolios');
    }
  }

  async getAllPortfolioVersions(): Promise<PortfolioVersionEntity[]> {
    try {
      const versions = await this.versionRepository
        .createQueryBuilder('version')
        .select('DISTINCT version.version', 'version')
        .getRawMany();

      return versions;
    } catch (error) {
      throw new Error('Failed to fetch portfolios');
    }
  }

  async getPortfolioPagesByVersion(versionType: IVersionType): Promise<PortfolioVersionEntity[]> {
    try {
      return await this.versionRepository.find({
        where: {
          version: versionType,
        },
        relations: ['pages'],
      });
    } catch (error) {
      throw new Error('Failed to fetch portfolios');
    }
  }

  async createSnapshotFromDraft(portfolioId: number): Promise<PortfolioVersionEntity> {
    try {
      const draftVersion = await this.versionRepository.findOne({
        where: {
          portfolio: { id: portfolioId },
          version: IVersionType.DRAFT,
        },
        relations: ['pages'],
      });

      if (!draftVersion) {
        throw new Error('Draft version not found for the provided portfolio ID');
      }

      const portfolio: PortfolioEntity | undefined = await this.portfolioRepository.findOne({
        where: { id: portfolioId },
      });

      if (!portfolio) {
        throw new Error('Portfolio not found for the provided ID');
      }

      const newSnapshotVersion = new PortfolioVersionEntity();
      newSnapshotVersion.version = IVersionType.SNAPSHOT;
      newSnapshotVersion.description = 'Snapshot version created from draft';
      newSnapshotVersion.portfolio = portfolio;

      newSnapshotVersion.pages = draftVersion.pages.map((page) => ({ ...page }));
      const savedSnapshotVersion = await this.versionRepository.save(newSnapshotVersion);

      return savedSnapshotVersion;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create snapshot version');
    }
  }
}
