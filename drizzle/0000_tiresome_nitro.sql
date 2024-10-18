CREATE TYPE "public"."activity_type" AS ENUM('task_submitted', 'raffle_entered', 'gains_added', 'cash_added', 'referral', 'raffle_won', 'raffle_ended', 'task_declined', 'task_approved', 'user_created', 'user_updated', 'cash_withdrawn', 'gains_withdrawn');--> statement-breakpoint
CREATE TYPE "public"."raffle_status" AS ENUM('active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."submission_type" AS ENUM('text', 'image');--> statement-breakpoint
CREATE TYPE "public"."task_categories" AS ENUM('social', 'video', 'audio', 'image', 'blog', 'quiz', 'survey', 'other');--> statement-breakpoint
CREATE TYPE "public"."task_completion_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."task_levels" AS ENUM('easy', 'medium', 'hard', 'expert');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('deposit', 'withdrawal');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "activity_type" NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raffle_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"raffle_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raffles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"entry_gains" integer NOT NULL,
	"number_of_entries" integer NOT NULL,
	"limit" integer,
	"winner_id" text,
	"image_url" text,
	"status" "raffle_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_completions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"task_id" uuid NOT NULL,
	"submission_data" text NOT NULL,
	"submission_type" "submission_type" NOT NULL,
	"task_status" "task_completion_status" DEFAULT 'pending' NOT NULL,
	"verifier_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"how_to" text,
	"guide_image_url" text,
	"gains" integer NOT NULL,
	"duration" integer,
	"category" "task_categories",
	"task_level" "task_levels",
	"task_limit" integer,
	"status" "task_status" DEFAULT 'active' NOT NULL,
	"multiple_submissions" boolean DEFAULT false NOT NULL,
	"submission_type" "submission_type" NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"type" "transaction_type" NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"gains" integer DEFAULT 0 NOT NULL,
	"cash" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'GHS' NOT NULL,
	"referral_code" text NOT NULL,
	"referred_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_activated" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raffle_entries" ADD CONSTRAINT "raffle_entries_raffle_id_raffles_id_fk" FOREIGN KEY ("raffle_id") REFERENCES "public"."raffles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raffle_entries" ADD CONSTRAINT "raffle_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raffles" ADD CONSTRAINT "raffles_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_verifier_id_users_id_fk" FOREIGN KEY ("verifier_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "activity_user_type_created_at_idx" ON "activities" USING btree ("user_id","type","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "raffle_user_idx" ON "raffle_entries" USING btree ("raffle_id","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "raffle_entry_created_at_idx" ON "raffle_entries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "raffle_status_end_date_idx" ON "raffles" USING btree ("status","end_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "raffle_created_at_idx" ON "raffles" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_task_idx" ON "task_completions" USING btree ("user_id","task_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "status_created_at_idx" ON "task_completions" USING btree ("task_status","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_name_idx" ON "tasks" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_category_level_idx" ON "tasks" USING btree ("category","task_level");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_created_at_idx" ON "tasks" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transaction_user_type_created_at_idx" ON "transactions" USING btree ("user_id","type","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "referral_code_idx" ON "users" USING btree ("referral_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_created_at_idx" ON "users" USING btree ("created_at");