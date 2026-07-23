async function testUpload() {
  const blob = new Blob(["test file content"], { type: "text/plain" });
  const formData = new FormData();
  formData.append("file", blob, "test_doc.pdf");
  formData.append("folder", "ppdb");

  const res = await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    body: formData,
  });

  console.log("Upload response status:", res.status);
  const data = await res.json();
  console.log("Upload response data:", data);

  if (data.success && data.localUrl) {
    const fileCheckLocal = await fetch(`http://localhost:3000${data.localUrl}`);
    console.log("Local route fetch status:", fileCheckLocal.status);
  }
}

testUpload();
