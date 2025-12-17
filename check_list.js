async function checkList() {
  try {
    const res = await fetch("https://api.quran.gading.dev/surah");
    const data = await res.json();
    console.log("Keys:", Object.keys(data));
    if (data.data && Array.isArray(data.data)) {
      console.log("First item:", data.data[0]);
    } else {
      console.log("Data structure unknown", data);
    }
  } catch (err) {
    console.error(err);
  }
}

checkList();
