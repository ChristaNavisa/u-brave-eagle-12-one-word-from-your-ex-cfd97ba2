import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Practice";

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function validateWord(word: string): void {
  if (word.length < 1 || word.length > 24) {
    throw new Error("entry must be 1 to 24 characters");
  }
  if (!word.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word");
  }
}

function writeEntry(outDir: string, word: string): string {
  validateWord(word);
  const entryPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(entryPath, word, "utf8");
  return entryPath;
}

const entryPath = writeEntry(resolveOutDir(), WORD);
console.log(`wrote ${WORD.length} characters to ${entryPath}`);
