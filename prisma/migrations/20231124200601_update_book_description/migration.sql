-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT,
    "picture" TEXT,
    "pages" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("author", "created_at", "description", "id", "name", "pages", "picture", "updated_at") SELECT "author", "created_at", "description", "id", "name", "pages", "picture", "updated_at" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
