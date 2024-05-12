import { FormComponentOwnProp, SelectProps } from "./form.types";
import { TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { Form, FormProps, useFetcher, Link } from "react-router-dom";
import { styled } from "@ailiyah-ui/factory";
import { createBox } from "@ailiyah-ui/box";
import { capitalise, removeId } from "../helpers";
import { InputProps } from "./form.types";
import { AddButton } from "@ailiyah-ui/button";
import { DataType } from "../../handlers";

const useFetcherData = (url: string) => {
  const fetcher = useFetcher({ key: url });
  React.useEffect(() => {
    console.log("Fetcher load " + url);
    fetcher.load(`../${url}`);
  }, []);
  return fetcher;
};

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

/**
 * Renders a regular select component that accepts tailwind props
 * Styled via themeName = FormSelect
 */
const Select = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const { name, ...rest } = props;
    const url = removeId(name);
    const fetcher = useFetcherData(url);
    const data = fetcher.data
      ? (fetcher.data as unknown as Array<DataType> | null)
      : [];

    return (
      <styled.div themeName="FormSelectContainer">
        <styled.select
          {...rest}
          name={name}
          aria-label={`${name}-select`}
          ref={ref}
        >
          <option value="" hidden label="Select from dropdown" />
          {data &&
            data.map(dataItem => (
              <option
                key={dataItem.id}
                value={dataItem.id}
                label={dataItem.title}
              />
            ))}
        </styled.select>
        <Link to={`../${url}/create`} aria-label={`${name}-create-link`}>
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
 * Renders a LabelGroup with contained label and input components
 * Required fields has * for label and is marked required
 * @params - hidden - hides both label and input
 * @params - required - whether input field is required
 * @params - name - name of input field
 */
const InputField = React.memo(
  React.forwardRef<
    HTMLInputElement | HTMLSelectElement,
    InputProps | SelectProps
  >((props, ref) => {
    const { name, required, hidden, type, ...rest } = props;
    const id = rest.id ? rest.id : React.useId();

    // Process label name and input name
    let labelName = removeId(capitalise(name));
    if (required) labelName = labelName + "*";

    return (
      <LabelGroup themeName="FormLabelGroup">
        <Label htmlFor={id} hidden={hidden} themeName="FormLabel">
          {hidden ? "" : labelName}
        </Label>
        {type === "select" ? (
          <Select
            {...(rest as SelectProps)}
            hidden={hidden}
            name={name}
            id={id}
            ref={ref as React.Ref<HTMLSelectElement>}
            required={required}
            themeName="FormSelect"
          />
        ) : (
          <Input
            {...(rest as InputProps)}
            type={type}
            hidden={hidden}
            name={name}
            id={id}
            ref={ref}
            required={required}
            themeName="FormInput"
          />
        )}
      </LabelGroup>
    );
  }),
);

const FormComponent = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, "children"> & TailwindProps & FormComponentOwnProp
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

export { InputField, FormComponent, useFetcherData };
