import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple recursive un-globber manual para no requerir instalar dependencias
const walk = (dir, ext) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file, ext));
        } else {
            if (file.endsWith(ext)) results.push(file);
        }
    });
    return results;
};

const pagesDir = path.join(__dirname, '../src/pages');
const files = walk(pagesDir, '.astro');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/<(h[1-6]|p)\s+class="([^"]*)"/g, (match, tag, classes) => {
        let newClasses = classes.split(/\s+/).filter(c => {
            // Remover clases de tamaño de texto
            if (c.match(/^(sm:|md:|lg:|xl:)?text-\d+[a-z]+/)) return false;
            // Remover pesos de fuente
            if (c.match(/^font-(bold|extrabold|semibold|light|medium|normal)$/)) return false;
            // Remover colores
            if (c.match(/^text-(marca|brand|slate|gray|white|black|blue|green|red|yellow).*/)) return false;
            // Remover leading y tracking
            if (c.match(/^leading-/)) return false;
            if (c.match(/^tracking-/)) return false;
            return true; // Mantener margins, text-center, max-w, etc.
        }).join(' ').trim();

        if (newClasses === '') {
            return `<${tag}`;
        } else {
            return `<${tag} class="${newClasses}"`;
        }
    });

    fs.writeFileSync(file, content, 'utf8');
});

console.log(`Tipografía estandarizada en ${files.length} archivos .astro.`);
