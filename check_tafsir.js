async function check() {
  try {
    const res = await fetch("https://quran-api.santrikoding.com/api/surah/1");
    const data = await res.json();
    console.log("Ayat 1 keys:", Object.keys(data.ayat[0]));
    console.log("Ayat 1 sample:", JSON.stringify(data.ayat[0], null, 2));
  } catch (e) {
    console.error(e);
  }
}

check();
