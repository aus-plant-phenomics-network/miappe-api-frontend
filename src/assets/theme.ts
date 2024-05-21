import { PresetTheme } from "@ailiyah-ui/utils";
import { defaultTheme } from "@ailiyah-ui/utils";
import { formTheme, navbarTheme } from "../components";
import { tableTheme } from "../components/table/theme";
import { selectTheme } from "../components/select/theme";
import { pageTheme } from "../factory/theme";

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
