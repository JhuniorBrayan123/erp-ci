const express = require("express");
const { Pool } = require("pg");
const Redis = require("ioredis");

const app = express();
app.use(express.json());

const APP_ENV = process.env.APP_ENV || "local";
const APP_VERSION = process.env.APP_VERSION || "local";
const PORT = Number(process.env.PORT || 3000);

const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_URL = process.env.REDIS_URL;

let pgPool;
let redis;

function safeLogConfig() {
  console.log(`[boot] APP_ENV=${APP_ENV} APP_VERSION=${APP_VERSION} PORT=${PORT}`);
  console.log(`[boot] DATABASE_URL=${DATABASE_URL ? "[set]" : "[missing]"}`);
  console.log(`[boot] REDIS_URL=${REDIS_URL ? "[set]" : "[missing]"}`);
}

async function initConnections() {
  if (!DATABASE_URL) throw new Error("DATABASE_URL missing");
  if (!REDIS_URL) throw new Error("REDIS_URL missing");

  pgPool = new Pool({ connectionString: DATABASE_URL });
  redis = new Redis(REDIS_URL);

  // quick warm-up checks
  await pgPool.query("SELECT 1 as ok");
  await redis.ping();
}

app.get("/api/health", async (_req, res) => {
  res.json({ ok: true, env: APP_ENV, version: APP_VERSION, time: new Date().toISOString() });
});

app.get("/api/db-check", async (_req, res) => {
  try {
    const r = await pgPool.query("SELECT NOW() as now");
    res.json({ ok: true, now: r.rows?.[0]?.now, env: APP_ENV });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.get("/api/redis-check", async (_req, res) => {
  try {
    const key = `erp2:${APP_ENV}:ping`;
    await redis.set(key, String(Date.now()), "EX", 30);
    const v = await redis.get(key);
    res.json({ ok: true, key, value: v, env: APP_ENV });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.listen(PORT, async () => {
  safeLogConfig();
  try {
    await initConnections();
    console.log("[boot] connected to postgres + redis ✅");
  } catch (e) {
    console.error("[boot] connection error ❌", e);
  }
});
