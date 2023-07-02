import JSON from './json.json';
export const foo = () => {
  console.log('foo');
  const { name, age } = JSON;
  console.log(name, age + 1);
};
