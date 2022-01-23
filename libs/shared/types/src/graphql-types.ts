
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export type TransactionType = "cash" | "cheque" | "pending";
export type OrderBy = "asc" | "desc";
export type UserRole = "admin" | "basic";

export interface CategoryWhereInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    isSystemDefined?: Nullable<number>;
    userId?: Nullable<string>;
}

export interface CategoryWhereUniqueInput {
    id?: Nullable<string>;
}

export interface CategoryInsertInput {
    name: string;
}

export interface CategoryUpdateInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface CategoryOrderByInput {
    id?: Nullable<OrderBy>;
    name?: Nullable<OrderBy>;
    isSystemDefined?: Nullable<OrderBy>;
    userId?: Nullable<OrderBy>;
}

export interface TagWhereInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    isSystemDefined?: Nullable<number>;
    userId?: Nullable<string>;
}

export interface TagWhereUniqueInput {
    id?: Nullable<string>;
}

export interface TagInsertInput {
    name: string;
}

export interface TagUpdateInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface TagOrderByInput {
    id?: Nullable<OrderBy>;
    name?: Nullable<OrderBy>;
    isSystemDefined?: Nullable<OrderBy>;
    userId?: Nullable<OrderBy>;
}

export interface TransactionWhereInput {
    id?: Nullable<string>;
    description?: Nullable<string>;
    userId?: Nullable<string>;
    date?: Nullable<DateTime>;
    amount?: Nullable<Decimal>;
    isExpense?: Nullable<number>;
    type?: Nullable<TransactionType>;
    categoryId?: Nullable<string>;
}

export interface TransactionWhereUniqueInput {
    id?: Nullable<string>;
}

export interface TransactionOrderByInput {
    id?: Nullable<OrderBy>;
    description?: Nullable<OrderBy>;
    userId?: Nullable<OrderBy>;
    date?: Nullable<OrderBy>;
    amount?: Nullable<OrderBy>;
    isExpense?: Nullable<OrderBy>;
    type?: Nullable<OrderBy>;
    categoryId?: Nullable<OrderBy>;
}

export interface TransactionInsertInput {
    description?: Nullable<string>;
    date?: Nullable<DateTime>;
    amount: Decimal;
    isExpense?: Nullable<number>;
    type?: Nullable<TransactionType>;
    categoryId?: Nullable<string>;
}

export interface TransactionUpdateInput {
    id?: Nullable<string>;
    description?: Nullable<string>;
    date?: Nullable<DateTime>;
    amount?: Nullable<Decimal>;
    isExpense?: Nullable<number>;
    type?: Nullable<TransactionType>;
    categoryId?: Nullable<string>;
}

export interface TransactionsTagsWhereUniqueInput {
    id?: Nullable<string>;
}

export interface TransactionsTagsWhereInput {
    id?: Nullable<string>;
    transactionId?: Nullable<string>;
    tagId?: Nullable<string>;
}

export interface TransactionsTagsOrderByInput {
    id?: Nullable<OrderBy>;
    transactionId?: Nullable<OrderBy>;
    tagId?: Nullable<OrderBy>;
}

export interface TransactionsTagsInsertInput {
    transactionId: string;
    tagId: string;
}

export interface TransactionsTagsUpdateInput {
    id?: Nullable<string>;
    transactionId?: Nullable<string>;
    tagId?: Nullable<string>;
}

export interface UserWhereInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    role?: Nullable<UserRole>;
    isActive?: Nullable<number>;
}

export interface UserWhereUniqueInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
}

export interface UserOrderByInput {
    id?: Nullable<OrderBy>;
    email?: Nullable<OrderBy>;
    username?: Nullable<OrderBy>;
    role?: Nullable<OrderBy>;
    isActive?: Nullable<OrderBy>;
}

export interface UserInsertInput {
    email: string;
    username?: Nullable<string>;
}

export interface UserUpdateInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
}

