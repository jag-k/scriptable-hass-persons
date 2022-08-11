// Config
// You can change the config here
export const WIDGET_TITLE: string = 'Persons at home';
export const WIDGET_COUNTER_ENABLED: boolean = true;

// =========================================
// PLEASE, DON'T CHANGE ANYTHING BELOW THIS COMMENT,
// IF YOU DON'T KNOW WHAT YOU ARE DOING
// =========================================
let dm = 'medium';  // Using display mode medium by default

export function displayMode(setMode?: WidgetFamily): WidgetFamily {
    if (setMode) {
        dm = setMode;
    }
    return (dm || config.widgetFamily) as WidgetFamily;
}


export const FULL_CARD = displayMode() !== "small";
