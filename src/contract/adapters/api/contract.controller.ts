/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Logger, Query, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContractService } from '@Contract/domain/ports/contract.service';
import { ContractCommand, ContractListCommand } from './contract.command'
import { Contract } from '@Contract/domain/model/contract.model';
import { ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller( '/' )
export class ContractController {
  private readonly logger = new Logger( ContractController.name );

  constructor( private contractService: ContractService ) { }

  @Get( 'contractList' )
  @UsePipes( new ValidationPipe( { transform: true } ) )
  @ApiOperation( { summary: 'List contracts' } )
  @ApiResponse( {
    status: 200,
    description: 'The list of contracts has been successfully',
    type: [Contract]
  } )
  @ApiQuery( { name: 'accountNumber', required: true, type: String } )
  @ApiQuery( { name: 'startDate', required: false, type: String } )
  @ApiQuery( { name: 'endDate', required: false, type: String } )
  list(
    @Query( 'accountNumber' ) accountNumber: string,
    @Query( 'startDate' ) startDate?: string,
    @Query( 'endDate' ) endDate?: string ): Promise<Contract[]> {

    this.logger.log( 'list' );
    const contractListCommand = { accountNumber, startDate, endDate } as ContractListCommand;
    this.logger.log( { contractListCommand } );
    return this.contractService.list( { ...contractListCommand } );
  }

  @Post( 'contract' )
  @UsePipes( new ValidationPipe( { transform: true } ) )
  @ApiOperation( { summary: 'Create a contract' } )
  @ApiCreatedResponse( {
    description: 'The contract has been successfully created.',
    type: Contract
  } )
  create( @Body() contractCommand: ContractCommand ): Promise<Contract> {
    this.logger.log( 'create' );
    return this.contractService.create( { ...contractCommand } );
  }

}
