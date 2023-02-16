import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/graphql/graphqlTypes';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field()
  user: User;
}
