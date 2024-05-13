import { PresetTheme } from "@ailiyah-ui/utils";
import { defaultTheme } from "@ailiyah-ui/utils";
import { formTheme, navbarTheme } from "../components";
import { tableTheme } from "../components/table/theme";
import { pageTheme } from "../components/page/theme";

export const theme: PresetTheme = {
  ...defaultTheme,
  Icons: {
    ...defaultTheme.Icons,
    twWidth: "",
  },
  ...navbarTheme,
  ...formTheme,
  ...tableTheme,
  ...pageTheme,
};
