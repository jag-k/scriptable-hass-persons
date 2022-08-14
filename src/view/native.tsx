import {ScriptableJSX} from "@jag-k/scriptable-jsx";
import {HASS_API_TOKEN, HASS_URL} from "../constants";
import {baseUrl, getAPIStatus} from "../utils";

function getKeychain(key: string): string | undefined {
  if (Keychain.contains(key)) {
    return Keychain.get(key);
  }
}

export async function login(url?: string, token?: string) {
  let argsPassed = true
  if (!(url && token)) {
    if (!(Keychain.contains(HASS_URL) && Keychain.contains(HASS_API_TOKEN))) {
      return false
    }
    url = getKeychain(HASS_URL)
    token = getKeychain(HASS_API_TOKEN)
    argsPassed = false
  }

  if (url && token) {
    const resp = await getAPIStatus(url, token);
    if (!resp) {
      return false
    }

    if (config.runsInApp && argsPassed) {
      const a: Alert = (
        <alert
          title="Login Successful!"
          message="Now you can use the widget!"
        >
          <action type={"cancel"}>
            Close
          </action>
        </alert>
      )
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

export async function errorAlert(message?: string) {
  const a: Alert = (
    <alert
      title={"Something went wrong!"}
      message={message || "Try again later"}
    >
      <action type={'cancel'}>Close</action>
    </alert>
  )
  await a.present()
}

export async function loginMenu() {
  const a: Alert = (
    <alert title={"Login in HomeAssistant"}>
      <text-field
        placeholder={'Full URL to HomeAssistant URL'}
        text={getKeychain(HASS_URL)}
      />
      <text-field
        placeholder={'HomeAssistant Token'}
        text={getKeychain(HASS_URL)}
        secure
      />
      <action type={"cancel"}>
        Cancel
      </action>
      <action>
        Login
      </action>
    </alert>
  )
  let res = await a.present()
  console.log(`${res}, ${a.textFieldValue(0)}, ${a.textFieldValue(1)}`)
  const [url, token] = [a.textFieldValue(0), a.textFieldValue(1)]
  return await login(url, token)
}
