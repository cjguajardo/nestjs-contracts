import { IsNotEmpty, IsNumber, IsEmail, IsDate, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ContractCommand {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  clientName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDate()
  @ApiPropertyOptional()
  @IsOptional()
  initialDate?: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  accountNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  currency: string;
}

export class ContractListCommand {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  accountNumber: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  startDate?: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  endDate?: string;
}