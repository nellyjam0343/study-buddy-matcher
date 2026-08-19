/* ==========================================================================
   app.js — small shared helpers used by every page. No framework, no build.
   ========================================================================== */

// Talk to our backend Functions (the files in /functions/api/*).
async function api(path, options) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || ("Request failed: " + res.status));
  return data;
}

// Remember who is signed in on THIS phone/browser (simple, no passwords).
const store = {
  get profileId() { return localStorage.getItem("sb_profile_id"); },
  set profileId(v) { localStorage.setItem("sb_profile_id", v); },
  get name() { return localStorage.getItem("sb_name") || ""; },
  set name(v) { localStorage.setItem("sb_name", v); },
  clear() { localStorage.removeItem("sb_profile_id"); localStorage.removeItem("sb_name"); },
};

// Turn a timestamp into a short, friendly time.
function shortTime(ts) {
  try { return new Date(ts.replace(" ", "T") + "Z").toLocaleString(); }
  catch { return ts; }
}

// Register the service worker so the app can be installed on a phone.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
