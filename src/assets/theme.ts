import { PresetTheme } from "@ailiyah-ui/utils";
import { defaultTheme } from "@ailiyah-ui/utils";
import { formTheme, navbarTheme } from "../components";
import { tableTheme } from "../components/table/theme";
import { pageTheme } from "../components/page/theme";
import { selectTheme } from "../components/select/theme";

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
  ...selectTheme,
};
