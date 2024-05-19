import React from "react";
import { FetchDataArrayType } from "../types";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";

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
  selectId: string;
  selectState: boolean;
  setSelectState: (id: string, value: boolean) => void;
  selectLabel: string;
}

interface SelectStateType {
  [k: string]: boolean;
}

const SelectItem = React.memo(
  React.forwardRef<
    HTMLLabelElement,
    TailwindComponentProps<"label"> & SelectItemProps
  >((props, ref) => {
    const { selectId, selectState, setSelectState, selectLabel, ...rest } =
      props;
    return (
      <styled.label {...rest} ref={ref}>
        <styled.input
          type="checkbox"
          themeName="SelectCheckBox"
          checked={selectState}
          onChange={e => setSelectState(selectId, e.currentTarget.checked)}
        />
        {selectLabel}
      </styled.label>
    );
  }),
);

interface SelectContextValue {
  value: string[];
  setValue: (value: string) => void;
}

interface SelectOptionContextValue {
  onOptionAdd: (label: string, value: string) => void;
  onOptionRemoved: (label: string, value: string) => void;
}

const MultipleSelect = React.memo(
  React.forwardRef<
    HTMLSelectElement,
    MultipleSelectProps & Omit<TailwindComponentProps<"select">, "defaultValue">
  >((props, ref) => {
    const { name, required, defaultValue, fetchedData, ...rest } = props;

    const [selectValue, setSelectValue] = React.useState<Array<string>>(() => {
      if (!defaultValue) return [];
      if (!Array.isArray(defaultValue)) return [defaultValue];
      return defaultValue;
    });

    const setSelectValueFn = React.useCallback((value: string) => {
      setSelectValue(prev => {
        if (prev.includes(value)) return prev.filter(item => item === value);
        return [...prev, value];
      });
    }, []);

    return (
      <>
        <styled.select
          multiple
          onChange={e => console.log(e.currentTarget.value)}
          value={selectValue}
          name={name}
          required={required}
          ref={ref}
          themeName="FormSelectMultiple"
        >
          {fetchedData &&
            fetchedData.map(dataItem => (
              <option
                key={dataItem.id as string}
                label={dataItem.title as string}
                value={dataItem.id!}
              ></option>
            ))}
        </styled.select>
      </>
    );
  }),
);

function SelectPortalContent({ fetchedData }) {
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
                  selectId={dataItem.id as string}
                  selectState={selectStates[dataItem.id as string]}
                  selectLabel={dataItem.title as string}
                  setSelectState={setSelectStateFn}
                />
              ))}
          </styled.div>
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { SimpleSelect, MultipleSelect };

export type { SimpleSelectProps, MultipleSelectProps };
