-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountNumber" TEXT NOT NULL,
    "amount" BIGINT NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- Insert sample data into Contract table
INSERT INTO "Contract" ("clientName", "email", "initialDate", "accountNumber", "amount", "currency") VALUES
('Kerry King', 'example@test.com','2024-08-08 19:30:49','00-0233-443',123330,'USD'),
('John Doe', 'john.doe@example.com', '2024-08-08 10:00:00', '00-0546-443', 100000, 'USD'),
('Jane Smith', 'jane.smith@example.com', '2024-08-01 14:30:00', '00-0547-443', 200000, 'EUR'),
('Alice Johnson', 'alice.johnson@example.com', '2024-08-08 09:00:00', '00-0548-443', 150000, 'GBP'),
('Bob Brown', 'bob.brown@example.com', '2024-08-08 16:45:00', '00-0547-443', 250000, 'USD'),
('Charlie Davis', 'charlie.davis@example.com', '2024-08-08 11:15:00', '00-0546-443', 300000, 'CAD');