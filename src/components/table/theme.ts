import { PresetTheme } from "@ailiyah-ui/utils";

const tableTheme: PresetTheme = {
  TableRoot: {
    twWidth: "w-full",
    twBorderRadius: "rounded-md",
    twBoxShadow: "shadow-md",
    twBorderCollapse: "border-collapse",
    twFontSize: "text-sm",
    twPosition: "relative",
    twOverflow: "overflow-x-auto",
  },
  Table: {
    twWidth: "w-full",
    twTextAlign: "text-left",
    twTextColor: "text-neutral-500",
    twOverflow: "overflow-x-auto",
    twTableLayout: "table-auto md:table-fixed",
    twFontSize: "text-base",
  },
  TableHead: {
    twWidth: "w-full",
    twBackgroundColor: "bg-neutral-400",
  },
  TableHeadRow: {
    twTextColor: "text-neutral-100",
    twFontSize: "text-md",
    twTextTransform: "capitalize",
  },
  TableHeadHeader: {
    twPadding: "py-2 px-2",
  },
  TableBodyRow: {
    twBackgroundColor: "hover:bg-neutral-100",
  },
  TableBodyData: {
    twPadding: "py-2 px-2",
  },
};

export { tableTheme };
