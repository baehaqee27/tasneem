async function checkEQuran() {
  try {
    const res = await fetch("https://equran.id/api/v2/surat/9");
    const data = await res.json();
    if (data.data) {
      const verse = data.data.ayat.find((a) => a.nomorAyat === 120);
      console.log("Verse 120 (ar):", verse.teksArab);
      console.log("Ends with:", verse.teksArab.slice(-20));
      console.log("Transliteration (Latin):", verse.teksLatin);
      console.log("Translation (ID):", verse.teksIndonesia);
      console.log("Audio Full:", data.data.audioFull);
    } else {
      console.log("Structure unknown", Object.keys(data));
    }
  } catch (err) {
    console.error(err);
  }
}

checkEQuran();
