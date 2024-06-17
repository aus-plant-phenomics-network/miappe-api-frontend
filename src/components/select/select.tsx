import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { matchSorter } from "match-sorter";
import { createContext } from "../helper";

interface SelectContextValue {
  value: Set<string> | string;
  valueMap: Map<string, string>;
  setValue: (value: string) => void;
  multiple?: boolean;
  onOptionAdd: (option: SelectItemProps) => void;
  placeholder?: string;
  valid: boolean;
}

const [SelectContextProvider, useSelectContext] =
  createContext<SelectContextValue>("ContextProvider");

type NativeOption = React.ReactElement<React.ComponentProps<"option">>;

interface SelectProps {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name: string;
  required: boolean;
  placeholder?: string;
  defaultValue?: string | string[];
  defaultValueMap?: Map<string, string>;
  excludeId?: string;
  className?: string;
}

interface SelectItemProps {
  selectValue: string;
  textValue: string;
  disabled?: boolean;
}

class ImmutableMap<K, V> extends Map<K, V> {
  static fromMap<K, V>(value?: Map<K, V>, excludeKey?: K) {
    const initMap = value
      ? new ImmutableMap<K, V>(value)
      : new ImmutableMap<K, V>();
    return excludeKey ? initMap.remove(excludeKey) : initMap;
  }
  append(key: K, value: V, excludeKey?: K): ImmutableMap<K, V> {
    if (key === excludeKey) return this;
    const newMap = new ImmutableMap<K, V>(this);
    newMap.set(key, value);
    return newMap;
  }
  remove(key: K): ImmutableMap<K, V> {
    const newMap = new ImmutableMap<K, V>(this);
    newMap.delete(key);
    return newMap;
  }
}

class OptionMap extends ImmutableMap<string, NativeOption> {
  static fromValueMap(
    value?: ImmutableMap<string, string>,
    excludeKey?: string,
  ) {
    const initOptionMap = new OptionMap();
    if (value) {
      for (const pair of value.entries()) {
        if (excludeKey && excludeKey === pair[0]) {
          continue;
        }
        const newOption = (
          <option
            key={pair[0]}
            value={pair[0]}
            label={pair[1]}
            disabled={false}
          />
        );
        initOptionMap.set(pair[0], newOption);
      }
    }
    return initOptionMap;
  }
  append(key: string, value: NativeOption): OptionMap {
    return new OptionMap(super.append(key, value));
  }
  addOption(item: SelectItemProps, excludeKey?: string): OptionMap {
    if (item.selectValue === excludeKey) return this;
    const newOption = (
      <option
        key={item.selectValue}
        value={item.selectValue}
        label={item.textValue}
        disabled={item.disabled}
      />
    );
    return this.append(item.selectValue, newOption);
  }
}

class ImmutableSet<K> extends Set<K> {
  toggle(key: K): ImmutableSet<K> {
    const newSet = new ImmutableSet(this);
    newSet.has(key) ? newSet.delete(key) : newSet.add(key);
    return newSet;
  }
}

