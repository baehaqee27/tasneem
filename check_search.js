async function checkSearch() {
  try {
    console.log("Checking api.quran.com search...");
    // Search for "cinta" in Indonesian
    const url = "http://api.quran.com/api/v4/search?q=cinta&language=id&size=5";

    console.log(`Testing ${url}...`);
    const res = await fetch(url);
    console.log(`Status: ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      console.log(
        "First result:",
        JSON.stringify(data.search.results[0], null, 2)
      );
    } else {
      console.log("Failed:", await res.text());
    }
  } catch (e) {
    console.error(e);
  }
}

checkSearch();
