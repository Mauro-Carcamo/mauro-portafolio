/* eslint-disable no-console */

require("dotenv").config({ path: ".env.local" })

const { spawnSync } = require("node:child_process")

function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN
  if (!token) {
    console.error("[supabase] Missing env SUPABASE_ACCESS_TOKEN (create one in Supabase → Account → Access Tokens)")
    process.exit(1)
  }

  const result = spawnSync("npx", ["--yes", "supabase@latest", "login", "--token", token], {
    stdio: "inherit",
    shell: true,
  })
  process.exit(result.status ?? 1)
}

main()

