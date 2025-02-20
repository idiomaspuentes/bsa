import { migrate211015 } from './migrate211015';
import { migrate211029 } from './migrate211029';
import * as package_json from '../../package.json';

export const VERSION_KEY = 'version';
/**
 * start all migrations here
 * We will create migration files in the migrate[yy][mm][dd] format (for example, migrate211006).
 * The blank is in the folder.
 * Internally, we manipulate localstorage.
 */
export default function Migrate() {
  const v = getVersion();
  migrate211015(v);
  migrate211029(v);
}

/**
 * get current version of app
 * If there is nothing in the localstorage, then install the latest version.
 * Otherwise, install version 1.1.0, since it was in it that we introduced versioning.
 * @returns current version of app
 */
const getVersion = () => {
  let lsVersion = localStorage.getItem(VERSION_KEY);
  if (lsVersion === null) {
    if (localStorage.getItem('appConfig') === null) {
      lsVersion = package_json.version;
    } else {
      lsVersion = '1.1.0';
    }
    localStorage.setItem(VERSION_KEY, lsVersion);
  }
  return lsVersion;
};
