import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { InjectionTokens } from './consts';
import { ReportsRepo } from './reports.repo';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: InjectionTokens.RABBITMQ_SERVICE,
          useValue: {
            emit: () => {},
          },
        },
        {
          provide: ReportsRepo,
          useValue: {
            create: () => {},
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
