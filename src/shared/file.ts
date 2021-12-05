import fs from 'fs';
import readline from 'readline';

export async function openFileReader(
  fileName: string
): Promise<readline.Interface> {
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return rl;
}
