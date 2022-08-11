import {HASS_API_TOKEN, HASS_URL} from "../constants";
import {baseUrl, getAPIStatus} from "../utils";

export async function login(url?: string, token?: string) {
  let argsPassed = true
  if (!(url && token)) {
    if (!(Keychain.contains(HASS_URL) && Keychain.contains(HASS_API_TOKEN))) {
      return false
    }
    url = Keychain.get(HASS_URL)
    token = Keychain.get(HASS_API_TOKEN)
    argsPassed = false
  }

  if (url && token) {
    const resp = await getAPIStatus(url, token);
    if (!resp) {
      return false
    }

    if (config.runsInApp && argsPassed) {
      const a = new Alert();
      a.title = "Success login!"
      a.message = "Now you can use the widget!";
      a.addCancelAction('Close')
      await a.present()
    }

    console.log(`Success login!`)
    console.log(`${url}, ${token}`)
    Keychain.set(HASS_URL, baseUrl(url))
    Keychain.set(HASS_API_TOKEN, token)
    return true
  }
  return false
}

export async function errorAlert(message) {
  const alert = new Alert()
  alert.title = "Something went wrong!"
  alert.message = message || "Try again later"
  alert.addCancelAction("Cancel")
  await alert.present()
}

export async function loginMenu() {
  const a = new Alert();
  a.title = "Login in HomeAssistant"
  a.addTextField('Full URL to HomeAssistant URL')
  a.addSecureTextField('HomeAssistant Token')
  a.addCancelAction('Cancel')
  a.addAction('Login')
  let res = await a.present()
  console.log(`${res}, ${a.textFieldValue(0)}, ${a.textFieldValue(1)}`)
  const [url, token] = [a.textFieldValue(0), a.textFieldValue(1)]
  return await login(url, token)
}
