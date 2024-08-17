import { Test, TestingModule } from '@nestjs/testing';
import { ContractService } from '@Contract/domain/ports/contract.service';
import { ContractApiService } from '@Contract/adapters/api/contractApi.service';
import { ContractRepository } from '@Contract/domain/ports/contract.repository';
import { ContractInDB } from '@Contract/adapters/db/contractInDB.repository';
import { ContractController } from '@Contract/adapters/api/contract.controller';
import { PrismaModule } from '@Db/prisma.module';
import { Contract } from '@Contract/domain/model/contract.model';

describe( 'ContractService', () => {
  let service: ContractService;
  let contractRepository: ContractRepository;

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
    contractRepository = module.get<ContractRepository>( ContractRepository );
  } );

  it( 'should be defined', () => {
    expect( service ).toBeDefined();
  } );

  it( 'should return all contracts', async () => {
    const mockContracts: Contract[] = [
      new Contract( 'Guillermo Raugh', 'guillermo@vercel.com', '12-345-678', 91000 ),
      new Contract( 'Bill Gates', 'bill@microsoft.com', '12-345-678', 92000 ),
    ];

    jest.spyOn( contractRepository, 'list' ).mockResolvedValue( mockContracts );

    const contracts = await service.list( { accountNumber: '12-345-678' } );

    expect( contracts ).toEqual( mockContracts );
  } );
} );