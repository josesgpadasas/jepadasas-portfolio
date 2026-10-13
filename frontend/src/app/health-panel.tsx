async function fetchHealth() {
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api/v1";
  try {
    const res = await fetch(`${base}/health`, { cache: "no-store" });
    if (!res.ok) {
      return { error: `HTTP ${res.status}` };
    }
    return (await res.json()) as Record<string, unknown>;
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to reach API",
    };
  }
}

export async function HealthPanel() {
  const health = await fetchHealth();

  return (
    <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm text-zinc-100">
      {JSON.stringify(health, null, 2)}
    </pre>
  );
}
