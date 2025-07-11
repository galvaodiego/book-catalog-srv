import { ApiProperty } from '@nestjs/swagger';

export class SingleResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty()
  data: T;
}
