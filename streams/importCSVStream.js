import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
});

(
  async () => {
    const linesCSV = stream.pipe(csvParse);

    for await (const line of linesCSV) {
      const [ title, description ] = line;

      await fetch('http://localhost:3001',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description
        })
      })
    }
  }
)()