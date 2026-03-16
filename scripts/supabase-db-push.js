/* eslint-disable no-console */

const { spawnSync } = require("node:child_process")

function main() {
  const result = spawnSync("npx", ["--yes", "supabase@latest", "db", "push"], {
    stdio: "inherit",
    shell: true,
  })
  process.exit(result.status ?? 1)
}

main()

