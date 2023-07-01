import fs from 'fs';
import ejs from 'ejs';
import { resolve } from 'path';

export const render = (outputPath: string, data: Record<string, any>) => {
  const ejsPath = resolve(__dirname, '../public/template.ejs');
  const content = fs.readFileSync(ejsPath, { encoding: 'utf-8' });
  const result = ejs.render(content, { data });
  fs.writeFileSync(outputPath, result);
};
