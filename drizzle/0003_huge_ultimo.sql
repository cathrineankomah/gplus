ALTER TABLE "activities" DROP CONSTRAINT "activities_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "raffle_entries" DROP CONSTRAINT "raffle_entries_raffle_id_raffles_id_fk";
--> statement-breakpoint
ALTER TABLE "raffle_entries" DROP CONSTRAINT "raffle_entries_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "raffles" DROP CONSTRAINT "raffles_winner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "task_completions" DROP CONSTRAINT "task_completions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "task_completions" DROP CONSTRAINT "task_completions_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "task_completions" DROP CONSTRAINT "task_completions_verifier_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raffle_entries" ADD CONSTRAINT "raffle_entries_raffle_id_raffles_id_fk" FOREIGN KEY ("raffle_id") REFERENCES "public"."raffles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raffle_entries" ADD CONSTRAINT "raffle_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raffles" ADD CONSTRAINT "raffles_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_completions" ADD CONSTRAINT "task_completions_verifier_id_users_id_fk" FOREIGN KEY ("verifier_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
