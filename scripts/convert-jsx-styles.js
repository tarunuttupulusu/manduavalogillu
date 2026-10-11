const fs = require('fs');
const path = require('path');

function cssStringToObjectCode(cssStr) {
  // Trim and strip quotes if any
  const declarations = cssStr
    .split(';')
    .map(d => d.trim())
    .filter(Boolean);

  const props = [];

  for (const dec of declarations) {
    const colonIdx = dec.indexOf(':');
    if (colonIdx === -1) continue;
    let prop = dec.slice(0, colonIdx).trim();
    let val = dec.slice(colonIdx + 1).trim();

    // convert kebab-case to camelCase
    let camelProp = prop.replace(/-([a-z])/g, (_, g) => g.toUpperCase());

    // escape quotes in value if needed
    val = val.replace(/"/g, '\\"');

    props.push(`${camelProp}: "${val}"`);
  }

  return `{{ ${props.join(', ')} }}`;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Regex to match style="something" where something doesn't contain unescaped quotes
  // We use regex with match
  let modified = false;

  content = content.replace(/style="([^"]*)"/g, (match, cssStr) => {
    modified = true;
    const objCode = cssStringToObjectCode(cssStr);
    return `style=${objCode}`;
  });

  // Also match style={`...`} template literals if any
  content = content.replace(/style={`([^`]+)`}/g, (match, cssStr) => {
    // If it contains JS interpolation, leave or handle
    if (!cssStr.includes('${')) {
      modified = true;
      const objCode = cssStringToObjectCode(cssStr);
      return `style=${objCode}`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed styles in:', path.basename(filePath));
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

const targetDir = path.join(__dirname, '../client/src');
walkDir(targetDir);
console.log('Done converting JSX styles.');
