async function test() {
  const ports = [3000, 3001, 3002, 3200];
  for (const port of ports) {
    try {
      const res = await fetch(`http://localhost:${port}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "admin123" }),
      });
      console.log(`Port ${port} status:`, res.status);
      const text = await res.text();
      console.log(`Port ${port} response:`, text);
      console.log(`Port ${port} headers set-cookie:`, res.headers.get("set-cookie"));
    } catch (e: any) {
      console.log(`Port ${port} failed:`, e.message);
    }
  }
}

test();
