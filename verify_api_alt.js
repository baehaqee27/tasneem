async function checkVerseAlt() {
  try {
    const res = await fetch("https://api.quran.gading.dev/surah/9");
    const data = await res.json();
    // Structure might be different. Let's inspect it.
    // Usually it's data.verses or similar.
    // Let's just print the structure of verses if we can find it.

    // Based on common knowledge of this API (or just guessing structure), let's print a key verse.
    // If struture is unknown, I'll print the keys first.

    if (data.data && data.data.verses) {
      const verse = data.data.verses.find((v) => v.number.inSurah === 120);
      console.log("Verse 120 (text):", verse.text.arab);
      console.log("Ends with:", verse.text.arab.slice(-20));
    } else {
      console.log("Structure unpredictable. Keys:", Object.keys(data));
      if (data.verses) {
        const verse = data.verses.find((v) => v.number === 120); // guessing
        if (verse) console.log("Verse 120:", verse);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

checkVerseAlt();
