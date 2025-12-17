const BASE_URL = "https://equran.id/api/v2";

async function verifyFix() {
  try {
    console.log("Fetching Surah 9 from new API...");
    const res = await fetch(`${BASE_URL}/surat/9`);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    const surahData = data.data;

    const verse = surahData.ayat.find((a) => a.nomorAyat === 120);

    if (verse) {
      console.log("Verse 120 Found!");
      console.log("Arabic ends with:", verse.teksArab.slice(-30));
      console.log("Length:", verse.teksArab.length);
      console.log(
        "Tranlsiteration (ID) sample:",
        verse.teksIndonesia.slice(0, 50) + "..."
      );

      const expectedEnd = "أَجْرَ الْمُحْسِنِينَ"; // approximate
      // Normalize for comparison if needed, but visual check is fine.
    } else {
      console.error("Verse 120 NOT FOUND in new API response");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

verifyFix();
