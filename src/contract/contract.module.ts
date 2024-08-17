import { Module } from '@nestjs/common';
import { ContractController } from './adapters/api/contract.controller';
import { ContractInDB } from './adapters/db/contractInDB.repository';
import { ContractService } from './domain/ports/contract.service';
import { ContractRepository } from './domain/ports/contract.repository';
import { ContractApiService } from './adapters/api/contractApi.service';
import { PrismaModule } from '@Db/prisma.module';

@Module( {
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
} )
export class ContractModule { }
