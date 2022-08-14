export const {
  MARIADB_HOST,
  MARIADB_DATABASE,
  MARIADB_USER,
  MARIADB_PASSWORD,
} = process.env;

export const MARIADB_PORT =
  Number.parseInt(process.env.MARIADB_PORT, 10) || 3306;
