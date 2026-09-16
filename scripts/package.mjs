// Creates deploy/sjec-site.zip for Hostinger's "Upload your website files"
// option: the source tree without node_modules, build output, the local
// database or reference material. Hostinger installs and builds it.
//
// Uses bsdtar (tar.exe ships with Windows 10+ and macOS), which writes
// forward-slash paths. PowerShell's Compress-Archive writes backslashes,
// which break when the archive is unpacked on Hostinger's Linux servers.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "deploy");
const zip = path.join(outDir, "sjec-site.zip");

const include = [
  "src", "public", "scripts", "drizzle",
  "package.json", "package-lock.json", "next.config.ts", "tsconfig.json",
  "postcss.config.mjs", "eslint.config.mjs", "drizzle.config.ts", "next-env.d.ts",
].filter((p) => fs.existsSync(path.join(root, p)));

fs.mkdirSync(outDir, { recursive: true });
fs.rmSync(zip, { force: true });

const tar = process.platform === "win32" ? path.join(process.env.SystemRoot ?? "C:\Windows", "System32", "tar.exe") : "tar";
execFileSync(tar, ["-a", "-c", "-f", zip, ...include], { cwd: root, stdio: "inherit" });

console.log(`Created ${path.relative(root, zip)} (${(fs.statSync(zip).size / 1024 / 1024).toFixed(2)} MB)`);
