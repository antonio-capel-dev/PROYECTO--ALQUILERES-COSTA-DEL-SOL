'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../frontend/src/data/contenidoZonas.ts');
const src = fs.readFileSync(FILE, 'utf8');
const cutAt = src.indexOf('
export function getContenidoZona');
const preserved = src.slice(0, cutAt);

const addition = fs.readFileSync(path.join(__dirname, 'seo-en-fr-content.ts'), 'utf8');

fs.writeFileSync(FILE, preserved + '
' + addition, 'utf8');
console.log('Done! File updated.');
