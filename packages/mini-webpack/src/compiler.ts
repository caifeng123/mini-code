import { Compilation } from './compilation';
import {
  AsyncParallelHook,
  AsyncSeriesHook,
  SyncHook,
  UnsetAdditionalOptions
} from 'tapable';
import { Config, Loader } from './types';
import { EntryPlugin } from './entryPlugin';

export class Compiler {
  entry: string;

  output: Record<string, any>;

  plugins: any[];

  hooks: {
    compilation: SyncHook<unknown, void, UnsetAdditionalOptions>;
    make: AsyncParallelHook<unknown, UnsetAdditionalOptions>;
    emit: AsyncSeriesHook<unknown, UnsetAdditionalOptions>;
    afterEmit: AsyncSeriesHook<unknown, UnsetAdditionalOptions>;
  };

  module: {
    rules: Loader[];
  };

  constructor(config: Config) {
    this.entry = config.entry;
    this.output = config.output;
    this.module = config.module;
    this.plugins = config.plugins || [];

    this.hooks = {
      compilation: new SyncHook(['compilation']),
      make: new AsyncParallelHook(['compilation']),
      emit: new AsyncSeriesHook(['compilation']),
      afterEmit: new AsyncSeriesHook(['compilation'])
    };

    this.plugins.forEach(plugin => {
      if (typeof plugin === 'function') {
        plugin.call(this, this);
      } else {
        plugin.apply(this);
      }
    });

    new EntryPlugin({ entry: this.entry }).apply(this);
  }

  run() {
    const compilation = new Compilation({
      module: this.module,
      output: this.output
    });
    this.hooks.compilation.call(compilation);
    this.hooks.make.callAsync(compilation, () => {
      console.log('make done');
    });
    this.hooks.emit.callAsync(compilation, () => {
      console.log('emit done');
    });
    this.hooks.afterEmit.callAsync(compilation, () => {
      console.log('afterEmit done');
    });
  }
}
