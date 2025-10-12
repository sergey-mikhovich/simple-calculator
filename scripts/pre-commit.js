const { execSync } = require('child_process');

console.log('🔍 Running ESLint check...');

try {
  execSync(`npx eslint --max-warnings=0`, { stdio: 'inherit' });
  console.log('✅ ESLint passed!');
  process.exit(0);
} catch (error) {
  console.error('❌ ESLint found errors!');
  process.exit(1);
}