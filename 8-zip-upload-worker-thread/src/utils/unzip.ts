import * as AdmZip from "adm-zip";

export async function extractArchive(filePath, outputDir): Promise<void> {
  const zip = new AdmZip(filePath);

  return new Promise((resolve, reject) => {
    zip.extractAllToAsync(outputDir, true, false, (error) => {
      if (error instanceof Error) {
        console.log(error);
        reject(error);
      } else {
        console.log(`Extracted to "${outputDir}" successfully`);
        resolve();
      }
    });
  });
}
