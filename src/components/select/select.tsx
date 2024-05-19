import React from "react";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { createContext } from "@ailiyah-ui/context";
import { TailwindProps } from "@ailiyah-ui/utils";

interface SelectContextValue {
  value: Set<string> | string;
  setValue: (value: string) => void;
  multiple?: boolean;
  onOptionAdd: (option: SelectItemProps) => void;
  placeholder?: string;
}

const [SelectContextProvider, useSelectContext] =
  createContext<SelectContextValue>("ContextProvider");

type NativeOption = React.ReactElement<React.ComponentProps<"option">>;

interface SelectProps {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name: string;
  required: boolean;
  placeholder?: string;
  defaultValue?: string | string[];
}

interface SelectItemProps {
  selectValue: string;
  textValue: string;
  disabled?: boolean;
}

// const Item
// const ItemText
// const ItemIndicator

const CrossIcon = styled(Cross2Icon);

const Root = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const { defaultValue, placeholder, multiple, children, ...rest } = props;

    const [optionMap, setOptionMap] = React.useState(
      new Map<string, NativeOption>(),
    );

    const onOptionAdd = React.useCallback((option: SelectItemProps) => {
      setOptionMap(prev => {
        if (option.selectValue in prev) {
          return prev;
        }
        const newOption = (
          <option
            key={option.selectValue}
            label={option.textValue}
            value={option.selectValue}
            disabled={option.disabled}
          />
        );
        return { ...prev, [option.selectValue]: newOption };
      });
    }, []);

    const [stateValue, setStateValue] = React.useState<string | Set<string>>(
      () => {
        if (!defaultValue) return multiple ? new Set<string>() : "";
        if (!Array.isArray(defaultValue))
          return multiple ? new Set<string>([defaultValue]) : defaultValue;
        return multiple ? new Set<string>(defaultValue) : defaultValue[0];
      },
    );

    const setStateFn = React.useMemo(
      () =>
        multiple
          ? (value: string) => {
              setStateValue(prev => {
                const prevValue = prev as Set<string>;
                if (!prevValue.has(value))
                  return new Set([...prevValue, value]);

                const result = new Set(
                  Array.from(prevValue).filter(item => item !== value),
                );
                return result;
              });
            }
          : (value: string) => setStateValue(value),
      [multiple],
    );

    const selectContextValue: SelectContextValue = {
      value: stateValue,
      setValue: setStateFn,
      multiple: multiple,
      onOptionAdd: onOptionAdd,
      placeholder: placeholder,
    };

    return (
      <SelectContextProvider value={selectContextValue}>
        <styled.select
          multiple={multiple}
          onChange={e => console.log(e.currentTarget.value)}
          value={multiple ? Array.from(stateValue) : (stateValue as string)}
          ref={ref}
          themeName="SelectRoot"
          {...rest}
        >
          {Array.from(Object.values(optionMap))}
        </styled.select>
        <Popover.Root>{children}</Popover.Root>
      </SelectContextProvider>
    );
  }),
);

const Trigger = styled(Popover.Trigger, { themeName: "SelectTrigger" });

const Value = React.memo(
  React.forwardRef<HTMLSpanElement, TailwindComponentProps<"span">>(
    (props, ref) => {
      const { multiple, value, setValue, placeholder } = useSelectContext();
      let displayContent;
      if (multiple) {
        displayContent =
          Array.from(value).length !== 0
            ? Array.from(value).map(item => (
                <ValueItem key={item} value={item} onClick={setValue} />
              ))
            : placeholder;
      } else {
        displayContent = value !== "" ? value : placeholder;
      }

      return (
        <styled.span {...props} ref={ref} themeName="SelectValue">
          {displayContent}
        </styled.span>
      );
    },
  ),
);

type ValueItemProps = {
  value: string;
  onClick: (value: string) => void;
};

const ValueItem = React.memo(
  React.forwardRef<HTMLSpanElement, ValueItemProps & TailwindProps>(
    (props, ref) => {
      const { value, onClick, ...rest } = props;
      return (
        <styled.span
          ref={ref}
          {...rest}
          onClick={e => {
            e.preventDefault();
            onClick(value);
          }}
          themeName="SelectValueItem"
        >
          <CrossIcon themeName="SelectValueItemIcon" />
          {value}
        </styled.span>
      );
    },
  ),
);

const Icon = React.forwardRef<HTMLSpanElement, TailwindComponentProps<"span">>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <styled.span aria-hidden {...rest} ref={ref}>
        {children || "▼"}
      </styled.span>
    );
  },
);

const Portal = styled(Popover.Portal);

const Content = styled(Popover.Content, { themeName: "SelectContent" });

const Arrow = styled(Popover.Arrow);

const Item = React.memo(
  React.forwardRef<
    HTMLLabelElement,
    TailwindComponentProps<"label"> & SelectItemProps
  >((props, ref) => {
    const { selectValue, textValue, disabled, ...rest } = props;
    const { setValue, value, multiple, onOptionAdd } = useSelectContext();

    const checked = multiple
      ? (value as Set<string>).has(selectValue)
      : selectValue === (value as string);

    const disabledValue = disabled ? true : false;
    React.useEffect(() => {
      onOptionAdd({
        selectValue: selectValue,
        textValue: textValue,
        disabled: disabledValue,
      });
    }, [onOptionAdd, textValue, selectValue, disabledValue]);

    return (
      <styled.label {...rest} ref={ref} themeName="SelectItem">
        <styled.input
          type="checkbox"
          themeName="SelectCheckBox"
          checked={checked}
          onChange={() => (disabled ? {} : setValue(selectValue))}
        />
        {textValue}
      </styled.label>
    );
  }),
);

export { Root, Trigger, Value, Icon, Portal, Content, Arrow, Item };
