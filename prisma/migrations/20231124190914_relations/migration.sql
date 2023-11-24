/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Book` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "CategoryByBook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "CategoryByBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoryByBook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_readBooksByUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "starts" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "lastTimeRead" DATETIME NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    CONSTRAINT "readBooksByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "readBooksByUser_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_readBooksByUser" ("bookId", "created_at", "description", "id", "isFavorite", "lastTimeRead", "starts", "userId") SELECT "bookId", "created_at", "description", "id", "isFavorite", "lastTimeRead", "starts", "userId" FROM "readBooksByUser";
DROP TABLE "readBooksByUser";
ALTER TABLE "new_readBooksByUser" RENAME TO "readBooksByUser";
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT,
    "pages" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("author", "created_at", "description", "id", "name", "pages", "picture", "updated_at") SELECT "author", "created_at", "description", "id", "name", "pages", "picture", "updated_at" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "mostReadCategoryId" TEXT,
    CONSTRAINT "User_mostReadCategoryId_fkey" FOREIGN KEY ("mostReadCategoryId") REFERENCES "mostReadCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatar", "created_at", "id", "name", "password", "updated_at") SELECT "avatar", "created_at", "id", "name", "password", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "mostReadCategoryId" TEXT,
    CONSTRAINT "Category_mostReadCategoryId_fkey" FOREIGN KEY ("mostReadCategoryId") REFERENCES "mostReadCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
