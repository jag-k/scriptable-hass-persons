import {
  BackgroundColor,
  Person,
  SecondActiveBackgroundColor,
  SecondBackgroundColor,
  SMALL,
  TextColor,
  TransparentColor
} from "../constants";
import {getPersonStates, getPicture, join} from "../utils";
import {displayMode, FULL_CARD, WIDGET_TITLE} from "../config";
import {Scriptable} from "../jsx";

// =========================================
// Widgets
// =========================================
export async function loginWidget(): Promise<ListWidget> {
  return (
    <widget backgroundColor={BackgroundColor}>
      <text>Before using Widget, please login!</text>
    </widget>
  )
}


export async function personsWidget(): Promise<ListWidget> {
  const persons = await getPersonStates();
  let personGrid = [];

  switch (displayMode()) {
    case "small":
      personGrid = [
        [persons[0], persons[1]],
        [persons[2], persons[3]],
      ];
      break;
    case "medium":
      personGrid = [
        [persons[0], persons[1], persons[2], persons[3]],
      ];
      break
    case "large":
    case "extraLarge":
      personGrid = [
        [persons[0], persons[1], persons[2], persons[3]],
        [persons[4], persons[5], persons[6], persons[7]],
        [persons[8], persons[9], persons[10], persons[11]],
        [persons[12], persons[13], persons[14], persons[15]],
      ];
      break
  }


  const widgetTitleText = {
    font: Font.title3(),
    color: TextColor,
  };

  const widgetTitle = !SMALL ? [
    <stack layout={"horizontal"}>
      <text {...widgetTitleText}>
        {WIDGET_TITLE}
      </text>
      <spacer/>
      <text {...widgetTitleText}>
        {persons.filter(p => p.state === 'home').length}/{persons.length}
      </text>
    </stack>,
    <spacer/>
  ] : [];


  const jsxPersonsGrid = await join(
    personGrid,
    async (row: Person[]) => (
      <stack layout={"horizontal"}>
        {
          await join(
            row,
            personCard
          )
        }
      </stack>
    )
  );


  return (
    <widget backgroundColor={BackgroundColor}>
      {widgetTitle}
      <stack layout={"vertical"}>
        {jsxPersonsGrid}
      </stack>
    </widget>
  )
}


export async function personCard(person: Person): Promise<WidgetStack> {
  const at_home = person.state === 'home';
  const opacity = at_home ? 1 : 0.5;
  const image = await getPicture(person);


  const fontSize = 14;
  const props: JSX.StackProps = (
    FULL_CARD ?
      {
        spacing: 5,
        'p-all': 7,
        cornerRadius: 15,
        backgroundColor: at_home ? SecondActiveBackgroundColor : SecondBackgroundColor
      } : {}
  );

  const friendlyName = (
    <stack layout={"horizontal"}>
      <spacer/>
      <text
        color={TextColor}
        font={at_home ? Font.mediumSystemFont(fontSize) : Font.regularSystemFont(fontSize)}
        opacity={opacity}
      >
        {person.attributes.friendly_name}
      </text>
      <spacer/>
    </stack>
  );

  return (
    <stack layout={"vertical"} {...props}>
      <image
        image={image}
        align={"center"}
        opacity={opacity}
        cornerRadius={image.size.width / 2}
        borderWidth={5}
        borderColor={at_home ? TextColor : TransparentColor}
        resizable
      />
      {FULL_CARD && friendlyName}
    </stack>
  )
}
