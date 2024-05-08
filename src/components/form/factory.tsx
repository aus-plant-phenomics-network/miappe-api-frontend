import React from "react";
import { TailwindProps } from "@ailiyah-ui/utils";
import { styled } from "@ailiyah-ui/factory";
import { createBox } from "@ailiyah-ui/box";
import { NameRequiredInputProps, InputArrayType } from "../types";
import { capitalise, toSnakeCase } from "../helpers";
import { Form, FormProps } from "react-router-dom";

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
 * Renders a div that can contain auxiliary components such as buttons or icons.
 * Set twTopLeftBottomRight to position the components.
 */
const Component = createBox("Component", { twPosition: "relative" });

/**
 * Renders a LabelGroup with contained label and input components
 * Required fields has * for label and is marked required
 */
const InputField = React.memo(
  React.forwardRef<HTMLInputElement, NameRequiredInputProps>((props, ref) => {
    let { id, name, required, ...rest } = props;
    if (!id) id = React.useId();
    let labelName = capitalise(name);
    name = toSnakeCase(name);
    if (required) labelName = labelName + "*";
    return (
      <LabelGroup themeName="FormLabelGroup">
        <Label htmlFor={id} themeName="FormLabel">
          {labelName}
        </Label>
        <Input
          {...rest}
          name={name}
          id={id}
          ref={ref}
          required={required}
          themeName="FormInput"
        />
      </LabelGroup>
    );
  })
);

/**
 * Convenient factory method to create a list of input fields from input data - Data that contains fields that
 * do not require external data fetch. Note that other more complex fields can be appended to this array for
 * form rendering
 *
 * @param data InputArrayType
 * @returns Array<InputField>
 */
const createInputArray = (data: InputArrayType): Array<React.ReactElement> => {
  return Object.entries(data).map(([key, value], _) => {
    return <InputField key={key} name={key} {...value} />;
  });
};

/**
 * Convenient factory method to create a form with field information listed in data. Data can be any arbitrary array
 * of react elements, but is typically obtained after calling createInputArray and append the resulting array with any
 * other required fields.
 *
 * @param data Array<React.ReactElement>
 * @returns a Form component that accepts form props from react-routing-dom and tailwind props
 */
const createForm = (data: Array<React.ReactElement>) => {
  const FormComponent = React.forwardRef<
    HTMLFormElement,
    Omit<FormProps, "children"> & TailwindProps
  >((props, ref) => {
    return (
      <Form {...props} ref={ref}>
        <Root themeName="FormRoot">
          <Content themeName="FormContent">{data}</Content>
          <Component themeName="FormComponent">
            <styled.button themeName="FormSubmitButton">Submit</styled.button>
          </Component>
        </Root>
      </Form>
    );
  });
  return FormComponent;
};

export { createInputArray, createForm };
