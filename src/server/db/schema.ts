import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  boolean,
  index,
  pgEnum,
  serial,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Define enum types
export const submissionTypeEnum = pgEnum("submission_type", ["text", "image"]);
export const taskCompletionStatusEnum = pgEnum("task_completion_status", [
  "pending",
  "approved",
  "rejected",
]);
export const transactionTypeEnum = pgEnum("transaction_type", [
  "deposit",
  "withdrawal",
]);
export const raffleStatusEnum = pgEnum("raffle_status", [
  "active",
  "completed",
  "cancelled",
]);

export const taskStatusEnum = pgEnum("task_status", [
  "active",
  "completed",
  "cancelled",
]);

export const activityTypeEnum = pgEnum("activity_type", [
  "task_submitted",
  "raffle_entered",
  "gains_added",
  "cash_added",
  "referral",
  "raffle_won",
  "raffle_ended",
  "task_declined",
  "task_approved",
  "user_created",
  "user_updated",
  "cash_withdrawn",
  "gains_withdrawn",
]);

export const taskLevels = pgEnum("task_levels", [
  "easy",
  "medium",
  "hard",
  "expert",
]);

export const taskCategories = pgEnum("task_categories", [
  "social",
  "video",
  "audio",
  "image",
  "blog",
  "quiz",
  "survey",
  "other",
]);

export const usersTable = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    gains: integer("gains").notNull().default(0),
    cash: integer("cash").notNull().default(0),
    currency: text("currency").notNull().default("GHS"),
    referralCode: text("referral_code").notNull(),
    referredBy: text("referred_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    isAdmin: boolean("is_admin").notNull().default(false),
    isDeleted: boolean("is_deleted").notNull().default(false),
    isActivated: boolean("is_activated").notNull().default(false),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
    referralCodeIdx: uniqueIndex("referral_code_idx").on(table.referralCode),
    createdAtIdx: index("user_created_at_idx").on(table.createdAt),
  })
);

export const tasksTable = pgTable(
  "tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    howTo: text("how_to"),
    guideImageUrl: text("guide_image_url"),
    gains: integer("gains").notNull(),
    duration: integer("duration"),
    category: taskCategories("category"),
    taskLevel: taskLevels("task_level"),
    taskLimit: integer("task_limit"),
    status: taskStatusEnum("status").notNull().default("active"),
    multipleSubmissions: boolean("multiple_submissions")
      .notNull()
      .default(false),
    submissionType: submissionTypeEnum("submission_type").notNull(),
    createdBy: text("created_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    nameIdx: index("task_name_idx").on(table.name),
    categoryLevelIdx: index("task_category_level_idx").on(
      table.category,
      table.taskLevel
    ),
    createdAtIdx: index("task_created_at_idx").on(table.createdAt),
  })
);

export const taskCompletionsTable = pgTable(
  "task_completions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasksTable.id),
    submissionData: text("submission_data").notNull(),
    submissionType: submissionTypeEnum("submission_type").notNull(),
    taskStatus: taskCompletionStatusEnum("task_status")
      .notNull()
      .default("pending"),
    verifierId: text("verifier_id").references(() => usersTable.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userTaskIdx: index("user_task_idx").on(table.userId, table.taskId),
    statusCreatedAtIdx: index("status_created_at_idx").on(
      table.taskStatus,
      table.createdAt
    ),
  })
);

export const rafflesTable = pgTable(
  "raffles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    entryGains: integer("entry_gains").notNull(),
    numberOfEntries: integer("number_of_entries").notNull(),
    limit: integer("limit"),
    winnerId: text("winner_id").references(() => usersTable.id),
    imageUrl: text("image_url"),
    status: raffleStatusEnum("status").notNull().default("active"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    endDate: timestamp("end_date").notNull(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    statusEndDateIdx: index("raffle_status_end_date_idx").on(
      table.status,
      table.endDate
    ),
    createdAtIdx: index("raffle_created_at_idx").on(table.createdAt),
  })
);

export const raffleEntriesTable = pgTable(
  "raffle_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    raffleId: uuid("raffle_id")
      .notNull()
      .references(() => rafflesTable.id),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    raffleUserIdx: uniqueIndex("raffle_user_idx").on(
      table.raffleId,
      table.userId
    ),
    createdAtIdx: index("raffle_entry_created_at_idx").on(table.createdAt),
  })
);

export const transactionsTable = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    amount: integer("amount").notNull(),
    type: transactionTypeEnum("type").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userTypeCreatedAtIdx: index("transaction_user_type_created_at_idx").on(
      table.userId,
      table.type,
      table.createdAt
    ),
  })
);

export const activitiesTable = pgTable(
  "activities",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    type: activityTypeEnum("type").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userTypeCreatedAtIdx: index("activity_user_type_created_at_idx").on(
      table.userId,
      table.type,
      table.createdAt
    ),
  })
);

// Relations
export const userRelations = relations(usersTable, ({ many, one }) => ({
  completedTasks: many(taskCompletionsTable, {
    relationName: "userTaskCompletion",
  }),
  verifiedTasks: many(taskCompletionsTable, {
    relationName: "verifierTaskCompletion",
  }),
  transactions: many(transactionsTable, { relationName: "userTransactions" }),
  raffleEntries: many(raffleEntriesTable, {
    relationName: "userRaffleEntries",
  }),
  wonRaffles: many(rafflesTable, { relationName: "raffleWinner" }),
  activities: many(activitiesTable, { relationName: "userActivities" }),
  referrer: one(usersTable, {
    fields: [usersTable.referredBy],
    references: [usersTable.referralCode],
    relationName: "referralUser",
  }),
}));

export const taskRelations = relations(tasksTable, ({ many, one }) => ({
  completions: many(taskCompletionsTable, { relationName: "taskCompletions" }),
}));

export const taskCompletionRelations = relations(
  taskCompletionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [taskCompletionsTable.userId],
      references: [usersTable.id],
      relationName: "userTaskCompletion",
    }),
    task: one(tasksTable, {
      fields: [taskCompletionsTable.taskId],
      references: [tasksTable.id],
      relationName: "taskCompletions",
    }),
    verifier: one(usersTable, {
      fields: [taskCompletionsTable.verifierId],
      references: [usersTable.id],
      relationName: "verifierTaskCompletion",
    }),
  })
);

export const raffleRelations = relations(rafflesTable, ({ one, many }) => ({
  winner: one(usersTable, {
    fields: [rafflesTable.winnerId],
    references: [usersTable.id],
    relationName: "raffleWinner",
  }),
  entries: many(raffleEntriesTable, { relationName: "raffleEntries" }),
}));

export const raffleEntryRelations = relations(
  raffleEntriesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [raffleEntriesTable.userId],
      references: [usersTable.id],
      relationName: "userRaffleEntries",
    }),
    raffle: one(rafflesTable, {
      fields: [raffleEntriesTable.raffleId],
      references: [rafflesTable.id],
      relationName: "raffleEntries",
    }),
  })
);

export const transactionRelations = relations(transactionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [transactionsTable.userId],
    references: [usersTable.id],
    relationName: "userTransactions",
  }),
}));

export const activityRelations = relations(activitiesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [activitiesTable.userId],
    references: [usersTable.id],
    relationName: "userActivities",
  }),
}));
