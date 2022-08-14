import {HASS_API_TOKEN, HASS_URL, Person} from "./constants";
import {ScriptableJSX} from "@jag-k/scriptable-jsx";

export function baseUrl(baseUrl: string) {
  return baseUrl.replace(/\/?$/, '')
}

export function createRequest(url: string, token?: string) {
  const req = new Request(url);
  req.headers = {'Authorization': `Bearer ${token || Keychain.get(HASS_API_TOKEN)}`};
  return req;
}

export async function getAPIStatus(url?: string, token?: string) {
  const apiCheckUrl = (url ? baseUrl(url) : Keychain.get(HASS_URL)) + '/api/';
  const req = createRequest(apiCheckUrl, token);
  console.log(`Checking ${apiCheckUrl}`)
  const d = await req.loadString();
  console.log(`d: ${d}`)
  const data = JSON.stringify(JSON.parse(d));
  console.log(`data: ${data}`)
  return data === JSON.stringify({"message": "API running."});
}

export async function getAllStates() {
  return await createRequest(Keychain.get(HASS_URL) + '/api/states').loadJSON();
}


export async function getPersonStates(): Promise<Person[]> {
  const states = await getAllStates();
  return states.filter(state => state.entity_id.startsWith('person.'));
}

export async function getPicture(person: Person): Promise<Image> {
  return await createRequest(Keychain.get(HASS_URL) + person.attributes.entity_picture).loadImage();
}

export function createPersonURL(person: Person): string {
  return `${Keychain.get(HASS_URL)}/history?entity_id=${person.entity_id}`
}

export async function join<_T, _R>(
  array: Array<_T>,
  callback: (a: _T) => Promise<_R>,
  separator?: any
): Promise<Array<_R>> {
  if (!separator) {
    separator = <spacer/>;
  }

  const result = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const value = array[i];
    const out = await callback(value);
    if (!out) {
      break
    }
    result.push(out);
    if (i !== length - 1) result.push(separator);
  }
  return result
}
