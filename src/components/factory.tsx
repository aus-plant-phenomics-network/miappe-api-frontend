import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { createBox } from "@ailiyah-ui/box";
import React from "react";

const Root = createBox("FormRoot", { themeName: "FormRoot" });
const Content = createBox("Content", {
  twPosition: "relative",
  themeName: "FormContent",
});
const LabelGroup = createBox("FormLabelGroup", { themeName: "FormLabelGroup" });
const Label = styled("label", { themeName: "FormLabel" });
const Input = styled("input", { themeName: "FormInput" });
const Component = createBox("Component", { twPosition: "relative" });

interface NameRequiredInputProps
  extends Omit<TailwindComponentProps<"input">, "name"> {
  name: string;
}

const capitalise = (text: string) => {
  let newText = text.toLowerCase();
  return newText[0].toUpperCase() + newText.slice(1);
};

const InputField = React.memo(
  React.forwardRef<HTMLInputElement, NameRequiredInputProps>((props, ref) => {
    let { id, name, required, ...rest } = props;
    if (!id) id = React.useId();
    let labelName = capitalise(name);
    if (required) labelName = labelName + "*";
    return (
      <LabelGroup>
        <Label htmlFor={id}>{labelName}</Label>
        <Input {...rest} name={name} id={id} ref={ref} />
      </LabelGroup>
    );
  })
);

interface InputType {
  type: React.HTMLInputTypeAttribute;
  required: boolean;
  placeholder?: string;
}

interface InputArrayType {
  [name: string]: InputType;
}

const createInputArray = (data: InputArrayType): Array<React.ReactElement> => {
  return Object.entries(data).map(([key, value], _) => {
    return <InputField key={key} name={key} {...value} />;
  });
};

const createForm = (data: Array<React.ReactElement>) => {
  return (
    <form>
      <Root>
        <Content>{data}</Content>
        <Component themeName="FormComponent">
          <styled.button themeName="FormSubmitButton">Submit</styled.button>
        </Component>
      </Root>
    </form>
  );
};

export {
  createForm,
  createInputArray,
  Root,
  Component,
  Content,
  Label,
  Input,
  InputField,
};
export type { InputArrayType, InputType, NameRequiredInputProps };
