import { pgTable, text, integer, real, timestamp, boolean, uuid, pgEnum, primaryKey } from 'drizzle-orm/pg-core';

// Status enum for keywords
export const keywordStatusEnum = pgEnum('keyword_status', [
  'PENDING',      // Just created, waiting for first processing
  'PROCESSING',   // Currently being processed  
  'ACTIVE',       // Active and working normally
  'ERROR',        // Error in last processing
  'PAUSED',       // Paused by user or system
  'RATE_LIMITED', // API rate limit reached
]);

export const plans = pgTable('plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  displayName: text('display_name').notNull(),
  maxProjects: integer('max_projects'),
  maxKeywords: integer('max_keywords'),
  updateFrequency: text('update_frequency').notNull(),
  price: real('price').notNull().default(0),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  planId: uuid('plan_id').notNull().references(() => plans.id),
  
  // Email verification
  emailVerified: boolean('email_verified').notNull().default(false),
  emailVerificationCode: text('email_verification_code'),
  emailVerificationExpiresAt: timestamp('email_verification_expires_at'),
  
  // Security fields
  loginAttempts: integer('login_attempts').notNull().default(0),
  lockedUntil: timestamp('locked_until'),
  lastLoginAt: timestamp('last_login_at'),
  lastLoginIp: text('last_login_ip'),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  domain: text('domain').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const keywords = pgTable('keywords', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  keyword: text('keyword').notNull(),
  location: text('location').notNull().default('Brazil'),
  language: text('language').notNull().default('pt'),
  manualCheckUsed: boolean('manual_check_used').notNull().default(false),
  
  // Status tracking fields
  status: keywordStatusEnum('status').notNull().default('PENDING'),
  lastCheckedAt: timestamp('last_checked_at'),
  nextCheckAt: timestamp('next_check_at'),
  processingStartedAt: timestamp('processing_started_at'),
  errorMessage: text('error_message'),
  checkCount: integer('check_count').notNull().default(0),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const rankings = pgTable('rankings', {
  id: uuid('id').primaryKey().defaultRandom(),
  keywordId: uuid('keyword_id').notNull().references(() => keywords.id, { onDelete: 'cascade' }),
  position: integer('position'),
  url: text('url'),
  title: text('title'),
  snippet: text('snippet'),
  checkedAt: timestamp('checked_at').notNull().defaultNow(),
});

export const passwordResetCodes = pgTable('password_reset_codes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  code: text('code').notNull(), // 6 digit code
  email: text('email').notNull(), // store email for verification
  expiresAt: timestamp('expires_at').notNull(),
  used: boolean('used').notNull().default(false),
  attempts: integer('attempts').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Keep old table name as alias for backwards compatibility
export const passwordResetTokens = passwordResetCodes;

// Rate limiting table
export const rateLimits = pgTable('rate_limits', {
  id: uuid('id').primaryKey().defaultRandom(),
  identifier: text('identifier').notNull(), // IP address or user ID
  action: text('action').notNull(), // login, register, forgot-password, etc.
  attempts: integer('attempts').notNull().default(1),
  windowStart: timestamp('window_start').notNull().defaultNow(),
  blockedUntil: timestamp('blocked_until'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Security audit log
export const securityLogs = pgTable('security_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  action: text('action').notNull(), // login, logout, password_change, etc.
  success: boolean('success').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  details: text('details'), // JSON string with additional info
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Schemas removidos temporariamente para evitar problemas de build

// Auth.js tables (imported from auth-schema.ts for Drizzle adapter)
export const authUsers = pgTable('auth_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (account) => ({
  compositePk: primaryKey({
    columns: [account.provider, account.providerAccountId]
  })
}));

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id').notNull(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
}, (vt) => ({
  compositePk: primaryKey({
    columns: [vt.identifier, vt.token]
  })
}));

// Auth.js schemas removidos temporariamente