/* eslint-disable no-console */

require("dotenv").config({ path: ".env.local" })

const { spawnSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

function main() {
  const linkPath = path.join(process.cwd(), "supabase", ".temp", "project-ref")
  const isLinked = fs.existsSync(linkPath)

  if (!isLinked) {
    const link = spawnSync("node", ["scripts/supabase-link.js"], { stdio: "inherit", shell: true })
    if (link.status !== 0) process.exit(link.status ?? 1)
  }

  const result = spawnSync("npx", ["--yes", "supabase@latest", "db", "push"], {
    stdio: "inherit",
    shell: true,
  })
  process.exit(result.status ?? 1)
}

main()
