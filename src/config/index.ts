import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? ".env.development.local"
      : ".env.local",
});

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 4000,
};

export default config;
