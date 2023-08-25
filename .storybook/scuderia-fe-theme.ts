import { create } from "@storybook/theming/create";

const ScuderiaFeTheme = create({
  base: "dark",
  brandTitle: "My custom Storybook",
  brandUrl: "https://example.com",
  brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
  brandTarget: "_self",
});

export default ScuderiaFeTheme;
