import { dirname, resolve } from 'path';
import { Compilation } from '../compilation';
import { Compiler } from '../compiler';
import { EntryPluginProps } from '../types';

export class EntryPlugin {
  entry: string;

  constructor({ entry }: EntryPluginProps) {
    this.entry = entry;
  }

  apply(compiler: Compiler) {
    // 在make钩子时，构建依赖map
    compiler.hooks.make.tapAsync(
      'EntryPlugin',
      (compilation: Compilation, callback) => {
        const entryCompilation = compilation.buildModule(this.entry);
        const moduleArr = [entryCompilation];
        const visitedAsset = {
          [entryCompilation.filename]: entryCompilation.id
        };

        for (let i = 0; i < moduleArr.length; i++) {
          const { dependencies, filename } = moduleArr[i];
          const dir = dirname(filename);
          dependencies.forEach((dependency: string) => {
            const dependencyPath = resolve(dir, dependency);
            if (visitedAsset[dependencyPath]) {
              moduleArr[i].mapping[dependency] = visitedAsset[dependencyPath];
            } else {
              const tempCompilation = compilation.buildModule(dependencyPath);
              moduleArr[i].mapping[dependency] = tempCompilation.id;
              visitedAsset[dependencyPath] = tempCompilation.id;
              moduleArr.push(tempCompilation);
            }
          });
        }
        compilation.graph = moduleArr;
        callback();
      }
    );
  }
}
