async function testFlow() {
  const loginRes = await fetch("http://localhost:3000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" }),
  });
  console.log("Login Status:", loginRes.status);
  const cookieHeader = loginRes.headers.get("set-cookie");
  console.log("Cookie received:", cookieHeader);

  if (!cookieHeader) {
    console.log("NO COOKIE RECEIVED!");
    return;
  }

  // Extract admin_token value
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  const token = match ? match[1] : "";
  console.log("Extracted token:", token);

  // Now call /api/admin/me with this cookie
  const meRes = await fetch("http://localhost:3000/api/admin/me", {
    headers: {
      Cookie: `admin_token=${token}`,
    },
  });
  console.log("Me Status:", meRes.status);
  const meData = await meRes.json();
  console.log("Me Data:", meData);
}

testFlow();
