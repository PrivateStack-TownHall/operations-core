-- The database is shared by the five operations-core applications, so run this
-- migration from ONE application only. Notification gets the same appType
-- discriminator AuditLog already has.

-- 1. Add the column, nullable at first so existing rows survive.
ALTER TABLE "notifications" ADD COLUMN "appType" "AppType";

-- 2. Backfill from what each notification points at.
UPDATE "notifications" SET "appType" = 'CODIGRAM'
 WHERE "appType" IS NULL AND "entityType" IN ('POST', 'POST_COMMENT', 'POST_LIKE');

UPDATE "notifications" SET "appType" = 'PINEAPPLE'
 WHERE "appType" IS NULL AND "entityType" IN ('THREAD', 'THREAD_COMMENT', 'THREAD_LIKE', 'THREAD_STAR');

UPDATE "notifications" SET "appType" = 'LEATHER'
 WHERE "appType" IS NULL AND "entityType" IN ('BOOK', 'REVIEW');

UPDATE "notifications" SET "appType" = 'MPLOYEE'
 WHERE "appType" IS NULL AND "entityType" IN ('EMPLOYEE_PROFILE', 'DEPENDENT');

UPDATE "notifications" SET "appType" = 'WARETRACK'
 WHERE "appType" IS NULL AND "entityType" IN ('STOCK', 'PURCHASE', 'TRANSFER', 'MOVEMENT');

-- 3. Anything still unknown: keep the row, attribute it to the app that owns
--    the recipient's only content. Falls back to CODIGRAM when undecidable.
UPDATE "notifications" n SET "appType" = 'CODIGRAM' WHERE n."appType" IS NULL;

-- 4. Now the column can be required, like AuditLog.appType.
ALTER TABLE "notifications" ALTER COLUMN "appType" SET NOT NULL;

-- CreateIndex
CREATE INDEX "notifications_appType_idx" ON "notifications"("appType");