export interface IQuery {
    login(user: UserWhereUniqueInput, password: string): Nullable<User> | Promise<Nullable<User>>;
    logout(): Nullable<boolean> | Promise<Nullable<boolean>>;
    category(where: CategoryWhereUniqueInput): Nullable<Category> | Promise<Nullable<Category>>;
    categories(where: CategoryWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<CategoryOrderByInput>): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;
    countCategory(where: CategoryWhereInput): Nullable<number> | Promise<Nullable<number>>;
    tag(where: TagWhereUniqueInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    tags(where: TagWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<TagOrderByInput>): Nullable<Nullable<Tag>[]> | Promise<Nullable<Nullable<Tag>[]>>;
    countTag(where: TagWhereInput): Nullable<number> | Promise<Nullable<number>>;
    transaction(where: TransactionWhereUniqueInput): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    transactions(where: TransactionWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<TransactionOrderByInput>): Nullable<Nullable<Transaction>[]> | Promise<Nullable<Nullable<Transaction>[]>>;
    countTransaction(where: TransactionWhereInput): Nullable<number> | Promise<Nullable<number>>;
    transactionsTags(where?: Nullable<TransactionsTagsWhereUniqueInput>): Nullable<TransactionsTags> | Promise<Nullable<TransactionsTags>>;
    manyTransactionTags(where: TransactionsTagsWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<TransactionsTagsOrderByInput>): Nullable<Nullable<TransactionsTags>[]> | Promise<Nullable<Nullable<TransactionsTags>[]>>;
    countTransactionsTags(where: TransactionsTagsWhereInput): Nullable<number> | Promise<Nullable<number>>;
    me(): Nullable<User> | Promise<Nullable<User>>;
    user(where: UserWhereUniqueInput): Nullable<User> | Promise<Nullable<User>>;
    users(where: UserWhereInput, limit?: Nullable<number>, offset?: Nullable<number>, orderBy?: Nullable<UserOrderByInput>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    countUser(where: UserWhereInput): Nullable<number> | Promise<Nullable<number>>;
}

export interface IMutation {
    signUp(user: UserInsertInput, password: string): Nullable<User> | Promise<Nullable<User>>;
    insertCategory(category: CategoryInsertInput): Nullable<Category> | Promise<Nullable<Category>>;
    updateCategory(category: CategoryUpdateInput, where: CategoryWhereUniqueInput): Nullable<Category> | Promise<Nullable<Category>>;
    deleteCategory(where: CategoryWhereUniqueInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    insertTag(tag: TagInsertInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    updateTag(tag: TagUpdateInput, where: TagWhereUniqueInput): Nullable<Tag> | Promise<Nullable<Tag>>;
    deleteTag(where: TagWhereUniqueInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    insertTransaction(transaction: TransactionInsertInput): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    updateTransaction(transaction: TransactionUpdateInput, where: TransactionWhereUniqueInput): Nullable<Transaction> | Promise<Nullable<Transaction>>;
    deleteTransaction(where: TransactionWhereUniqueInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    insertTransactionsTags(transactionsTags: TransactionsTagsInsertInput): Nullable<TransactionsTags> | Promise<Nullable<TransactionsTags>>;
    updateTransactionsTags(where: TransactionsTagsWhereInput, transactionsTags: TransactionsTagsUpdateInput): Nullable<TransactionsTags> | Promise<Nullable<TransactionsTags>>;
    deleteTransactionsTags(where: TransactionsTagsWhereInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateUser(user: UserUpdateInput, where: UserWhereUniqueInput): Nullable<User> | Promise<Nullable<User>>;
    deleteUser(where: UserWhereUniqueInput): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface Category {
    id?: Nullable<string>;
    name?: Nullable<string>;
    isSystemDefined?: Nullable<number>;
    user?: Nullable<User>;
}

export interface Tag {
    id?: Nullable<string>;
    name?: Nullable<string>;
    isSystemDefined?: Nullable<number>;
    user?: Nullable<User>;
}

export interface Transaction {
    id?: Nullable<string>;
    description?: Nullable<string>;
    user?: Nullable<User>;
    date?: Nullable<DateTime>;
    amount?: Nullable<Decimal>;
    isExpense?: Nullable<number>;
    type?: Nullable<TransactionType>;
    category?: Nullable<Category>;
}

export interface TransactionsTags {
    id?: Nullable<string>;
    transaction?: Nullable<Transaction>;
    tag?: Nullable<Tag>;
}

export interface User {
    id?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    role?: Nullable<UserRole>;
    isActive?: Nullable<number>;
    transactions?: Nullable<Nullable<Transaction>[]>;
    categories?: Nullable<Nullable<Category>[]>;
    tags?: Nullable<Nullable<Tag>[]>;
}

export type DateTime = any;
export type Decimal = any;
type Nullable<T> = T | null;
