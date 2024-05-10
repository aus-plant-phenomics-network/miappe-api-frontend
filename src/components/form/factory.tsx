import React from "react";
import { TailwindProps } from "@ailiyah-ui/utils";
import { styled } from "@ailiyah-ui/factory";
import { createBox } from "@ailiyah-ui/box";
import { InputProps } from "../types";
import { AbstractDataType, AbstractSchemaType } from "../../handlers";
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

const processDate = (value: string) => value.substring(0, 10);
const processText = (value: string | number) => value.toString();

const getDefaultValue = (
  type: string,
  value: string | number | undefined | null | Date
): string => {
  if (value) {
    switch (type) {
      case "date":
        return processDate(value as string);
      default:
        return processText(value as string);
    }
  }
  return "";
};

/**
 * Convenient factory method to create a list of input fields from input data - Data that contains fields that
 * do not require external data fetch. Note that other more complex fields can be appended to this array for
 * form rendering
 *
 * @params - schema - input schema
 * @params - exclude - input fields to exclude from creation
 * @params - data - data to initialise field value
 * @returns Array<InputField>
 */
const createInputArray = <T extends AbstractDataType>(
  schema: AbstractSchemaType<T>,
  exclude: Array<String> = [],
  data?: T | null
): Array<React.ReactNode> => {
  return Object.entries(schema)
    .filter(([key, _]) => !exclude.includes(key))
    .map(([key, value], _) => {
      const schemaType = schema[key].type;
      const defaultDataValue = data ? data[key] : undefined;
      const hidden = key === "id";
      return (
        <InputField
          hidden={hidden}
          key={key}
          name={key}
          {...value}
          defaultValue={getDefaultValue(schemaType, defaultDataValue)}
        />
      );
    });
};

interface FormComponentOwnProp {
  children: React.ReactNode;
}

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

export { createInputArray, getDefaultValue, FormComponent };
