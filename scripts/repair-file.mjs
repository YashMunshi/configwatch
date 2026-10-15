import {readFile,writeFile} from 'node:fs/promises';import {createRequire} from 'node:module';import path from 'node:path';
const require=createRequire(import.meta.url),E=require('../web/engine.js');
if(process.argv.length<4)throw Error('Usage: node scripts/repair-file.mjs input.json output.json [--approve]');
const source=path.resolve(process.argv[2]),output=path.resolve(process.argv[3]);if(source===output)throw Error('Output must differ from the source; original evidence is never overwritten.');
const input=JSON.parse(await readFile(source,'utf8'));input.applyApproved=process.argv.includes('--approve');const result=E.run(input);
await writeFile(output,JSON.stringify(result.report,null,2),{flag:'wx'});console.log((input.applyApproved?'Generated repaired copy and rollback snapshot':'Generated preview only')+'. The source file was not changed.');
