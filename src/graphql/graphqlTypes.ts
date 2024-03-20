/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  email: string;
  password: string;
  password_confirm: string;
}

export interface IQuery {
  user(): Nullable<string> | Promise<Nullable<string>>;
  findAll(): Nullable<string> | Promise<Nullable<string>>;
  findOne(id: string): Nullable<string> | Promise<Nullable<string>>;
  getCurrentUser(): User | Promise<User>;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface IMutation {
  login(
    loginUserInput: LoginUserInput,
  ): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;
  register(registerUserInput: RegisterUserInput): User | Promise<User>;
}

export interface User {
  id: string;
  email: string;
}

type Nullable<T> = T | null;
