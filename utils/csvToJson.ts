import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const inputFile = path.resolve('testData/test.csv');
const outputFile = path.resolve('testData/test.json');

type CsvRow = { Name?: string; Value?: string };

async function convert(): Promise<void> {
  try {
    const rows: CsvRow[] = await csv().fromFile(inputFile);

    const result: Record<string, string> = {};

    rows.forEach((row) => {
      const key = row.Name?.trim();
      const value = row.Value?.trim();
      if (key) result[key] = value || '';
    });

    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
    console.log('CSV converted to key-value JSON successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

convert();