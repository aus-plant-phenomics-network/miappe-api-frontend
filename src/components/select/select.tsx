import React from "react";
import { FetchDataArrayType } from "../types";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";

interface SimpleSelectProps {
  name: string;
  required: boolean;
  defaultValue?: string;
  fetchedData: FetchDataArrayType;
}

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

interface SelectMultipleProps extends Omit<SimpleSelectProps, "defaultValue"> {
  defaultValue?: string[];
}

interface SelectMultipleItemProps {
  selectState: boolean;
  setSelectState: (value: boolean) => void;
  selectLabel: string;
}

interface SelectStateType {
  [k: string]: boolean;
}

const SelectMultipleItem = React.memo(
  React.forwardRef<
    HTMLLabelElement,
    TailwindComponentProps<"label"> & SelectMultipleItemProps
  >((props, ref) => {
    const { selectState, setSelectState, selectLabel, ...rest } = props;
    return (
      <styled.label {...rest} ref={ref}>
        <styled.input
          type="checkbox"
          themeName="SelectCheckBox"
          checked={selectState}
          onChange={e => setSelectState(e.currentTarget.checked)}
        />
        {selectLabel}
      </styled.label>
    );
  }),
);

const SelectMultiple = React.memo(
  React.forwardRef<
    HTMLSelectElement,
    SelectMultipleProps & TailwindComponentProps<"select">
  >((props, ref) => {
    const { name, required, defaultValue, fetchedData, ...rest } = props;
    const [selectStates, setSelectStates] = React.useState<SelectStateType>(
      () => {
        return fetchedData
          ? Object.fromEntries(
              fetchedData.map(dataItem => [
                dataItem.id,
                defaultValue.includes(dataItem.id as string),
              ]),
            )
          : {};
      },
    );
    const setSelectStateFn = React.useMemo(
      () =>
        fetchedData
          ? Object.fromEntries(
              fetchedData.map(dataItem => [
                dataItem.id!,
                (value: boolean) => {
                  setSelectStates(prevValue => {
                    return { ...prevValue, [dataItem.id as string]: value };
                  });
                },
              ]),
            )
          : {},
      [JSON.stringify(fetchedData?.map(item => item.id))],
    );

    const selectValue: string[] = Object.keys(selectStates).filter(
      item => selectStates[item],
    );

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
        <Popover.Root>
          <Popover.Trigger asChild>
            <styled.button themeName="WidgetNewButton">
              Select from dropdown
              <ChevronDownIcon />
            </styled.button>
          </Popover.Trigger>
          <Popover.Portal>
            <PopoverContent
              className="PopoverContent"
              themeName="WidgetPopoverContent"
              sideOffset={5}
              align="start"
              hideWhenDetached={true}
            >
              <styled.div themeName="SelectMultipleContainer">
                {fetchedData &&
                  fetchedData.map(dataItem => (
                    <SelectMultipleItem
                      themeName="SelectMultipleItem"
                      key={dataItem.id as string}
                      selectState={selectStates[dataItem.id as string]}
                      selectLabel={dataItem.title as string}
                      setSelectState={setSelectStateFn[dataItem.id as string]}
                    />
                  ))}
              </styled.div>
            </PopoverContent>
          </Popover.Portal>
        </Popover.Root>
      </>
    );
  }),
);
export { SimpleSelect };

export type { SimpleSelectProps };
