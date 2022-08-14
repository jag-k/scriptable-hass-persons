import * as c from './config';
import {login, loginMenu} from "./view/native";
import {loginWidget, personsWidget} from "./view/widget";


let loggedIn = await login();
const widget = loggedIn ? personsWidget : loginWidget

if (config.runsInWidget) {
  Script.setWidget(await widget())
} else if (config.runsInApp) {
  if (loggedIn) {
    // Showing all widgets
    c.displayMode('small');
    const widgetSmall = await widget();
    await widgetSmall.presentSmall();
    c.displayMode('medium');
    const widgetMedium = await widget();
    await widgetMedium.presentMedium();
    c.displayMode('large');
    const widgetLarge = await widget();
    await widgetLarge.presentLarge();
    c.displayMode('extraLarge');
    const widgetExtraLarge = await widget();
    await widgetExtraLarge.presentExtraLarge();
  } else {
    await loginMenu()
  }
}


Script.complete()
