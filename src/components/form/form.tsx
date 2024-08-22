import { SelectProps } from "./form.types";
import React from "react";
import { Form, FormProps, Link } from "react-router-dom";
import { InputProps } from "./form.types";
import { AddButton } from "../helper";
import { FetchDataArrayType } from "../types";
import { useFetcherData } from "../../hooks";
import * as PrimitiveSelect from "../select";
import "../select/select.css";
import "./form.css";

/**
 * Regular Input elements with an extra data-valid attribute for styling
 *
 * @prop prop - regular input props
 */
const Input = React.memo(
  React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
    (props, ref) => {
      const [valid, setValid] = React.useState(true);
      const { onChange, ...rest } = props;
      return (
        <input
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
    const component =
      fetcher.state === "idle" && fetcher.data !== undefined ? (
        <div className="FormSelectContainer">
          <PrimitiveSelect.Root
            name={name}
            required={required}
            multiple={multiple}
            placeholder="Select from dropdown"
            defaultValue={defaultValue}
            defaultValueMap={defaultValueMap}
            {...rest}
            ref={ref}
            className="SelectRoot"
          >
            <PrimitiveSelect.Trigger className="SelectTrigger">
              <PrimitiveSelect.Value className="SelectValue" />
              <PrimitiveSelect.Icon className="SelectIcon" />
            </PrimitiveSelect.Trigger>

            <PrimitiveSelect.Portal>
              <PrimitiveSelect.Content
                sideOffset={5}
                align="start"
                side="bottom"
                hideWhenDetached={true}
                className="SelectContent"
                avoidCollisions={false}
              >
                <PrimitiveSelect.Search className="SelectSearch" />
                <div className="SelectItemContainer">
                  {fetchedData &&
                    fetchedData.map(dataItem => (
                      <PrimitiveSelect.Item
                        className="SelectItem"
                        key={dataItem.id as string}
                        selectValue={dataItem.id as string}
                        displayValue={dataItem[titleKey] as string}
                      />
                    ))}
                </div>
              </PrimitiveSelect.Content>
            </PrimitiveSelect.Portal>
          </PrimitiveSelect.Root>
          <Link
            to={`../${fetcherKey}/create`}
            aria-label={`${name}-create-link`}
          >
            <AddButton
              tooltipContent="Add"
              type="button"
              aria-label={`${name}-create-button`}
              className="FormCreateButton"
            />
          </Link>
        </div>
      ) : (
        <p>Loading</p>
      );
    return component;
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
      <div className={hidden ? "FormLabelGroupHidden" : "FormLabelGroup"}>
        <label htmlFor={id} className="FormLabel">
          {labelKey}
        </label>
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
            className="FormInput"
          />
        )}
      </div>
    );
  }),
);

const FormComponent = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <Form {...rest} ref={ref}>
        <div className="FormRoot">
          <div className="FormContent">{children}</div>
          <div className="FormComponent">
            <button type="submit" className="FormSubmitButton">
              Submit
            </button>
          </div>
        </div>
      </Form>
    );
  },
);

FormComponent.displayName = "FormComponent";

export { InputField, FormComponent };
