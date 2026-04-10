import path from "path";
const config = ({ env }) => {
    const sqliteFilename = path.join(__dirname, "..", "..", env("DATABASE_FILENAME", ".tmp/data.db"));
    const client = env("DATABASE_CLIENT", "sqlite");
    if (client === "postgres") {
        return {
            connection: {
                client: "postgres",
                connection: {
                    connectionString: env("DATABASE_URL"),
                    host: env("DATABASE_HOST", "localhost"),
                    port: env.int("DATABASE_PORT", 5432),
                    database: env("DATABASE_NAME", "strapi"),
                    user: env("DATABASE_USERNAME", "strapi"),
                    password: env("DATABASE_PASSWORD", "strapi"),
                    ssl: env.bool("DATABASE_SSL", false),
                    schema: env("DATABASE_SCHEMA", "public"),
                },
                pool: {
                    min: env.int("DATABASE_POOL_MIN", 2),
                    max: env.int("DATABASE_POOL_MAX", 10),
                },
            },
        };
    }
    return {
        connection: {
            client: "sqlite",
            connection: {
                filename: sqliteFilename,
            },
            useNullAsDefault: true,
        },
    };
};
export default config;
