import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  index,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    gains: integer("gains").notNull().default(0),
    cash: integer("cash").notNull().default(0),
    referralCode: text("referral_code").notNull().unique(),
    referedBy: text("refered_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    isAdmin: boolean("is_admin").notNull().default(false),
    isDeleted: boolean("is_deleted").notNull().default(false),
    isActivated: boolean("is_activated").notNull().default(false),
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
      referralCodeIdx: index("referral_code_idx").on(table.referralCode),
    };
  }
);

export const tasksTable = pgTable(
  "tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    howTo: text("how_to"),
    gains: integer("gains").notNull(),
    duration: integer("duration"),
    category: text("category"),
    level: text("level"),
    multipleSubmissions: boolean("multiple_submissions")
      .notNull()
      .default(false),
    submissionDatatype: text("submission_datatype", {
      enum: ["text", "image", "video"],
    }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
      categoryIdx: index("category_idx").on(table.category),
      levelIdx: index("level_idx").on(table.level),
    };
  }
);

export const taskCompletionTable = pgTable(
  "task_completion",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasksTable.id),
    submissionData: text("submission_data").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    status: text("status", {
      enum: ["pending", "approved", "rejected"],
    })
      .notNull()
      .default("pending"),
    gainsAwarded: integer("gains_awarded"),
    verifierId: text("verifier_id").references(() => usersTable.id),
  },
  (table) => {
    return {
      userIdIdx: index("user_id_idx").on(table.userId),
      taskIdIdx: index("task_id_idx").on(table.taskId),
      statusIdx: index("status_idx").on(table.status),
    };
  }
);

export const transactionsTable = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    amount: integer("amount").notNull(),
    type: text("type", {
      enum: ["credit", "debit"],
    }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index("transaction_user_id_idx").on(table.userId),
      typeIdx: index("transaction_type_idx").on(table.type),
    };
  }
);

export const rafflesTable = pgTable(
  "raffles",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    entryGains: integer("entry_gains").notNull(),
    numberOfEntries: integer("number_of_entries").notNull(),
    limit: integer("limit"),
    winnerId: text("winner_id").references(() => usersTable.id),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    endDate: timestamp("end_date").notNull(),
  },
  (table) => {
    return {
      nameIdx: index("raffle_name_idx").on(table.name),
    };
  }
);

export const raffleEntriesTable = pgTable(
  "raffle_entries",
  {
    id: serial("id").primaryKey(),
    raffleId: integer("raffle_id")
      .notNull()
      .references(() => rafflesTable.id),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      raffleIdIdx: index("raffle_entry_raffle_id_idx").on(table.raffleId),
      userIdIdx: index("raffle_entry_user_id_idx").on(table.userId),
    };
  }
);

export const activitiesTable = pgTable(
  "activities",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    type: text("type").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index("activity_user_id_idx").on(table.userId),
      typeIdx: index("activity_type_idx").on(table.type),
    };
  }
);

export const userRelations = relations(usersTable, ({ many }) => ({
  completedTasks: many(taskCompletionTable, {
    relationName: "userCompletedTasks",
  }),
  verifiedTasks: many(taskCompletionTable, {
    relationName: "userVerifiedTasks",
  }),
  transactions: many(transactionsTable),
  raffleEntries: many(raffleEntriesTable),
  wonRaffles: many(rafflesTable),
  activities: many(activitiesTable),
}));

export const taskRelations = relations(tasksTable, ({ many }) => ({
  taskCompletions: many(taskCompletionTable),
}));

export const taskCompletionRelations = relations(
  taskCompletionTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [taskCompletionTable.userId],
      references: [usersTable.id],
      relationName: "userCompletedTasks",
    }),
    task: one(tasksTable, {
      fields: [taskCompletionTable.taskId],
      references: [tasksTable.id],
    }),
    verifier: one(usersTable, {
      fields: [taskCompletionTable.verifierId],
      references: [usersTable.id],
      relationName: "userVerifiedTasks",
    }),
  })
);

export const transactionRelations = relations(transactionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [transactionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const raffleRelations = relations(rafflesTable, ({ one, many }) => ({
  winner: one(usersTable, {
    fields: [rafflesTable.winnerId],
    references: [usersTable.id],
  }),
  entries: many(raffleEntriesTable),
}));

export const raffleEntryRelations = relations(
  raffleEntriesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [raffleEntriesTable.userId],
      references: [usersTable.id],
    }),
    raffle: one(rafflesTable, {
      fields: [raffleEntriesTable.raffleId],
      references: [rafflesTable.id],
    }),
  })
);

export const activityRelations = relations(activitiesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [activitiesTable.userId],
    references: [usersTable.id],
  }),
}));
