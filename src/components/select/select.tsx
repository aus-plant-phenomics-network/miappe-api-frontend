import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { matchSorter } from "match-sorter";
import { createContext } from "../helper";
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";

enableMapSet();
/**
 * Context value provided at root
 *
 * @param value - set of select value (value to be sent to the server)
 * @param valueMap - mapping between the select value and display value
 * @param setValue - handler to update value
 * @param opOptionAdd - handler to add option when a new Select.Item is mounted
 * @param placeholder - placeholder value
 * @param valid - validation status
 */
interface SelectContext {
  value: Set<string>;
  valueMap: Map<string, string>;
  setValue: (value: string) => void;
  onOptionAdd: (option: SelectItemProps) => void;
  placeholder?: string;
  valid: boolean;
}

const [SelectContextProvider, useSelectContext] =
  createContext<SelectContext>("ContextProvider");

/**
 * Props to Select. Extends native `select`'s props
 *
 * @param placeholder - placeholder value
 * @param defaultValueMap - default mapping between selected value and displayed value
 * @param excludeId - id or selected value to be excluded from select
 */
interface SelectProps extends React.ComponentProps<"select"> {
  placeholder?: string;
  defaultValueMap?: Map<string, string>;
  excludeId?: string;
}

/**
 * Props to Select.Item component.
 *
 * @param selectValue - value to be sent to the server
 * @param displayValue  - displayed value
 * @param disabled - whether the option is disabled
 */
interface SelectItemProps {
  selectValue: string;
  displayValue: string;
  disabled?: boolean;
}

/**
 * Convert defaultValue to set
 *
 * @param defaultValue - defaultValue
 * @param excludeId - value to exclude from defaultValue
 * @returns - filtered value(s) as set
 */
const getDefaultValue = (
  defaultValue?: string | readonly string[] | number,
  excludeId?: string,
): Set<string> => {
  let array = defaultValue
    ? Array.isArray(defaultValue)
      ? new Array(...defaultValue)
      : [String(defaultValue)]
    : [];
  array = array.filter(item => item !== excludeId);
  return new Set<string>(array);
};

const Root = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const {
      defaultValue,
      defaultValueMap,
      placeholder,
      multiple,
      children,
      required,
      excludeId,
      ...rest
    } = props;
    // Form validation state
    const [valid, setValid] = React.useState<boolean>(true);

    // Mapping between select value and display value
    const [valueMap, setValueMap] = useImmer<Map<string, string>>(
      defaultValueMap ? defaultValueMap : new Map<string, string>(),
    );

    const onOptionAdd = React.useCallback(
      (option: SelectItemProps) => {
        const key = option.selectValue;
        const value = option.displayValue;
        setValueMap((draft: Map<string, string>) => {
          key !== excludeId && draft.set(key, value);
        });
      },
      [excludeId],
    );

    // Value State and setValue method declaration
    const [stateValue, setStateValue] = useImmer<Set<string>>(
      getDefaultValue(defaultValue, excludeId),
    );
    // console.log(stateValue, defaultValue, defaultValueMap);
    const setValue = React.useCallback(
      (value: string) => {
        // When a new value is selected, clear invalid state
        setValid(true);
        // Add new value if not present else remove
        setStateValue((draft: Set<string>) => {
          if (draft.has(value)) {
            draft.delete(value);
          } else {
            if (!multiple) draft.clear();
            draft.add(value);
          }
        });
      },
      [multiple],
    );

    return (
      <SelectContextProvider
        value={{
          value: stateValue,
          valueMap: valueMap,
          setValue: setValue,
          onOptionAdd: onOptionAdd,
          placeholder: placeholder,
          valid: valid,
        }}
      >
        <select
          multiple={multiple}
          onChange={() => setValid(true)}
          value={multiple ? Array.from(stateValue) : Array.from(stateValue)[0]}
          ref={ref}
          required={required}
          onInvalid={e => {
            e.preventDefault();
            setValid(false);
          }}
          {...rest}
        >
          {stateValue.size === 0 ? <option value="" /> : <></>}
          {Array.from(valueMap, ([selectedValue, displayedValue]) => (
            <option
              key={selectedValue}
              value={selectedValue}
              label={displayedValue}
              disabled={false}
            />
          ))}
        </select>
        <Popover.Root>{children}</Popover.Root>
      </SelectContextProvider>
    );
  }),
);

/**
 * Wrapper for radix-ui Popover.Trigger
 * @param props - button props
 */
const Trigger: React.FC<React.ComponentPropsWithoutRef<"button">> = props => {
  const { valid } = useSelectContext();
  return (
    <Popover.Trigger {...props} data-valid={valid ? "valid" : "invalid"} />
  );
};

/**
 * Component that displays selected value(s)
 * @param props - span props
 */
