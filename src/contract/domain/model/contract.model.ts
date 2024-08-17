import { ApiProperty } from "@nestjs/swagger";

export class Contract {
  @ApiProperty()
  id: number;
  @ApiProperty()
  clientName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  initialDate: Date;
  @ApiProperty()
  accountNumber: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  currency: string;

  constructor(
    clientName: string,
    email: string,
    accountNumber: string,
    amount: number,
    initialDate?: Date,
    currency: string = 'USD',
  ) {
    this.clientName = clientName;
    this.email = email;
    this.initialDate = initialDate;
    this.accountNumber = accountNumber;
    this.amount = amount;
    this.currency = currency;
  }
}
