/* eslint-disable no-console */

require("dotenv").config({ path: ".env.local" })

const { spawnSync } = require("node:child_process")

function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN
  const ref = process.env.SUPABASE_PROJECT_REF
  if (!ref) {
    console.error("[supabase] Missing env SUPABASE_PROJECT_REF (add it to .env.local)")
    process.exit(1)
  }

  if (!token) {
    console.error("[supabase] Missing env SUPABASE_ACCESS_TOKEN (needed for non-interactive linking)")
    process.exit(1)
  }

  const login = spawnSync("npx", ["--yes", "supabase@latest", "login", "--token", token], {
    stdio: "inherit",
    shell: true,
  })
  if (login.status !== 0) process.exit(login.status ?? 1)

  const result = spawnSync(
    "npx",
    ["--yes", "supabase@latest", "link", "--project-ref", ref],
    { stdio: "inherit", shell: true }
  )
  process.exit(result.status ?? 1)
}

main()
