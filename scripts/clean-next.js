/* eslint-disable no-console */

const fs = require("node:fs")
const path = require("node:path")

function sleep(ms) {
  const buffer = new SharedArrayBuffer(4)
  const int32 = new Int32Array(buffer)
  Atomics.wait(int32, 0, 0, ms)
}

function removeWithRetries(targetPath, { retries = 8, delayMs = 120 } = {}) {
  if (!fs.existsSync(targetPath)) return true

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 0 })
      return true
    } catch (error) {
      const code = error?.code
      const lastAttempt = attempt === retries

      if (lastAttempt) {
        console.error(`[clean-next] Failed to remove ${targetPath}: ${error?.message ?? error}`)
        return false
      }

      if (code !== "ENOTEMPTY" && code !== "EPERM" && code !== "EBUSY") {
        console.warn(`[clean-next] Retry remove ${targetPath}: ${error?.message ?? error}`)
      }

      sleep(delayMs)
    }
  }

  return false
}

const root = process.cwd()

const okNext = removeWithRetries(path.join(root, ".next"))
const okTurbo = removeWithRetries(path.join(root, ".turbo"))

if (!okNext || !okTurbo) {
  console.error(
    [
      "[clean-next] Algunos archivos siguen bloqueados.",
      "Cierra el server de Next (Ctrl+C) y asegúrate de no tener otro `npm run dev` corriendo.",
      "Si sigue pasando, revisa antivirus/OneDrive/Indexing bloqueando la carpeta del proyecto.",
    ].join(" ")
  )
  console.error("[clean-next] Continuando de todas formas (best-effort).")
}
