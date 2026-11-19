import {mkdir,writeFile} from 'node:fs/promises';
import {example} from '../src/example.mjs';
import {build} from '../src/audit.mjs';
import {projectJSON,receiptJSON,puzzleSVG,reviewHTML,gridText} from '../src/exports.mjs';
const p=example(),r=build(p);await mkdir('examples',{recursive:true});
for(const [name,value] of [['garden-project.json',projectJSON(p)],['garden-receipt.json',receiptJSON(r)],['garden-puzzle.svg',puzzleSVG(r,false)],['garden-answer.svg',puzzleSVG(r,true)],['garden-review.html',reviewHTML(r)],['garden-grid.txt',gridText(r)]])await writeFile('examples/'+name,value);
console.log('Generated six actual exports: '+JSON.stringify(r.stats));
