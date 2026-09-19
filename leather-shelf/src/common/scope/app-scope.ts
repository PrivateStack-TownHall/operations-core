import { AppType } from '@prisma/client';

/**
 * This backend shares one database with the other operations-core
 * applications. Domain models are already separate (posts, threads, books,
 * ...), but AuditLog, Notification and User are shared tables, so those
 * queries must say which application they mean.
 */
export const APP_TYPE = AppType.LEATHER;

/** AuditLog and Notification carry appType, exactly like commerce-core. */
export const appScope = { appType: APP_TYPE };

/**
 * User has no appType on purpose: one person can take part in several
 * applications. "Users of this application" therefore means users who have
 * something here.
 */
export const usersOfThisApp = { reviews: { some: {} } };
