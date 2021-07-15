import path from 'path';

export default (asset, outputFileSystem, stats) => {
  
  const outputPath = stats.compilation.outputOptions.path;
  let targetFile = asset;
  const queryStringIdx = targetFile.indexOf('?');

  if (queryStringIdx >= 0) {
    targetFile = targetFile.substr(0, queryStringIdx);
  }

  try {
    return outputFileSystem.readFileSync(path.join(outputPath, targetFile)).toString();
  } catch (error) {
    return error.toString();
  }
};