const Value = React.memo(
  React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
    (props, ref) => {
      const { value, valueMap, setValue, placeholder } = useSelectContext();

      const displayContent =
        value.size !== 0
          ? Array.from(value).map(item => (
              <ValueItem
                key={item}
                value={valueMap.get(item)!}
                onClick={setValue}
              />
            ))
          : placeholder;

      return (
        <span {...props} ref={ref}>
          {displayContent}
        </span>
      );
    },
  ),
);

type ValueItemProps = {
  value: string;
  onClick: (value: string) => void;
};

/**
 * Clickable ValueItem that gets displayed at Value. Clicking on
 * ValueItem removes the item from value state.
 *
 * ValueItem shows the displayed value obtained by referencing a `value` item in
 * `valueMap`
 *
 * @param - props - ValueItemProps
 */
const ValueItem = React.memo(
  React.forwardRef<HTMLSpanElement, ValueItemProps>((props, ref) => {
    const { value, onClick, ...rest } = props;
    const { valueMap } = useSelectContext();

    const valueKey = Array.from(valueMap.entries()).filter(
      item => item[1] === value,
    )?.[0]?.[0];
    return (
      <span
        ref={ref}
        {...rest}
        onClick={e => {
          e.preventDefault();
          onClick(valueKey!);
        }}
        className="SelectValueItem"
      >
        <Cross2Icon className="SelectValueItemIcon" />
        {value}
      </span>
    );
  }),
);

/**
 * Select Trigger Icon
 */
const Icon = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <span aria-hidden {...rest} ref={ref}>
      {children || "▼"}
    </span>
  );
});

/**
 * Context value provided by Select.Content
 *
 * @param query - search query - is a state variable
 * @param setQuery - handler to update query state
 * @param queryMatch - list of displayValue  that matches query
 */
type ContentCondisplayValue = {
  query: string;
  setQuery: (value: string) => void;
  queryMatch: Set<string>;
};

const [ContentContextProvider, useContentContext] =
  createContext<ContentCondisplayValue>("Content");

/**
 * Popover content that provides ContentCondisplayValue  values
 *
 * @param - props: union between div's props and Popover.PopperContentProps
 */
const Content = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<"div"> & Popover.PopperContentProps
  >((props, ref) => {
    const { children, ...rest } = props;
    const [query, setQuery] = React.useState<string>("");
    const { valueMap } = useSelectContext();
    const searchSpace = Array.from(valueMap.values());
    const queryMatch =
      query === "" ? searchSpace : matchSorter(searchSpace, query);
    const contentCondisplayValue = {
      query: query,
      setQuery: setQuery,
      queryMatch: new Set(queryMatch),
    };

    return (
      <ContentContextProvider value={contentCondisplayValue}>
        <Popover.Content ref={ref} {...rest}>
          {children}
        </Popover.Content>
      </ContentContextProvider>
    );
  }),
);

/**
 * Input element in popover content. Allows users to quickly find the option by
 * display name
 *
 * onChange, will update `query` state using `setQuery` method in content context
 *
 * @param props - input props
 */
const Search = React.memo(
  React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
    (props, ref) => {
      const { query, setQuery } = useContentContext();
      return (
        <input
          {...props}
          ref={ref}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      );
    },
  ),
);

/**
 * Select Item in popover content. Renders a checkbox with display title of the select option.
 *
 * Rendering Item for the first time will update global valueMap with handler
 * `onOptionAdd`. If `query` is not null (when user type in the search box), options that match
 *  the query (`displayValue ` in the context `queryMatch`) will have the className `SelectItem` otherwise `SelectItemHidden`
 * for styling.
 *
 * @param selectValue - value to be sent to the server
 * @param displayValue  - value to be displayed
 * @param disabled - enable/disable selection of the item
 */
const Item = React.memo(
  React.forwardRef<
    HTMLLabelElement,
    React.ComponentPropsWithoutRef<"label"> & SelectItemProps
  >((props, ref) => {
    const { selectValue, displayValue, disabled, ...rest } = props;
    const { setValue, value, onOptionAdd } = useSelectContext();
    const { queryMatch } = useContentContext();
    const visible = queryMatch.has(displayValue);

    const checked = value.has(selectValue);

    const disabledValue = disabled ? true : false;

    // Effect on mounting for the first time - addOption
    React.useEffect(() => {
      onOptionAdd({
        selectValue: selectValue,
        displayValue: displayValue,
        disabled: disabledValue,
      });
    }, [onOptionAdd, displayValue, selectValue, disabledValue]);

    return (
      <label
        {...rest}
        ref={ref}
        className={visible ? "SelectItem" : "SelectItemHidden"}
      >
        <input
          type="checkbox"
          className="SelectCheckBox"
          checked={checked}
          onChange={() => (disabled ? {} : setValue(selectValue))}
        />
        {displayValue}
      </label>
    );
  }),
);

/**
 * radix-ui's Popover Portal
 */
const Portal = Popover.Portal;

/**
 * radix-ui's Popover Arrow
 */
const Arrow = Popover.Arrow;

export { Root, Trigger, Value, Icon, Portal, Content, Arrow, Item, Search };

export type { SelectProps, SelectItemProps };
