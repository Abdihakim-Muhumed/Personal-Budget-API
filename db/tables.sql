CREATE TABLE "envelopes" (
  "id" integer PRIMARY KEY,
  "title" varchar(20),
  "allocated_budget" money,
  "balance" money,
  "followed_user_id" integer,
  "created_at" timestamp
);

CREATE TABLE "transactions" (
  "id" integer PRIMARY KEY,
  "date" date,
  "amount" money,
  "envelope_id" integer,
  "reciepient" varchar(20)
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");
