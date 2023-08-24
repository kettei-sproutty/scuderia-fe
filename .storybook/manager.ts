// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import ScuderiaFeTheme from "./scuderia-fe-theme";

addons.setConfig({
  theme: ScuderiaFeTheme,
});
