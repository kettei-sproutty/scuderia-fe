import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

import { withThemeByClassName } from "@storybook/addon-styling";

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
    docs: {
      theme: themes.dark,
      values: [
        {
          name: "dark",
          value: "#000000",
        },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
