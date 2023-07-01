import { Compiler } from './compiler';
import { Config } from './types';

export const webpack = (config: Config) => {
  const compiler = new Compiler(config);
  compiler.run();
};
