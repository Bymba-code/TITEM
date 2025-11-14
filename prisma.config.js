const { defineConfig, env } = require("prisma/config");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});