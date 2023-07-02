import { resolve } from 'path';
import { Compilation } from '../compilation';
import { Compiler } from '../compiler';
import { readFileSync, writeFileSync } from 'fs';
import ejs from 'ejs';

export class HtmlWebpackPlugin {
  htmlFileName: string;

  constructor({ filename }) {
    this.htmlFileName = filename;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'HtmlWebpackPlugin',
      (compilation: Compilation, callback) => {
        const { filename, path } = compilation.output;
        const htmlFile = resolve(path, this.htmlFileName);
        const content = readFileSync(
          resolve(__dirname, '../../public/index.ejs'),
          { encoding: 'utf-8' }
        );
        const newContent = ejs.render(content, { filename });
        writeFileSync(htmlFile, newContent);
        callback();
      }
    );
  }
}
