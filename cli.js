#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";
import Table from "cli-table3";
import figlet from "figlet";
import { fileURLToPath } from "url";
import cliProgress from "cli-progress";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

// === Welcome Banner ===
console.log(
  chalk.cyan(figlet.textSync("Elysia UI", { horizontalLayout: "default" }))
);
console.log(
  chalk.gray(
    "🌸 Beautifully Component UI Made With Radix UI And Tailwind CSS 🦊\n"
  )
);

const name = process.argv[2];
if (!name) {
  console.log(chalk.red("❌ Please provide a component name"));
  console.log(
    chalk.yellow("Usage: ") + chalk.cyan("npx elysia-ui <ComponentName>")
  );
  process.exit(1);
}

const compName = name.toLowerCase();
const srcFile = path.join(__dirname, "src", "components", `${compName}.tsx`);
const targetDir = path.join(cwd, "components");
const targetFile = path.join(
  targetDir,
  `${compName.charAt(0).toUpperCase() + compName.slice(1)}.${ext}`
);

// cek file template ada gak
if (!fs.existsSync(srcFile)) {
  console.log(
    chalk.red(`❌ Template for '${compName}.${ext}' not found in src/components`)
  );
  process.exit(1);
}

// pastikan folder components ada
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// === Progress Bar ===
const progressBar = new cliProgress.SingleBar(
  {
    format: chalk.cyan("🚀 Copying [{bar}] {percentage}% | {value}/{total}"),
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  },
  cliProgress.Presets.shades_classic
);

progressBar.start(100, 0);

let progress = 0;
const interval = setInterval(() => {
  progress += 20;
  progressBar.update(progress);

  if (progress >= 100) {
    clearInterval(interval);
    progressBar.stop();

    // copy file setelah progress selesai
    fs.copyFileSync(srcFile, targetFile);

    // CLI Table output
    const table = new Table({
      head: [
        chalk.green("Status"),
        chalk.blue("Component"),
        chalk.magenta("Destination"),
      ],
      colWidths: [10, 20, 50],
    });

    table.push([
      chalk.green("✅"),
      chalk.cyan(path.basename(targetFile, `.${ext}`)),
      chalk.gray(`components/${path.basename(targetFile)}`),
    ]);

    console.log(table.toString());
    console.log(
      chalk.bold.green(
        `✨ Component ${compName} copied to your project as .${ext}!`
      )
    );
  }
}, 200);