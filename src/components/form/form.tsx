import { SelectProps } from "./form.types";
import { TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { Form, FormProps, Link } from "react-router-dom";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { createBox } from "@ailiyah-ui/box";
import { InputProps } from "./form.types";
import { AddButton } from "@ailiyah-ui/button";
import { FetchDataArrayType, SchemaType } from "../types";
import { useFetcherData } from "../hooks";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";

/**
 * Renders a div that contains the created form.
 * Styled via themeName - FormRoot
 */
const Root = createBox("FormRoot");

/** Renders a div that contains the form labels and data. Position is relative so
 * components can be positioned against this container.
 * Styled via themeName - FormContent
 */
const Content = createBox("Content", {
  twPosition: "relative",
});

/**
 * Renders a div that can contain auxiliary components such as buttons or icons.
 * Set twTopLeftBottomRight to position the components.
 */
const Component = createBox("Component", { twPosition: "relative" });

/**
 * Renders a div that contains a label and the corresponding input.
 * Styled via themeName = FormLabelGroup
 */
const LabelGroup = createBox("FormLabelGroup");

/**
 * Renders a regular label component that accepts tailwind props.
 * Styled via themeName = FormLabel
 */
const Label = styled("label");

/**
 * Renders a regular input component that accepts tailwind props
 * Styled via themeName = FormInput
 */
const Input = styled("input");

const PopoverContent = styled(Popover.Content);

interface SelectSimpleProps {
  fetchedData: FetchDataArrayType;
  name: string;
  required: boolean;
}

interface SelectMultipleProps extends SelectSimpleProps {
  defaultValue: Array<string>;
}

const SelectSimple = React.memo(
  React.forwardRef<
    HTMLSelectElement,
    SelectSimpleProps & TailwindComponentProps<"select">
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

/**
 * Renders a regular select component that accepts tailwind props
 * Styled via themeName = FormSelect
 */
const Select = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const { name, required, defaultValue, multiple, fetcherKey, ...rest } =
      props;
    const fetcher = useFetcherData(fetcherKey);
    const data = (fetcher.data as FetchDataArrayType)
      ? (fetcher.data as FetchDataArrayType)
      : [];
    return (
      <styled.div themeName="FormSelectContainer">
        {multiple ? (
          <></>
        ) : (
          <SelectSimple
            name={name}
            required={required}
            defaultValue={defaultValue}
            fetchedData={data}
            {...rest}
          />
        )}
        <Link to={`../${fetcherKey}/create`} aria-label={`${name}-create-link`}>
          <AddButton
            tooltipContent="Add"
            type="button"
            aria-label={`${name}-create-button`}
            themeName="FormCreateButton"
          />
        </Link>
      </styled.div>
    );
  }),
);

/**
 * Renders a LabelGroup with contained label and input/select components
 * Required fields has * for label and is marked required
 *
 * @param - name: name of input/select element. Field name of formData
 * @param - required: whether input/select value is required for form validation
 * @param - hidden: whether input/select and the corresponding label are hidden
 * @param - type: input type. Atm supports text, date for input, and select for select
 * @param - defaultValue - default value (from remote server for PUT request).
 * @param - fetcherKey - only for select. Used for fetching data from corresponding loader.
 * @param - labelKey - label name. Will be modified to "" if hidden and have an extra * if required.
 * @param - placeholder - placeholder value if provided
 */
const InputField = React.memo(
  React.forwardRef<
    HTMLInputElement | HTMLSelectElement,
    InputProps | SelectProps
  >((props, ref) => {
    const {
      name,
      required,
      hidden,
      type,
      defaultValue,
      fetcherKey,
      labelKey,
      placeholder,
      ...rest
    } = props;
    const id = rest.id ? rest.id : React.useId();

    return (
      <LabelGroup
        themeName={hidden ? "FormLabelGroupHidden" : "FormLabelGroup"}
      >
        <Label htmlFor={id} themeName="FormLabel">
          {labelKey}
        </Label>
        {type === "select" ? (
          <Select
            id={id}
            ref={ref as React.Ref<HTMLSelectElement>}
            {...(rest as SelectProps)}
            name={name}
            required={required}
            defaultValue={defaultValue}
            fetcherKey={fetcherKey}
            themeName="FormSelect"
          />
        ) : (
          <Input
            id={id}
            {...(rest as InputProps)}
            ref={ref}
            name={name}
            required={required}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            themeName="FormInput"
          />
        )}
      </LabelGroup>
    );
  }),
);

const FormComponent = React.forwardRef<
  HTMLFormElement,
  FormProps & TailwindProps
>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Form {...rest} ref={ref}>
      <Root themeName="FormRoot">
        <Content themeName="FormContent">{children}</Content>
        <Component themeName="FormComponent">
          <styled.button type="submit" themeName="FormSubmitButton">
            Submit
          </styled.button>
        </Component>
      </Root>
    </Form>
  );
});

FormComponent.displayName = "FormComponent";

export { InputField, FormComponent, SelectMultiple };
