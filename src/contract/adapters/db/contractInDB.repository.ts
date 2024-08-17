import { Contract } from "@Contract/domain/model/contract.model";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@Db/prisma.service";
import { ContractRepository } from "@Contract/domain/ports/contract.repository";
import { ContractListCommand } from "../api/contract.command";

@Injectable()
export class ContractInDB implements ContractRepository {
  constructor( private readonly prisma: PrismaService ) { }

  async create( contract: Contract ): Promise<Contract> {
    const newContract = await this.prisma.contract.create( {
      data: {
        clientName: contract.clientName,
        email: contract.email,
        initialDate: contract.initialDate,
        accountNumber: contract.accountNumber,
        amount: contract.amount,
        currency: contract.currency
      }
    } )

    return { ...newContract, amount: Number( newContract.amount ) } as Contract
  }

  async list( contractListCommand: ContractListCommand ): Promise<Contract[]> {
    const initialDate = {};
    if ( contractListCommand.startDate ) {
      initialDate['gte'] = new Date( contractListCommand.startDate );
    }
    if ( contractListCommand.endDate ) {
      // endDate is inclusive
      initialDate['lte'] = new Date( new Date( contractListCommand.endDate ).setHours( 23, 59, 59 ) );
    }

    const contracts = await this.prisma.contract.findMany( {
      where: {
        accountNumber: {
          equals: contractListCommand.accountNumber,
        },
        initialDate: initialDate
      }
    } );
    return contracts.map( contract => ( {
      ...contract,
      amount: Number( contract.amount ) // Convert amount to number
    } ) );
  }
}