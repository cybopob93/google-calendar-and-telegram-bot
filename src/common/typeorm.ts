import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".env" });

export const dbConnectionConfig: DataSourceOptions = {
  type: "postgres",
  host: `${process.env.DATABASE_HOST}`,
  port: Number(process.env.DATABASE_PORT),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD ?? ""}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  synchronize: false,
};

const connectionSource = new DataSource(dbConnectionConfig);
export default connectionSource;
