import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const STORAGE_DIR = path.join(process.cwd(), "src", "data", "storage");

async function readList(fileName) {
  try {
    const raw = await readFile(path.join(STORAGE_DIR, fileName), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

async function writeList(fileName, items) {
  await mkdir(STORAGE_DIR, { recursive: true });
  await writeFile(path.join(STORAGE_DIR, fileName), JSON.stringify(items, null, 2), "utf8");
}

export async function appendRecord(fileName, record) {
  const items = await readList(fileName);
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "new",
    ...record,
  };
  items.unshift(entry);
  await writeList(fileName, items);
  return entry;
}
