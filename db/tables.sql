CREATE TABLE "envelopes" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(20) UNIQUE,
  "allocated_budget" money CHECK(allocated_budget > balance),
  "balance" money,
  "created_at" timestamp
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "date" date,
  "amount" money,
  "envelope_id" integer NOT NULL,
  "reciepient" varchar(20)
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");
