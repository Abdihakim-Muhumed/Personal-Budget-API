CREATE TABLE "envelopes" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(20) UNIQUE,
  "allocated_budget" money,
  "balance" money CHECK(balance <= allocated_budget),
  "created_at" timestamp DEFAULT now()
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "date" date DEFAULT CURRENT_DATE,
  "amount" money,
  "envelope_id" integer NOT NULL,
  "reciepient" varchar(20)
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");
