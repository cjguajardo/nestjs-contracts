import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Contract } from '@Contract/domain/model/contract.model';
import { ContractRepository } from '@Contract/domain/ports/contract.repository';
import { ContractCommand, ContractListCommand } from '@Contract/adapters/api/contract.command';
import { Validate } from 'class-validator';

@Injectable()
export class ContractService {
  constructor(
    @Inject( ContractRepository )
    private readonly contractRepository: ContractRepository,
  ) { }

  async create( contractCommand: ContractCommand ): Promise<Contract> {
    return this.contractRepository.create( { ...contractCommand } );
  }

  list( contractListCommand: ContractListCommand ): Promise<Contract[]> {
    const { accountNumber } = contractListCommand;
    if ( !accountNumber ) {
      throw new BadRequestException( 'accountNumber is required' );
    }
    return this.contractRepository.list( { ...contractListCommand } );
  }
}
