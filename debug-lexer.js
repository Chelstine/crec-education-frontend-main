const fs = require('fs');
const path = require('path');
const { init, parse } = require('es-module-lexer');

async function debug() {
    await init;
    const srcDir = path.join(__dirname, 'src');

    function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                try {
                    parse(content);
                } catch (e) {
                    console.error(`❌ Lexer error in ${fullPath}: ${e.message}`);
                    const lines = content.split('\n');
                    const [line, col] = e.message.match(/@:(\d+):(\d+)/)?.slice(1) || [];
                    if (line) {
                        console.log(`Context around line ${line}:`);
                        const start = Math.max(0, parseInt(line) - 3);
                        const end = Math.min(lines.length, parseInt(line) + 2);
                        for (let i = start; i < end; i++) {
                            console.log(`${i + 1}: ${lines[i]}`);
                        }
                    }
                }
            }
        }
    }
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

debug();
