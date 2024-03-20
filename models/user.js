const userSchema = `CREATE TABLE IF NOT EXISTS users (
    userId UUID PRIMARY KEY DEFAULT uuidgenerate_v4(),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
