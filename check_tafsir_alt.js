async function check() {
  try {
    console.log("Checking equran.id...");
    const res1 = await fetch("https://equran.id/api/v2/tafsir/1");
    if (res1.ok) {
      const data1 = await res1.json();
      console.log("equran.id status:", res1.status);
      console.log(
        "equran.id sample:",
        JSON.stringify(data1.data?.tafsir?.[0] || data1, null, 2).substring(
          0,
          200
        )
      );
    } else {
      console.log("equran.id failed:", res1.status);
    }

    console.log("\nChecking gading.dev...");
    const res2 = await fetch("https://api.quran.gading.dev/surah/1");
    if (res2.ok) {
      const data2 = await res2.json();
      console.log("gading.dev status:", res2.status);
      // Check if verses have tafsir
      const verse = data2.data?.verses?.[0];
      console.log(
        "gading.dev verse keys:",
        verse ? Object.keys(verse) : "No verses"
      );
      if (verse?.tafsir) {
        console.log(
          "gading.dev tafsir sample:",
          JSON.stringify(verse.tafsir, null, 2)
        );
      }
    } else {
      console.log("gading.dev failed:", res2.status);
    }
  } catch (e) {
    console.error(e);
  }
}

check();
