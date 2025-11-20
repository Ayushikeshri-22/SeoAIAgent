import fs from "fs/promises";

async function saveResults(results) {
  try {
    await fs.writeFile(
      "results.json",
      JSON.stringify(results, null, 2),
      "utf-8"
    );
    console.log("Saved results.json");
  } catch (err) {
    console.error("Error saving file:", err);
  }
}
export default saveResults;