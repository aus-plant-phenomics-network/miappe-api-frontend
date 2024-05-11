import { FormComponentOwnProp } from "./form.types";
import { TailwindProps } from "@ailiyah-ui/utils";
import React from "react";
import { Form, FormProps } from "react-router-dom";
import { styled } from "@ailiyah-ui/factory";
import { createBox } from "@ailiyah-ui/box";
import { capitalise, toSnakeCase } from "../helpers";
import { InputProps } from "../types";

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
 * Renders a LabelGroup with contained label and input components
 * Required fields has * for label and is marked required
 * @params - hidden - hides both label and input
 * @params - required - whether input field is required
 * @params - name - name of input field
 */
const InputField = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    let { id, name, required, hidden, ...rest } = props;
    if (!id) id = React.useId();

    // Process label name and input name
    let labelName = capitalise(name);
    name = toSnakeCase(name);
    if (required) labelName = labelName + "*";

    return (
      <LabelGroup themeName="FormLabelGroup">
        <Label htmlFor={id} hidden={hidden} themeName="FormLabel">
          {labelName}
        </Label>
        <Input
          {...rest}
          hidden={hidden}
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

const FormComponent = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, "children"> & TailwindProps & FormComponentOwnProp
>((props, ref) => {
  let { children, ...rest } = props;
  return (
    <Form {...rest} ref={ref}>
      <Root themeName="FormRoot">
        <Content themeName="FormContent">{children}</Content>
        <Component themeName="FormComponent">
          <styled.button themeName="FormSubmitButton">Submit</styled.button>
        </Component>
      </Root>
    </Form>
  );
});

export { InputField, FormComponent };
