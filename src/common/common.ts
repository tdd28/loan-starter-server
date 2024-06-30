import { ApiProperty } from '@nestjs/swagger';

export class HttpException {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;
}
