
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum User_type {
    admin = "admin",
    content_creator = "content_creator"
}

export enum OrderBy {
    asc = "asc",
    desc = "desc"
}

export interface User_WhereInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    type?: Nullable<string>;
    active?: Nullable<string>;
}

export interface User_OrderByInput {
    id?: Nullable<OrderBy>;
    email?: Nullable<OrderBy>;
    username?: Nullable<OrderBy>;
    password?: Nullable<OrderBy>;
    type?: Nullable<OrderBy>;
    active?: Nullable<OrderBy>;
}

export interface User_InsertInput {
    id: number;
    email: string;
    username?: Nullable<string>;
    password?: Nullable<string>;
    type?: Nullable<User_type>;
    active: number;
}

export interface User_UpdateInput {
    id?: Nullable<number>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    type?: Nullable<User_type>;
    active?: Nullable<number>;
}

export interface IQuery {
    __typename?: 'IQuery';
    User(limit?: Nullable<number>, offset?: Nullable<number>, where?: Nullable<User_WhereInput>, orderBy?: Nullable<User_OrderByInput>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    count_User(where?: Nullable<User_WhereInput>): Nullable<number> | Promise<Nullable<number>>;
    login(user: User_WhereInput): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface User {
    __typename?: 'User';
    id: number;
    email: string;
    username?: Nullable<string>;
    password?: Nullable<string>;
    type?: Nullable<User_type>;
    active: number;
}

export interface IMutation {
    __typename?: 'IMutation';
    insert_User(User: User_InsertInput): Nullable<User> | Promise<Nullable<User>>;
    update_User(User: User_UpdateInput, where?: Nullable<User_WhereInput>): Nullable<User> | Promise<Nullable<User>>;
    delete_User(where?: Nullable<User_WhereInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
