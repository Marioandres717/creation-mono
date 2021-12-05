
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

export enum Transaction_type {
    cash = "cash",
    cheque = "cheque",
    pending = "pending"
}

export interface User_WhereInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    type?: Nullable<string>;
    active?: Nullable<string>;
    password?: Nullable<string>;
}

export interface User_OrderByInput {
    id?: Nullable<OrderBy>;
    email?: Nullable<OrderBy>;
    username?: Nullable<OrderBy>;
    type?: Nullable<OrderBy>;
    active?: Nullable<OrderBy>;
    password?: Nullable<OrderBy>;
}

export interface Category_WhereInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    system_defined?: Nullable<string>;
    user_id?: Nullable<string>;
}

export interface Category_OrderByInput {
    id?: Nullable<OrderBy>;
    name?: Nullable<OrderBy>;
    system_defined?: Nullable<OrderBy>;
    user_id?: Nullable<OrderBy>;
}

export interface Tag_WhereInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    system_defined?: Nullable<string>;
    user_id?: Nullable<string>;
}

export interface Tag_OrderByInput {
    id?: Nullable<OrderBy>;
    name?: Nullable<OrderBy>;
    system_defined?: Nullable<OrderBy>;
    user_id?: Nullable<OrderBy>;
}

export interface Transaction_WhereInput {
    id?: Nullable<string>;
    description?: Nullable<string>;
    user_id?: Nullable<string>;
    date?: Nullable<string>;
    amount?: Nullable<string>;
    expense?: Nullable<string>;
    type?: Nullable<string>;
    category_id?: Nullable<string>;
}

export interface Transaction_OrderByInput {
    id?: Nullable<OrderBy>;
    description?: Nullable<OrderBy>;
    user_id?: Nullable<OrderBy>;
    date?: Nullable<OrderBy>;
    amount?: Nullable<OrderBy>;
    expense?: Nullable<OrderBy>;
    type?: Nullable<OrderBy>;
    category_id?: Nullable<OrderBy>;
}

export interface Transactions_Tags_WhereInput {
    id?: Nullable<string>;
    transaction_id?: Nullable<string>;
    tag_id?: Nullable<string>;
}

export interface Transactions_Tags_OrderByInput {
    id?: Nullable<OrderBy>;
    transaction_id?: Nullable<OrderBy>;
    tag_id?: Nullable<OrderBy>;
}

export interface Category_InsertInput {
    id: number;
    name: string;
    system_defined: number;
    user_id?: Nullable<number>;
}

export interface Category_UpdateInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    system_defined?: Nullable<number>;
    user_id?: Nullable<number>;
}

export interface Tag_InsertInput {
    id: number;
    name: string;
    system_defined: number;
    user_id?: Nullable<number>;
}

export interface Tag_UpdateInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    system_defined?: Nullable<number>;
    user_id?: Nullable<number>;
}

export interface Transaction_InsertInput {
    id: number;
    description?: Nullable<string>;
    user_id: number;
    date: DateTime;
    amount: number;
    expense: number;
    type: Transaction_type;
    category_id: number;
}

export interface Transaction_UpdateInput {
    id?: Nullable<number>;
    description?: Nullable<string>;
    user_id?: Nullable<number>;
    date?: Nullable<DateTime>;
    amount?: Nullable<number>;
    expense?: Nullable<number>;
    type?: Nullable<Transaction_type>;
    category_id?: Nullable<number>;
}

export interface Transactions_Tags_InsertInput {
    id: number;
    transaction_id: number;
    tag_id: number;
}

export interface Transactions_Tags_UpdateInput {
    id?: Nullable<number>;
    transaction_id?: Nullable<number>;
    tag_id?: Nullable<number>;
}

export interface User_InsertInput {
    id: number;
    email: string;
    username?: Nullable<string>;
    type?: Nullable<User_type>;
    active: number;
    password?: Nullable<string>;
}

export interface User_UpdateInput {
    id?: Nullable<number>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    type?: Nullable<User_type>;
    active?: Nullable<number>;
    password?: Nullable<string>;
}

