import * as c from './config';
import {login, loginMenu} from "./view/native";
import {loginWidget, personsWidget} from "./view/widget";


let loggedIn = await login();
const widget = loggedIn ? personsWidget : loginWidget

if (config.runsInWidget) {
  // const widget = loginWidget
  Script.setWidget(await widget())
} else if (config.runsInApp) {
  if (loggedIn) {
    // c.displayMode('small');
    // const wS = await widget();
    // await wS.presentSmall();
    c.displayMode('medium');
    const wM = await widget();
    await wM.presentMedium();
  } else {
    await loginMenu()
  }
}


Script.complete()
