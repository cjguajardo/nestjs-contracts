import { Injectable } from "@nestjs/common";
import { Contract } from "@Contract/domain/model/contract.model";
import { ContractService } from "@Contract/domain/ports/contract.service";
import { ContractCommand, ContractListCommand } from "./contract.command";

@Injectable()
export class ContractApiService {
  constructor( private contractService: ContractService ) { }

  create( contractCommand: ContractCommand ): Promise<Contract> {
    return this.contractService.create( contractCommand );
  }

  list( contractListCommand: ContractListCommand ): Promise<Contract[]> {
    return this.contractService.list( contractListCommand );
  }
}
