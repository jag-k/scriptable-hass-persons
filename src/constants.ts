// =========================================
// Constants
// =========================================
export const HASS_URL = "HASS_URL"
export const HASS_API_TOKEN = "HASS_TOKEN"


export const SMALL = config.widgetFamily === "small"

// =========================================
// Colors
// =========================================
// language=CSS prefix=*{color:# suffix=;}
export const BackgroundColor = Color.dynamic(
  new Color('ccc', 1),
  new Color('1c1c1c', 1),
);

// language=CSS prefix=*{color:# suffix=;}
export const SecondBackgroundColor = Color.dynamic(
  new Color('000', .1),
  new Color('fff', .1),
);

// language=CSS prefix=*{color:# suffix=;}
export const SecondActiveBackgroundColor = Color.dynamic(
  new Color('000', .2),
  new Color('fff', .2),
);

// language=CSS prefix=*{color:# suffix=;}
export const TextColor = Color.dynamic(
  new Color('000', 1),
  new Color('fff', 1),
);

// language=CSS prefix=*{color:# suffix=;}
export const TransparentColor = new Color('000', 0)

export interface Person {
  entity_id: string,
  state: "home" | "no_home",
  attributes: {
    editable: boolean,
    id: string,
    latitude?: number,
    longitude?: number,
    gps_accuracy?: number,
    source: string,
    user_id: string,
    entity_picture: string,
    friendly_name: string
  },
  last_changed: string,
  last_updated: string,
  context: {
    id: string,
    parent_id: unknown | null,
    user_id: unknown | null
  }
}
