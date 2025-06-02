
const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, '../../package.json');

try {
  // Read the package.json file
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);

  // Add the start script if it doesn't exist
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  // Add or update the start script
  packageJson.scripts.start = 'electron ./electron-launcher.js';
  
  // Add the dev script if needed
  if (!packageJson.scripts.dev) {
    packageJson.scripts.dev = 'vite';
  }

  // Write the updated package.json back to disk
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('Successfully added "start" script to package.json');
} catch (error) {
  console.error('Error updating package.json:', error);
}
