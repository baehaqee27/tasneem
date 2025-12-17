async function checkEQuranList() {
  try {
    const res = await fetch("https://equran.id/api/v2/surat");
    const data = await res.json();
    if (data.data && Array.isArray(data.data)) {
      console.log("First item:", data.data[0]);
    } else {
      console.log("Structure unknown", Object.keys(data));
    }
  } catch (err) {
    console.error(err);
  }
}

checkEQuranList();
