#!/usr/bin/env node

const fs = require('fs');
const path = require("path");
const program = require('commander');
const ThriftTool = require('../src');

const getFileName = function(filename) {
  const extension = path.extname(filename);
  return path.basename(filename,extension);
}

program
  .version('0.1.0')
  .option('-s, --source <value>', '.thrift file')
  .option('-c, --class <value>', 'get name struct')
  .option('-o, --output <value>', 'Output file path')
  .parse(process.argv);

const sourcePath = program.source;
const outputPath = `${program.outputPath || getFileName(sourcePath)}.json`;
const sourceContent = fs.readFileSync(path.join(sourcePath), 'utf8');

const tt = new ThriftTool();
const res = tt.parse(sourceContent, program.class);

const newPath = path.join(sourcePath.replace(path.basename(sourcePath), ''), outputPath);
fs.writeFileSync(newPath, JSON.stringify(res, undefined, 2), 'utf8');
