const fs = require('node:fs/promises');
const path = require('node:path');

async function transformCountyData(inputFilePath, outputFilePath) {
  try {
    const rawData = await fs.readFile(inputFilePath, 'utf8');
    const countyData = JSON.parse(rawData);
    const transformedData = [];

    for (const stateAbbrev in countyData) {
      const stateInfo = countyData[stateAbbrev];
      const stateName = stateInfo._name;
      const stateFips = stateInfo._fips;

      for (const countyName in stateInfo) {
        if (!countyName.startsWith('_')) {
          const fipsCode = stateInfo[countyName];
          transformedData.push({
            stateAbbrev: stateAbbrev.toUpperCase(),
            state: stateName.toUpperCase(),
            stateFips: stateFips.toUpperCase(),
            county: countyName.toUpperCase(),
            fips: fipsCode,
          });
        }
      }
    }

    const outputJson = JSON.stringify(transformedData, null, 2);
    await fs.writeFile(outputFilePath, outputJson, 'utf8');

    console.log(
      `Successfully transformed data from ${inputFilePath} to ${outputFilePath}`,
    );
  } catch (error) {
    console.error('Error transforming data:', error);
  }
}

// --- Configuration ---
const inputFilePath = path.join(__dirname, 'fips_lookup_by_state.json'); // Replace with your input file path
const outputFilePath = path.join(__dirname, 'fips_list.json'); // Replace with your desired output file path

// Run the transformation
transformCountyData(inputFilePath, outputFilePath);
