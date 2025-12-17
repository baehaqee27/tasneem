async function checkAudio() {
  try {
    const res = await fetch("https://api.quran.gading.dev/surah/1");
    const data = await res.json();
    console.log("Audio field in detail?", JSON.stringify(data.data.audio));
    // Check if verses have audio
    if (data.data.verses && data.data.verses[0].audio) {
      console.log("Verse audio:", data.data.verses[0].audio);
    }
  } catch (err) {
    console.error(err);
  }
}

checkAudio();
