const STATE_KEY = "bs_shared_state_v1";

async function kvCommand(command) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return { ok: false, missingConfig: true };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`KV request failed: ${response.status}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "GET") {
      const data = await kvCommand(["GET", STATE_KEY]);
      if (data.missingConfig) {
        return res.status(503).json({ error: "KV is not configured" });
      }

      const state = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
      return res.status(200).json(state || null);
    }

    if (req.method === "PUT") {
      const state = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!state || !Array.isArray(state.teams) || !Array.isArray(state.rounds) || !Array.isArray(state.presentTeamIds)) {
        return res.status(400).json({ error: "Invalid tournament state" });
      }

      const nextState = { ...state, updatedAt: Date.now() };
      const data = await kvCommand(["SET", STATE_KEY, JSON.stringify(nextState)]);
      if (data.missingConfig) {
        return res.status(503).json({ error: "KV is not configured" });
      }

      return res.status(200).json(nextState);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "State API error" });
  }
}
