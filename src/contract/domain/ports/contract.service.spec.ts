import { Test, TestingModule } from '@nestjs/testing';
import { ContractService } from './contract.service';
import { ContractApiService } from '@Contract/adapters/api/contractApi.service';
import { ContractRepository } from './contract.repository';
import { ContractInDB } from '@Contract/adapters/db/contractInDB.repository';
import { ContractController } from '@Contract/adapters/api/contract.controller';
import { PrismaModule } from '@Db/prisma.module';

describe( 'ContractService', () => {
  let service: ContractService;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      imports: [PrismaModule],
      controllers: [ContractController],
      providers: [
        ContractService,
        ContractApiService,
        {
          provide: ContractRepository,
          useClass: ContractInDB,
        },
      ],
    } ).compile();

    service = module.get<ContractService>( ContractService );
  } );

  it( 'should be defined', () => {
    expect( service ).toBeDefined();
  } );

  it( 'should return all contracts', async () => {
    const contracts = await service.list( { accountNumber: '1234567890' } );
    expect( contracts ).toBeDefined();
  } );
} );