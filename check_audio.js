async function check() {
  try {
    const res = await fetch("https://quran-api.santrikoding.com/api/surah/1");
    const data = await res.json();
    console.log("API Audio:", data.audio);

    const generated = "https://server8.mp3quran.net/afs/001.mp3";
    console.log("Generated:", generated);

    const checkRes = await fetch(generated, { method: "HEAD" });
    console.log("Generated Status:", checkRes.status);
    console.log("Content-Type:", checkRes.headers.get("content-type"));
    console.log("CORS:", checkRes.headers.get("access-control-allow-origin"));
  } catch (e) {
    console.error(e);
  }
}

check();
