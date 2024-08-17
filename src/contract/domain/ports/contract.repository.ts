import { ContractCommand, ContractListCommand } from "@Contract/adapters/api/contract.command";
import { Contract } from "@Contract/domain/model/contract.model";

export interface ContractRepository {
  create( contractCommand: ContractCommand ): Promise<Contract>;
  list( contractListCommand: ContractListCommand ): Promise<Contract[]>;
}

export const ContractRepository = Symbol( "ContractRepository" );