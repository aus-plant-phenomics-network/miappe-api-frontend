import { SelectProps } from "./form.types";
import { TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { Form, FormProps, Link } from "react-router-dom";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { createBox } from "@ailiyah-ui/box";
import { InputProps } from "./form.types";
import { AddButton } from "@ailiyah-ui/button";
import { FetchDataArrayType } from "../types";
import { useFetcherData } from "../hooks";
import * as PrimitiveSelect from "../select";

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
const _Input = styled("input");
const Input = React.memo(
  React.forwardRef<HTMLInputElement, TailwindComponentProps<"input">>(
    (props, ref) => {
      const [valid, setValid] = React.useState(true);
      const { onChange, ...rest } = props;
      return (
        <_Input
          {...rest}
          ref={ref}
          onChange={e => {
            onChange && onChange(e);
            setValid(true);
          }}
          data-valid={valid ? "valid" : "invalid"}
          onInvalid={e => {
            e.preventDefault();
            setValid(false);
          }}
        />
      );
    },
  ),
);

/**
 * Renders a regular select component that accepts tailwind props
 * Styled via themeName = FormSelect
 */
const Select = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const {
      name,
      required,
      defaultValue,
      multiple,
      fetcherKey,
      titleKey,
      ...rest
    } = props;
    const fetcher = useFetcherData(fetcherKey);
    const fetchedData = (fetcher.data as FetchDataArrayType)
      ? (fetcher.data as FetchDataArrayType)
      : [];

    const defaultValueMap = fetchedData?.reduce((acc, dataItem) => {
      acc.set(dataItem.id as string, dataItem[titleKey] as string);
      return acc;
    }, new Map<string, string>());
    return (
      <styled.div themeName="FormSelectContainer">
        <PrimitiveSelect.Root
          name={name}
          required={required}
          multiple={multiple}
          placeholder="Select from dropdown"
          defaultValue={defaultValue}
          defaultValueMap={defaultValueMap}
          {...rest}
          ref={ref}
          themeName="SelectRoot"
        >
          <PrimitiveSelect.Trigger themeName="SelectTrigger">
            <PrimitiveSelect.Value themeName="SelectValue" />
            <PrimitiveSelect.Icon themeName="SelectIcon" />
          </PrimitiveSelect.Trigger>

          <PrimitiveSelect.Portal>
            <PrimitiveSelect.Content
              sideOffset={5}
              align="start"
              hideWhenDetached={true}
              themeName="SelectContent"
              twWidth="w-[var(--radix-popover-trigger-width)]"
            >
              <PrimitiveSelect.Search themeName="SelectSearch" />
              {fetchedData &&
                fetchedData.map(dataItem => (
                  <PrimitiveSelect.Item
                    themeName="SelectItem"
                    key={dataItem.id as string}
                    selectValue={dataItem.id as string}
                    textValue={dataItem[titleKey] as string}
                  />
                ))}
            </PrimitiveSelect.Content>
          </PrimitiveSelect.Portal>
        </PrimitiveSelect.Root>
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
      titleKey,
      placeholder,
      excludeId,
      ...rest
    } = props;
    const id = React.useId();

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
            excludeId={excludeId}
            titleKey={titleKey}
          />
        ) : (
          <Input
            id={id}
            {...(rest as InputProps)}
            ref={ref as React.Ref<HTMLInputElement>}
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

export { InputField, FormComponent };
