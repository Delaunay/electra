const appdirs = require("appdirsjs")
const path = require("path");
const fs = require("fs");

const appDirs = appdirs.default({ appName: "ehs_call" })
const configFolder = appDirs.config;
const userSettingsPath = path.join(configFolder, "userSettings.json");

let wasLoaded = false
let userSettings = {
  "db": "local.db",
  "previous": []
}

function LoadSettings() {
    wasLoaded = true
    if (fs.existsSync(userSettingsPath)) {
        userSettings = JSON.parse(fs.readFileSync(userSettingsPath, 'utf8'));
        return userSettings
    }
    SaveSettings()
    return userSettings
}
  
function SaveSettings() {
    if (!wasLoaded) {
        return;
    }

    if (!fs.existsSync(userSettingsPath)) {
      fs.mkdirSync(path.dirname(userSettingsPath), { recursive: true })
    }
    fs.writeFileSync(userSettingsPath, JSON.stringify(userSettings, null, 2))
}

function SetSetting(key, value) {
    if (!wasLoaded) {
        LoadSettings()
    }
    userSettings[key] = value
    SaveSettings()
}

function GetSetting(key) {
    if (!wasLoaded) {
        LoadSettings()
    }
    return userSettings[key]
}

module.exports = {LoadSettings, SaveSettings, SetSetting, GetSetting}
