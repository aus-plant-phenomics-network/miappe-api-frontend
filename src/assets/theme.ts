import { Context } from "ailiyah-ui";
import { PresetTheme} from "ailiyah-ui/src/components/context";

const defaultTheme = Context.defaultTheme

export const theme: PresetTheme = {
    ...defaultTheme,
    NavBarAccordionTrigger: {
        twFontWeight: "font-bold",
        twWidth: "w-full",
        twHeight: "h-fit",
        twFlex: "flex",
        twJustifyContent: "justify-between",
        twAlignItems: "items-center"
    },
    NavBarAccordionItem: {
        twPadding: "pr-1 p-2",
        twFlex: "flex",
        twFlexDirection: "flex-col",
        twGap: "gap-y-3"
    },
    NavBarAccordionContent: {
        twPadding: "px-2"
    },
    Icons: {
        ...defaultTheme.Icons,
        twWidth: ""
    }
}