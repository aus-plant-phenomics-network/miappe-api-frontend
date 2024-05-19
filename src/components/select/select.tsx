import React from "react";
import { FetchDataArrayType } from "../types";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { createContext } from "@ailiyah-ui/context";

type NativeOption = React.ReactElement<React.ComponentProps<"option">>;

interface SimpleSelectProps {
  name: string;
  required: boolean;
  defaultValue?: string;
  fetchedData: FetchDataArrayType;
}

const PopoverContent = styled(Popover.Content);

const SimpleSelect = React.memo(
  React.forwardRef<
    HTMLSelectElement,
    SimpleSelectProps & Omit<TailwindComponentProps<"select">, "defaultValue">
  >((props, ref) => {
    const { name, required, defaultValue, fetchedData, ...rest } = props;
    return (
      <styled.select
        aria-label={`${name}-select`}
        ref={ref}
        {...rest}
        name={name}
        required={required}
        defaultValue={defaultValue}
      >
        {!defaultValue && (
          <option value="" hidden label="Select from dropdown" />
        )}
        {fetchedData &&
          fetchedData.length > 0 &&
          fetchedData.map(dataItem => (
            <option
              key={dataItem.id as string}
              value={dataItem.id as string}
              label={dataItem.title as string}
            />
          ))}
      </styled.select>
    );
  }),
);

interface MultipleSelectProps extends Omit<SimpleSelectProps, "defaultValue"> {
  defaultValue?: string[];
}

interface SelectItemProps {
  selectValue: string;
  selectLabel: string;
}

interface SelectContextValue {
  value: Set<string> | string;
  setValue: (value: string) => void;
  multiple?: boolean;
  onOptionAdd: (label: string, value: string) => void;
}

const [SelectContextProvider, useSelectContext] =
  createContext<SelectContextValue>("ContextProvider");

const MultipleSelect = React.memo(
  React.forwardRef<
    HTMLSelectElement,
    MultipleSelectProps & Omit<TailwindComponentProps<"select">, "defaultValue">
  >((props, ref) => {
    const { name, required, defaultValue, multiple, children, ...rest } = props;

    const [optionMap, setOptionMap] = React.useState(
      new Map<string, NativeOption>(),
    );

    const onOptionAdd = React.useCallback((label: string, value: string) => {
      setOptionMap(prev => {
        if (value in prev) {
          return prev;
        }
        const newOption = <option key={value} label={label} value={value} />;
        return { ...prev, [value]: newOption };
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
              setStateValue(prev => {
                const prevValue = prev as Set<string>;
                if (!prevValue.has(value))
                  return new Set([...prevValue, value]);

                const result = new Set(
                  Array.from(prevValue).filter(item => item !== value),
                );
                return result;
              });
            }
          : (value: string) => setStateValue(value),
      [multiple],
    );

    const selectContextValue: SelectContextValue = {
      value: stateValue,
      setValue: setStateFn,
      multiple: multiple,
      onOptionAdd: onOptionAdd,
    };

    return (
      <SelectContextProvider value={selectContextValue}>
        <styled.select
          name={name}
          required={required}
          multiple={multiple}
          onChange={e => console.log(e.currentTarget.value)}
          value={multiple ? Array.from(stateValue) : (stateValue as string)}
          ref={ref}
          {...rest}
        >
          {Array.from(Object.values(optionMap))}
        </styled.select>
        {children}
      </SelectContextProvider>
    );
  }),
);

function SelectPortalContent({
  fetchedData,
}: {
  fetchedData: FetchDataArrayType;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <styled.button themeName="WidgetNewButton">
          Select from dropdown
          <ChevronDownIcon />
        </styled.button>
      </Popover.Trigger>
      <Popover.Portal>
        <PopoverContent
          themeName="WidgetPopoverContent"
          sideOffset={5}
          align="start"
          hideWhenDetached={true}
          twWidth="w-[var(--radix-popover-trigger-width)]"
        >
          <styled.div themeName="SelectMultipleContainer">
            {fetchedData &&
              fetchedData.map(dataItem => (
                <SelectItem
                  themeName="SelectItem"
                  key={dataItem.id as string}
                  selectValue={dataItem.id as string}
                  selectLabel={dataItem.title as string}
                />
              ))}
          </styled.div>
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  );
}

const SelectItem = React.memo(
  React.forwardRef<
    HTMLLabelElement,
    TailwindComponentProps<"label"> & SelectItemProps
  >((props, ref) => {
    const { selectValue, selectLabel, ...rest } = props;
    const { setValue, value, multiple, onOptionAdd } = useSelectContext();
    const checked = multiple
      ? (value as Set<string>).has(selectValue)
      : selectValue === (value as string);

    React.useEffect(() => {
      onOptionAdd(selectLabel, selectValue);
    }, [onOptionAdd, selectLabel, selectValue]);

    return (
      <styled.label {...rest} ref={ref}>
        <styled.input
          type="checkbox"
          themeName="SelectCheckBox"
          checked={checked}
          onChange={() => setValue(selectValue)}
        />
        {selectLabel}
      </styled.label>
    );
  }),
);

export { SimpleSelect, MultipleSelect, SelectPortalContent };

export type { SimpleSelectProps, MultipleSelectProps };
