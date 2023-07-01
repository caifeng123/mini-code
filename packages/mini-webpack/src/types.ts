export type Loader = {
  test: RegExp;
  use: any;
};

export type Config = {
  entry: string;
  output: {
    path: string;
    filename: string;
  };
  module: {
    rules: Loader[];
  };
  plugins: any[];
};

export type CompilationProps = Pick<Config, 'module' | 'output'>;
export type EntryPluginProps = Pick<Config, 'entry'>;
export type OutputPluginProps = Pick<Config, 'output'>;
