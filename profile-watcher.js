const fs = require('fs-extra');
const colors = require('colors/safe');
const chokidar = require('chokidar');
const sleep = require('sleep');

const path_file = `profiles/bill-gates.json`;
console.log(`Current Profile: ${colors.red.bgBrightYellow(path_file)}`);

let profile_before = fs.readFileSync(path_file).toString();

chokidar.watch(path_file).on('change', async (path_changed) => {
  let profile = fs.readFileSync(path_changed).toString();
  if (IsValidJson(profile)) {
    if (profile != profile_before) {
      console.log();
      console.log(`Profile changed: ${colors.red.bgBrightYellow(path_changed)}`);
      process_profile(profile);
      profile_before = profile;
    }
  }
  else {
    sleep.msleep(100);
  }
});

function process_profile(profile_json) {
  const profile = JSON.parse(profile_json);
  console.log(`${profile_json}`);
  console.log(profile.name);
}

function IsValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
