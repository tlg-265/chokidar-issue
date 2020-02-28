const fs = require('fs-extra');
const colors = require('colors/safe');
const chokidar = require('chokidar');

const path_file = `profiles/bill-gates.json`;
console.log(`Current Profile: ${colors.red.bgBrightYellow(path_file)}`);

let profile_before = {};

chokidar.watch(path_file).on('change', async (path) => {

  console.log();
  console.log(`${colors.blue.bgYellow(`->`)} Profile changed: ${path}`);

  fs.readFile(path, (err, profile_json) => {
    console.log(`->${profile_json}<-`);
    let profile = JSON.parse(profile_json);
    if (JSON.stringify(profile) != JSON.stringify(profile_before)) {
      console.log('The profile has changed.');
      profile_before = profile;
    }
  });

});