const getDefaultValue = (
  defaultValue?: string | string[],
  multiple?: boolean,
  excludeId?: string,
): string | ImmutableSet<string> => {
  if (defaultValue) {
    let array = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    array = array.filter(item => item !== excludeId);
    if (array.length > 0)
      return multiple ? new ImmutableSet<string>(array) : array[0];
  }
  return multiple ? new ImmutableSet<string>() : "";
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

    const [valid, setValid] = React.useState<boolean>(true);
    const [valueMap, setValueMap] = React.useState(
      new ImmutableMap<string, string>(),
    );
    const [optionMap, setOptionMap] = React.useState(new OptionMap());
    const dependency = defaultValueMap
      ? JSON.stringify(Array.from(defaultValueMap.keys()))
      : undefined;

    const fDefaultValueMap = React.useMemo(() => {
      return ImmutableMap.fromMap(defaultValueMap, excludeId);
    }, [dependency]);

    const fDefaultOptionMap = React.useMemo(() => {
      return OptionMap.fromValueMap(fDefaultValueMap, excludeId);
    }, [dependency]);

    const cValueMap = valueMap.size !== 0 ? valueMap : fDefaultValueMap;
    const cOptionMap = optionMap.size !== 0 ? optionMap : fDefaultOptionMap;

    const onOptionAdd = React.useCallback((option: SelectItemProps) => {
      const key = option.selectValue;
      const value = option.textValue;
      setValueMap(prev => prev.append(key, value, excludeId));
      setOptionMap(prev => prev.addOption(option, excludeId));
    }, []);

    const [stateValue, setStateValue] = React.useState<string | Set<string>>(
      () => getDefaultValue(defaultValue, multiple, excludeId),
    );

    const setStateFn = React.useMemo(
      () =>
        multiple
          ? (value: string) => {
              setValid(true);
              setStateValue(prev =>
                (prev as ImmutableSet<string>).toggle(value),
              );
            }
          : (value: string) => {
              setValid(true);
              setStateValue(value);
            },
      [multiple],
    );

    return (
      <SelectContextProvider
        value={{
          value: stateValue,
          valueMap: cValueMap,
          setValue: setStateFn,
          multiple: multiple,
          onOptionAdd: onOptionAdd,
          placeholder: placeholder,
          valid: valid,
        }}
      >
        <select
          multiple={multiple}
          onChange={() => setValid(true)}
          value={multiple ? Array.from(stateValue) : (stateValue as string)}
          ref={ref}
          required={required}
          onInvalid={e => {
            e.preventDefault();
            setValid(false);
          }}
          {...rest}
        >
          {stateValue === "" || Array.from(stateValue).length == 0 ? (
            <option value="" />
          ) : (
            <></>
          )}
          {Array.from(cOptionMap.values())}
        </select>
        <Popover.Root>{children}</Popover.Root>
      </SelectContextProvider>
    );
  }),
);

const Trigger: React.FC<React.ComponentPropsWithoutRef<"button">> = props => {
  const { valid } = useSelectContext();
  return (
    <Popover.Trigger {...props} data-valid={valid ? "valid" : "invalid"} />
  );
};

const Value = React.memo(
  React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
    (props, ref) => {
      const { multiple, value, valueMap, setValue, placeholder } =
        useSelectContext();
      let displayContent;
      if (multiple) {
        displayContent =
          Array.from(value).length !== 0
            ? Array.from(value).map(item => (
                <ValueItem
                  key={item}
                  value={valueMap.get(item)!}
                  onClick={setValue}
                />
              ))
            : placeholder;
      } else {
        displayContent =
          value !== "" && valueMap.get(value as string)
            ? valueMap.get(value as string)
            : placeholder;
      }

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
          onClick(valueKey);
        }}
        className="SelectValueItem"
      >
        <Cross2Icon className="SelectValueItemIcon" />
        {value}
      </span>
    );
  }),
);

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

type ContentContextValue = {
  query: string;
  setQuery: (value: string) => void;
  queryMatch: Set<string>;
};

const [ContentContextProvider, useContentContext] =
  createContext<ContentContextValue>("Content");

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
    const contentContextValue = {
      query: query,
      setQuery: setQuery,
      queryMatch: new Set(queryMatch),
    };

    return (
      <ContentContextProvider value={contentContextValue}>
        <Popover.Content ref={ref} {...rest}>
          {children}
        </Popover.Content>
      </ContentContextProvider>
    );
  }),
);

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

const Item = React.memo(
  React.forwardRef<
    HTMLLabelElement,
    React.ComponentPropsWithoutRef<"label"> & SelectItemProps
  >((props, ref) => {
    const { selectValue, textValue, disabled, ...rest } = props;
    const { setValue, value, multiple, onOptionAdd } = useSelectContext();
    const { queryMatch } = useContentContext();
    const visible = queryMatch.has(textValue);

    const checked = multiple
      ? (value as Set<string>).has(selectValue)
      : selectValue === (value as string);

    const disabledValue = disabled ? true : false;
    React.useEffect(() => {
      onOptionAdd({
        selectValue: selectValue,
        textValue: textValue,
        disabled: disabledValue,
      });
    }, [onOptionAdd, textValue, selectValue, disabledValue]);

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
        {textValue}
      </label>
    );
  }),
);

const Portal = Popover.Portal;
const Arrow = Popover.Arrow;

export { Root, Trigger, Value, Icon, Portal, Content, Arrow, Item, Search };

export type { SelectProps, SelectItemProps };
