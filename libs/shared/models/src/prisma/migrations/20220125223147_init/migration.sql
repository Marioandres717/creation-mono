-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `username` VARCHAR(20) NULL,
    `isActive` TINYINT NULL DEFAULT 1,
    `password` VARCHAR(80) NULL,
    `role` ENUM('admin', 'basic') NULL DEFAULT 'basic',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `username_UNIQUE`(`username`),
    PRIMARY KEY (`id`, `email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `category_userId_idx`(`userId`),
    PRIMARY KEY (`id`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `tag_userId_idx`(`userId`),
    PRIMARY KEY (`id`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(36) NOT NULL,
    `description` VARCHAR(250) NULL,
    `userId` VARCHAR(36) NOT NULL,
    `date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `amount` DECIMAL(11, 3) NOT NULL DEFAULT 0.000,
    `isExpense` TINYINT NULL DEFAULT 1,
    `type` ENUM('cash', 'cheque', 'pending') NULL DEFAULT 'cash',
    `categoryId` VARCHAR(36) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `transaction_categoryId_idx`(`categoryId`),
    INDEX `transaction_userId_idx`(`userId`),
    PRIMARY KEY (`id`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionsTags` (
    `id` VARCHAR(36) NOT NULL,
    `transactionId` VARCHAR(36) NOT NULL,
    `tagId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `trans_tags_tagId_idx`(`tagId`),
    INDEX `trans_tags_transactionId_idx`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `category_userId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `tag_userId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `transaction_categoryId` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `transaction_userId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TransactionsTags` ADD CONSTRAINT `trans_tags_tagId` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TransactionsTags` ADD CONSTRAINT `trans_tags_transactionId` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
