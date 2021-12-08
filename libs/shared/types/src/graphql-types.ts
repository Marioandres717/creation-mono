
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TransactionType {
    cash = "cash",
    cheque = "cheque",
    pending = "pending"
}

export enum OrderBy {
    asc = "asc",
    desc = "desc"
}

export enum UserType {
    admin = "admin",
    content_creator = "content_creator"
}

export interface CategoryWhereInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface CategoryInsertInput {
    id: number;
    name: string;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface CategoryUpdateInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface CategoryOrderByInput {
    id?: Nullable<OrderBy>;
    name?: Nullable<OrderBy>;
    systemDefined?: Nullable<OrderBy>;
    userId?: Nullable<OrderBy>;
}

export interface TagWhereInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface TagInsertInput {
    id?: Nullable<number>;
    name: string;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface TagUpdateInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface TagOrderByInput {
    id?: Nullable<OrderBy>;
    name?: Nullable<OrderBy>;
    systemDefined?: Nullable<OrderBy>;
    userId?: Nullable<OrderBy>;
}

export interface TransactionWhereInput {
    id?: Nullable<number>;
    description?: Nullable<string>;
    userId?: Nullable<number>;
    date?: Nullable<DateTime>;
    amount?: Nullable<number>;
    expense?: Nullable<boolean>;
    type?: Nullable<TransactionType>;
    categoryId?: Nullable<number>;
}

export interface TransactionOrderByInput {
    id?: Nullable<OrderBy>;
    description?: Nullable<OrderBy>;
    userId?: Nullable<OrderBy>;
    date?: Nullable<OrderBy>;
    amount?: Nullable<OrderBy>;
    expense?: Nullable<OrderBy>;
    type?: Nullable<OrderBy>;
    categoryId?: Nullable<OrderBy>;
}

export interface TransactionInsertInput {
    id?: Nullable<number>;
    description?: Nullable<string>;
    userId: number;
    date: DateTime;
    amount: number;
    expense: boolean;
    type: TransactionType;
    categoryId: number;
}

export interface TransactionUpdateInput {
    id?: Nullable<number>;
    description?: Nullable<string>;
    userId?: Nullable<number>;
    date?: Nullable<DateTime>;
    amount?: Nullable<number>;
    expense?: Nullable<boolean>;
    type?: Nullable<TransactionType>;
    categoryId?: Nullable<number>;
}

export interface TransactionsTagsWhereInput {
    id?: Nullable<number>;
    transactionId?: Nullable<number>;
    tagId?: Nullable<number>;
}

export interface TransactionsTagsOrderByInput {
    id?: Nullable<OrderBy>;
    transactionId?: Nullable<OrderBy>;
    tagId?: Nullable<OrderBy>;
}

export interface TransactionsTagsInsertInput {
    id?: Nullable<number>;
    transactionId: number;
    tagId: number;
}

export interface TransactionsTagsUpdateInput {
    id?: Nullable<number>;
    transactionId?: Nullable<number>;
    tagId?: Nullable<number>;
}

export interface UserWhereInput {
    id?: Nullable<number>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    type?: Nullable<UserType>;
    active?: Nullable<boolean>;
    password?: Nullable<string>;
}

export interface UserOrderByInput {
    id?: Nullable<OrderBy>;
    email?: Nullable<OrderBy>;
    username?: Nullable<OrderBy>;
    type?: Nullable<OrderBy>;
    active?: Nullable<OrderBy>;
    password?: Nullable<OrderBy>;
}

export interface UserInsertInput {
    id?: Nullable<number>;
    email: string;
    username?: Nullable<string>;
    type?: Nullable<UserType>;
    active?: Nullable<boolean>;
    password: string;
}

export interface UserUpdateInput {
    id?: Nullable<number>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    type?: Nullable<UserType>;
    active?: Nullable<boolean>;
    password?: Nullable<string>;
}

export interface IQuery {
    login(user: UserWhereInput): Nullable<User> | Promise<Nullable<User>>;
    category(where: CategoryWhereInput): Nullable<Category> | Promise<Nullable<Category>>;
    categories(where: CategoryWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<CategoryOrderByInput>): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;
    countCategory(where: CategoryWhereInput): Nullable<number> | Promise<Nullable<number>>;
    tag(where: TagWhereInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    tags(where: TagWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<TagOrderByInput>): Nullable<Nullable<Tag>[]> | Promise<Nullable<Nullable<Tag>[]>>;
    countTag(where: TagWhereInput): Nullable<number> | Promise<Nullable<number>>;
    transaction(where: TransactionWhereInput): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    transactions(where: TransactionWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<TransactionOrderByInput>): Nullable<Nullable<Transaction>[]> | Promise<Nullable<Nullable<Transaction>[]>>;
    countTransaction(where: TransactionWhereInput): Nullable<number> | Promise<Nullable<number>>;
    TransactionsTags(where: TransactionsTagsWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<TransactionsTagsOrderByInput>): Nullable<Nullable<TransactionsTags>[]> | Promise<Nullable<Nullable<TransactionsTags>[]>>;
    countTransactionsTags(where: TransactionsTagsWhereInput): Nullable<number> | Promise<Nullable<number>>;
    me(): Nullable<User> | Promise<Nullable<User>>;
    user(where: UserWhereInput): Nullable<User> | Promise<Nullable<User>>;
    users(where: UserWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<UserOrderByInput>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    countUser(where: UserWhereInput): Nullable<number> | Promise<Nullable<number>>;
}

export interface IMutation {
    insertCategory(Category: CategoryInsertInput): Nullable<Category> | Promise<Nullable<Category>>;
    updateCategory(category: CategoryUpdateInput, where: CategoryWhereInput): Nullable<Category> | Promise<Nullable<Category>>;
    deleteCategory(where: CategoryWhereInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    insertTag(Tag: TagInsertInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    updateTag(Tag: TagUpdateInput, where: TagWhereInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    deleteTag(where: TagWhereInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    insertTransaction(Transaction: TransactionInsertInput): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    updateTransaction(Transaction: TransactionUpdateInput, where: TransactionWhereInput): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    deleteTransaction(where: TransactionWhereInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    insertTransactionsTags(TransactionsTags: TransactionsTagsInsertInput): Nullable<TransactionsTags> | Promise<Nullable<TransactionsTags>>;
    updateTransactionsTags(where: TransactionsTagsWhereInput, TransactionsTags: TransactionsTagsUpdateInput): Nullable<TransactionsTags> | Promise<Nullable<TransactionsTags>>;
    deleteTransactionsTags(where: TransactionsTagsWhereInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    signUp(user: UserInsertInput): Nullable<User> | Promise<Nullable<User>>;
    updateUser(user: UserUpdateInput, where: UserWhereInput): Nullable<User> | Promise<Nullable<User>>;
    deleteUser(where: UserWhereInput): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface Category {
    id: number;
    name: string;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface Tag {
    id: number;
    name: string;
    systemDefined?: Nullable<boolean>;
    userId?: Nullable<number>;
}

export interface Transaction {
    id: number;
    description?: Nullable<string>;
    userId: number;
    date: DateTime;
    amount: number;
    expense: boolean;
    type: TransactionType;
    categoryId: number;
}

export interface TransactionsTags {
    id: number;
    transactionId: number;
    tagId: number;
}

export interface User {
    id: number;
    email: string;
    username?: Nullable<string>;
    type?: Nullable<UserType>;
    active?: Nullable<boolean>;
    password?: Nullable<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
