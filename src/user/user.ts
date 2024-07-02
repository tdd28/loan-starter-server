import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class User {
  @ApiProperty()
  @Field(() => ID)
  id: number;

  @ApiProperty({ nullable: true })
  @Field(() => String, { nullable: true })
  name: string;

  @ApiProperty({ nullable: true })
  @Field(() => String, { nullable: true })
  email: string;
}
