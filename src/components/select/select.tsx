import React from "react";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { createContext } from "@ailiyah-ui/context";
import { TailwindProps } from "@ailiyah-ui/utils";
import { matchSorter } from "match-sorter";

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
}

interface SelectItemProps {
  selectValue: string;
  textValue: string;
  disabled?: boolean;
}

// const Item
// const ItemText
// const ItemIndicator

const CrossIcon = styled(Cross2Icon);

const Root = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps & TailwindProps>(
    (props, ref) => {
      const {
        defaultValue,
        defaultValueMap,
        placeholder,
        multiple,
        children,
        required,
        ...rest
      } = props;

      const [valid, setValid] = React.useState<boolean>(true);

      const [optionMap, setOptionMap] = React.useState(
        new Map<string, NativeOption>(),
      );

      const defaultValueMapDependency = defaultValueMap
        ? JSON.stringify(Array.from(defaultValueMap.keys()))
        : undefined;

      const defaultOptionMap = React.useMemo(() => {
        const initOptionMap = new Map<string, NativeOption>();
        if (defaultValueMap) {
          for (const pair of defaultValueMap.entries()) {
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
      }, [defaultValueMapDependency]);

      const contextOptionMap =
        optionMap.size !== 0 ? optionMap : defaultOptionMap;

      const [valueMap, setValueMap] = React.useState(new Map<string, string>());

      const contextValueMap =
        valueMap.size !== 0
          ? valueMap
          : defaultValueMap
            ? defaultValueMap
            : valueMap;

      const onOptionAdd = React.useCallback((option: SelectItemProps) => {
        setOptionMap(prev => {
          if (option.selectValue in prev) {
            return prev;
          }
          setValueMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(option.selectValue, option.textValue);
            return newMap;
          });
          const newOption = (
            <option
              key={option.selectValue}
              label={option.textValue}
              value={option.selectValue}
              disabled={option.disabled}
            />
          );
          const newMap = new Map(prev);
          newMap.set(option.selectValue, newOption);
          return newMap;
        });
      }, []);

      const [stateValue, setStateValue] = React.useState<string | Set<string>>(
        () => {
          if (!defaultValue) return multiple ? new Set<string>() : "";
          if (!Array.isArray(defaultValue))
            return multiple ? new Set<string>([defaultValue]) : defaultValue;
          return multiple ? new Set<string>(defaultValue) : defaultValue[0];
        },
      );

      const setStateFn = React.useMemo(
        () =>
          multiple
            ? (value: string) => {
                setValid(true);
                setStateValue(prev => {
                  const prevValue = prev as Set<string>;
                  if (!prevValue.has(value)) {
                    return new Set([...prevValue, value]);
                  }
                  const result = new Set(
                    Array.from(prevValue).filter(item => item !== value),
                  );
                  return result;
                });
              }
            : (value: string) => {
                setStateValue(value);
                setValid(true);
              },
        [multiple],
      );

      return (
        <SelectContextProvider
          value={{
            value: stateValue,
            valueMap: contextValueMap,
            setValue: setStateFn,
            multiple: multiple,
            onOptionAdd: onOptionAdd,
            placeholder: placeholder,
            valid: valid,
          }}
        >
          <styled.select
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
            {Array.from(contextOptionMap.values())}
          </styled.select>
          <Popover.Root>{children}</Popover.Root>
        </SelectContextProvider>
      );
    },
  ),
);

const _Trigger = styled(Popover.Trigger);

const Trigger: React.FC<TailwindComponentProps<"button">> = props => {
  const { valid } = useSelectContext();
  return <_Trigger {...props} data-valid={valid ? "valid" : "invalid"} />;
};

const Value = React.memo(
  React.forwardRef<HTMLSpanElement, TailwindComponentProps<"span">>(
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
        <styled.span {...props} ref={ref}>
          {displayContent}
        </styled.span>
      );
    },
  ),
);

type ValueItemProps = {
  value: string;
  onClick: (value: string) => void;
};

const ValueItem = React.memo(
  React.forwardRef<HTMLSpanElement, ValueItemProps & TailwindProps>(
    (props, ref) => {
      const { value, onClick, ...rest } = props;
      const { valueMap } = useSelectContext();

      const valueKey = Array.from(valueMap.entries()).filter(
        item => item[1] === value,
      )?.[0]?.[0];

      return (
        <styled.span
          ref={ref}
          {...rest}
          onClick={e => {
            e.preventDefault();
            onClick(valueKey);
          }}
          themeName="SelectValueItem"
        >
          <CrossIcon themeName="SelectValueItemIcon" />
          {value}
        </styled.span>
      );
    },
  ),
);

const Icon = React.forwardRef<HTMLSpanElement, TailwindComponentProps<"span">>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <styled.span aria-hidden {...rest} ref={ref}>
        {children || "▼"}
      </styled.span>
    );
  },
);

const Portal = styled(Popover.Portal);

const _Content = styled(Popover.Content);

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
    TailwindComponentProps<"div"> & Popover.PopperContentProps
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
        <_Content ref={ref} {...rest}>
          {children}
        </_Content>
      </ContentContextProvider>
    );
  }),
);

const Search = React.memo(
  React.forwardRef<HTMLInputElement, TailwindComponentProps<"input">>(
    (props, ref) => {
      const { query, setQuery } = useContentContext();
      return (
        <styled.input
          {...props}
          ref={ref}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      );
    },
  ),
);

const Arrow = styled(Popover.Arrow);

const Item = React.memo(
  React.forwardRef<
    HTMLLabelElement,
    TailwindComponentProps<"label"> & SelectItemProps
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
      <styled.label
        {...rest}
        ref={ref}
        themeName={visible ? "SelectItem" : "SelectItemHidden"}
      >
        <styled.input
          type="checkbox"
          themeName="SelectCheckBox"
          checked={checked}
          onChange={() => (disabled ? {} : setValue(selectValue))}
        />
        {textValue}
      </styled.label>
    );
  }),
);

export { Root, Trigger, Value, Icon, Portal, Content, Arrow, Item, Search };

export type { SelectProps, SelectItemProps };
