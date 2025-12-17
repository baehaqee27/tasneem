async function checkOldAudio() {
  try {
    const res = await fetch("https://quran-api.santrikoding.com/api/surah");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      console.log("Old Audio URL (Surah 1):", data[0].audio);
    }
  } catch (err) {
    console.error(err);
  }
}

checkOldAudio();
