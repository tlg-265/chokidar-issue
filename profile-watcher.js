const fs = require('fs-extra');
const path = require('path');
const colors = require('colors/safe');
const chokidar = require('chokidar');

const path_file = `profiles/bill-gates.json`;
console.log(`Current Profile: ${colors.red.bgBrightYellow(path_file)}`);

let profile_before = {};

chokidar.watch(path_file).on('change', async (path_changed) => {

  console.log();
  console.log(`${colors.blue.bgYellow(`->`)} Profile changed: ${path_changed}`);
  const cwd = process.cwd();
  console.log(`cwd: ${cwd}`);
  const filepath = path.join(cwd, path_changed);
  console.log(`file "${filepath}" exists:`, fs.existsSync(filepath));

  fs.readFile(path_changed, 'utf8', (err, profile_json) => {
    console.log(`->${profile_json}<-`);
    let profile = JSON.parse(profile_json);
    if (JSON.stringify(profile) != JSON.stringify(profile_before)) {
      console.log('The profile has changed.');
      profile_before = profile;
    }
  });

});
