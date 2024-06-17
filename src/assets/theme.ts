import { PresetTheme } from "@ailiyah-ui/utils";
import { defaultTheme } from "@ailiyah-ui/utils";
import { navbarTheme } from "../components";

export const theme: PresetTheme = {
  ...defaultTheme,
  Icons: {
    ...defaultTheme.Icons,
    twWidth: "",
  },
  ...navbarTheme,
};
