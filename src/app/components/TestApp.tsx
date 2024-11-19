"use client";

async function apiTest() {
  const res = await fetch("/api/users");
  const data = await res.json();
  console.log(data);
}

apiTest();
export default function TestApp() {
  return (
    <div>
      <h1>Test App</h1>
    </div>
  );
}
