const fs = require('fs');

const hookContent = `#!/bin/sh\nnode scripts/pre-commit.js\n`;
fs.writeFileSync('.git/hooks/pre-commit', hookContent);
console.log('✅ Hooks installed!');