import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { transformFromAst } from '@babel/core';

export function parseCode(sourceCode) {
  const dependencies = [];
  const ast = parse(sourceCode, { sourceType: 'module' });

  traverse(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value);
    },

    CallExpression({ node }) {
      if (node.callee.name === 'require') {
        dependencies.push(node.arguments[0].value);
      }
    }
  });

  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });

  return {
    code,
    dependencies
  };
}
