import { resolve } from 'path';
import { mkdirSync } from 'fs';
import { Compilation } from '../compilation';
import { Compiler } from '../compiler';
import { OutputPluginProps } from '../types';
import { render } from '../template';

export class OutputPlugin {
  output: {
    path: string;
    filename: string;
  };

  constructor({ output }: OutputPluginProps) {
    this.output = output;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'OutputPlugin',
      (compilation: Compilation, callback) => {
        const { path, filename } = this.output;
        mkdirSync(path, { recursive: true });
        render(resolve(path, filename), compilation.graph);
        callback();
      }
    );
  }
}
