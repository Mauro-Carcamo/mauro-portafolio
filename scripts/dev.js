/* eslint-disable no-console */

const { spawnSync, spawn } = require("node:child_process")
const net = require("node:net")

function checkPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once("error", () => resolve(false))
    server.once("listening", () => server.close(() => resolve(true)))
    server.listen(port, "127.0.0.1")
  })
}

async function main() {
  const clean = spawnSync("npm", ["run", "clean:next"], { stdio: "inherit", shell: true })
  if (clean.status !== 0) process.exit(clean.status ?? 1)

  const port = 3000
  const available = await checkPortAvailable(port)
  if (!available) {
    console.error(`[dev] El puerto ${port} está en uso. Cierra el proceso que lo está usando y vuelve a intentar.`)
    process.exit(1)
  }

  const child = spawn("npx", ["next", "dev", "-p", String(port)], { stdio: "inherit", shell: true })
  child.on("exit", (code) => process.exit(code ?? 0))
}

main().catch((error) => {
  console.error("[dev] Error:", error?.message ?? error)
  process.exit(1)
})

