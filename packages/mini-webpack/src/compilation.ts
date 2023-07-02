import fs from 'fs';
import { CompilationProps, Loader } from './types';
import { parseCode } from './utils';

let ID = 0;

export class Compilation {
  loaders: Loader[];

  output: {
    path: string;
    filename: string;
  };

  graph: any[];

  constructor({ module, output }: CompilationProps) {
    this.loaders = module.rules;
    this.output = output;
    this.graph = [];
  }

  buildModule(filename) {
    let sourceCode = fs.readFileSync(filename, { encoding: 'utf-8' });

    if (Array.isArray(this.loaders)) {
      sourceCode = this.loaders.reduce((source, loader) => {
        const { test, use } = loader;
        let temp = source;

        if (test.test(filename)) {
          const loaders = Array.isArray(use) ? use : [use];
          temp = loaders.reduceRight((tempSource, fn) => fn(tempSource), temp);
        }
        return temp;
      }, sourceCode);
    }

    const { code, dependencies } = parseCode(sourceCode);

    return {
      id: ID++,
      mapping: {},
      dependencies,
      filename,
      code
    };
  }
}
