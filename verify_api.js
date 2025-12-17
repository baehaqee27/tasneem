// Native fetch (Node 18+)
async function checkVerse() {
  try {
    const res = await fetch("https://quran-api.santrikoding.com/api/surah/9");
    if (!res.ok) {
      console.error("Failed to fetch:", res.status, res.statusText);
      return;
    }
    const data = await res.json();
    const verse = data.ayat.find((a) => a.nomor === 120);
    if (verse) {
      console.log("Verse 120 (ar):", verse.ar);
      console.log("Length:", verse.ar.length);
      console.log("Ends with:", verse.ar.slice(-20)); // show last 20 chars
    } else {
      console.log("Verse 120 not found");
    }
  } catch (err) {
    console.error(err);
  }
}

checkVerse();
