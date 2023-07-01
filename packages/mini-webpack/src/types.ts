export type Loader = {
  test: RegExp;
  use: any;
};

export type Config = {
  entry: string;
  output: Record<string, any>;
  module: {
    rules: Loader[];
  };
  plugins: any[];
};

export type CompilationProps = Pick<Config, 'module' | 'output'>;
export type EntryPluginProps = Pick<Config, 'entry'>;
