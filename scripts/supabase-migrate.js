/* eslint-disable no-console */

const fs = require("node:fs")
const path = require("node:path")
const { Client } = require("pg")

function listSqlMigrations(migrationsDir) {
  if (!fs.existsSync(migrationsDir)) return []

  return fs
    .readdirSync(migrationsDir)
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({
      name,
      fullPath: path.join(migrationsDir, name),
      sql: fs.readFileSync(path.join(migrationsDir, name), "utf8"),
    }))
}

async function ensureMigrationsTable(client) {
  await client.query(`
    create table if not exists public.schema_migrations (
      id text primary key,
      applied_at timestamptz not null default now()
    );
  `)
}

async function getAppliedMigrations(client) {
  const { rows } = await client.query(`select id from public.schema_migrations order by id asc;`)
  return new Set(rows.map((r) => r.id))
}

async function applyMigration(client, migration) {
  console.log(`[db:migrate] Applying ${migration.name}...`)

  await client.query("begin;")
  try {
    await client.query(migration.sql)
    await client.query(`insert into public.schema_migrations (id) values ($1) on conflict do nothing;`, [
      migration.name,
    ])
    await client.query("commit;")
    console.log(`[db:migrate] Applied ${migration.name}`)
  } catch (error) {
    await client.query("rollback;")
    console.error(`[db:migrate] Failed ${migration.name}: ${error?.message ?? error}`)
    throw error
  }
}

async function main() {
  const ref = process.env.SUPABASE_PROJECT_REF
  const dbPassword = process.env.SUPABASE_DB_PASSWORD

  const databaseUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    (ref && dbPassword
      ? `postgresql://${encodeURIComponent(process.env.SUPABASE_DB_USER || "postgres")}:${encodeURIComponent(
          dbPassword
        )}@${process.env.SUPABASE_DB_HOST || `db.${ref}.supabase.co`}:${process.env.SUPABASE_DB_PORT || "5432"}/${
          process.env.SUPABASE_DB_NAME || "postgres"
        }`
      : "")

  if (!databaseUrl) {
    console.error("[db:migrate] Missing env DATABASE_URL")
    console.error("[db:migrate] Alternatively set SUPABASE_PROJECT_REF + SUPABASE_DB_PASSWORD")
    console.error("[db:migrate] Or, if using the Vercel Supabase integration, use POSTGRES_URL_NON_POOLING/POSTGRES_URL")
    console.error("[db:migrate] Example:")
    console.error('  SUPABASE_PROJECT_REF="cudarempmhzytuivpemw"')
    console.error('  SUPABASE_DB_PASSWORD="YOUR_PASSWORD"')
    console.error('  pnpm db:migrate')
    process.exit(1)
  }

  const migrationsDir = path.join(process.cwd(), "supabase", "migrations")
  const migrations = listSqlMigrations(migrationsDir)
  if (migrations.length === 0) {
    console.log("[db:migrate] No SQL migrations found in supabase/migrations")
    return
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  })

  await client.connect()
  try {
    await ensureMigrationsTable(client)
    const applied = await getAppliedMigrations(client)

    const pending = migrations.filter((m) => !applied.has(m.name))
    if (pending.length === 0) {
      console.log("[db:migrate] No pending migrations.")
      return
    }

    console.log(`[db:migrate] Pending migrations: ${pending.map((m) => m.name).join(", ")}`)
    for (const migration of pending) {
      // eslint-disable-next-line no-await-in-loop
      await applyMigration(client, migration)
    }
  } finally {
    await client.end()
  }
}

main().catch(() => process.exit(1))
