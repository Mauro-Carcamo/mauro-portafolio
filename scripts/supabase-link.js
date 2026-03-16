/* eslint-disable no-console */

const { spawnSync } = require("node:child_process")

function main() {
  const ref = process.env.SUPABASE_PROJECT_REF
  if (!ref) {
    console.error("[supabase] Missing env SUPABASE_PROJECT_REF (add it to .env.local)")
    process.exit(1)
  }

  const result = spawnSync(
    "npx",
    ["--yes", "supabase@latest", "link", "--project-ref", ref],
    { stdio: "inherit", shell: true }
  )
  process.exit(result.status ?? 1)
}

main()