export interface IQuery {
    Category(limit?: Nullable<number>, offset?: Nullable<number>, where?: Nullable<Category_WhereInput>, orderBy?: Nullable<Category_OrderByInput>): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;
    count_Category(where?: Nullable<Category_WhereInput>): Nullable<number> | Promise<Nullable<number>>;
    Tag(limit?: Nullable<number>, offset?: Nullable<number>, where?: Nullable<Tag_WhereInput>, orderBy?: Nullable<Tag_OrderByInput>): Nullable<Nullable<Tag>[]> | Promise<Nullable<Nullable<Tag>[]>>;
    count_Tag(where?: Nullable<Tag_WhereInput>): Nullable<number> | Promise<Nullable<number>>;
    Transaction(limit?: Nullable<number>, offset?: Nullable<number>, where?: Nullable<Transaction_WhereInput>, orderBy?: Nullable<Transaction_OrderByInput>): Nullable<Nullable<Transaction>[]> | Promise<Nullable<Nullable<Transaction>[]>>;
    count_Transaction(where?: Nullable<Transaction_WhereInput>): Nullable<number> | Promise<Nullable<number>>;
    Transactions_Tags(limit?: Nullable<number>, offset?: Nullable<number>, where?: Nullable<Transactions_Tags_WhereInput>, orderBy?: Nullable<Transactions_Tags_OrderByInput>): Nullable<Nullable<Transactions_Tags>[]> | Promise<Nullable<Nullable<Transactions_Tags>[]>>;
    count_Transactions_Tags(where?: Nullable<Transactions_Tags_WhereInput>): Nullable<number> | Promise<Nullable<number>>;
    User(limit?: Nullable<number>, offset?: Nullable<number>, where?: Nullable<User_WhereInput>, orderBy?: Nullable<User_OrderByInput>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    count_User(where?: Nullable<User_WhereInput>): Nullable<number> | Promise<Nullable<number>>;
    login(user: User_WhereInput): Nullable<User> | Promise<Nullable<User>>;
    me(): Nullable<User> | Promise<Nullable<User>>;
}

export interface Category {
    id: number;
    name: string;
    system_defined: number;
    user_id?: Nullable<number>;
    User?: Nullable<Nullable<User>[]>;
}

export interface User {
    id: number;
    email: string;
    username?: Nullable<string>;
    type?: Nullable<User_type>;
    active: number;
    password?: Nullable<string>;
}

export interface Tag {
    id: number;
    name: string;
    system_defined: number;
    user_id?: Nullable<number>;
    User?: Nullable<Nullable<User>[]>;
}

export interface Transaction {
    id: number;
    description?: Nullable<string>;
    user_id: number;
    date: DateTime;
    amount: number;
    expense: number;
    type: Transaction_type;
    category_id: number;
    Category?: Nullable<Nullable<Category>[]>;
    User?: Nullable<Nullable<User>[]>;
}

export interface Transactions_Tags {
    id: number;
    transaction_id: number;
    tag_id: number;
    Tag?: Nullable<Nullable<Tag>[]>;
    Transaction?: Nullable<Nullable<Transaction>[]>;
}

export interface IMutation {
    insert_Category(Category: Category_InsertInput): Nullable<Category> | Promise<Nullable<Category>>;
    update_Category(Category: Category_UpdateInput, where?: Nullable<Category_WhereInput>): Nullable<Category> | Promise<Nullable<Category>>;
    delete_Category(where?: Nullable<Category_WhereInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
    insert_Tag(Tag: Tag_InsertInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    update_Tag(Tag: Tag_UpdateInput, where?: Nullable<Tag_WhereInput>): Nullable<Tag> | Promise<Nullable<Tag>>;
    delete_Tag(where?: Nullable<Tag_WhereInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
    insert_Transaction(Transaction: Transaction_InsertInput): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    update_Transaction(Transaction: Transaction_UpdateInput, where?: Nullable<Transaction_WhereInput>): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    delete_Transaction(where?: Nullable<Transaction_WhereInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
    insert_Transactions_Tags(Transactions_Tags: Transactions_Tags_InsertInput): Nullable<Transactions_Tags> | Promise<Nullable<Transactions_Tags>>;
    update_Transactions_Tags(Transactions_Tags: Transactions_Tags_UpdateInput, where?: Nullable<Transactions_Tags_WhereInput>): Nullable<Transactions_Tags> | Promise<Nullable<Transactions_Tags>>;
    delete_Transactions_Tags(where?: Nullable<Transactions_Tags_WhereInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
    insert_User(User: User_InsertInput): Nullable<User> | Promise<Nullable<User>>;
    update_User(User: User_UpdateInput, where?: Nullable<User_WhereInput>): Nullable<User> | Promise<Nullable<User>>;
    delete_User(where?: Nullable<User_WhereInput>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export type DateTime = any;
type Nullable<T> = T | null;