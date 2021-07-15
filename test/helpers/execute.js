import { throws } from 'assert';
import Module from 'module';
import path from 'path';
import readAsset from './readAsset';

const parentModule = module;

export default (asset, outputFileSystem, stats) => {

  const code = readAsset(asset, outputFileSystem, stats);
  const resource = 'test.js';
  const module = new Module(resource, parentModule);

  module._compile(
    `let __export__;${code};module.exports = __export__;`,
    resource
  );

  return module.exports;
};
