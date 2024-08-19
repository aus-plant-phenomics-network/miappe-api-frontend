import React from "react";
import { createContext } from "../helper";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DividerVerticalIcon,
} from "@radix-ui/react-icons";
import { createButton } from "../helper";

const DividerButton = createButton(
  "DividerButton",
  <DividerVerticalIcon className="Icons" />,
);
const ChevronLeftButton = createButton(
  "ChevronLeftButton",
  <ChevronLeftIcon className="Icons" />,
);
const ChevronRightButton = createButton(
  "ChevronRightButton",
  <ChevronRightIcon className="Icons" />,
);

interface NavBarContextValue {
  activeState: boolean;
  setActiveState: React.Dispatch<React.SetStateAction<boolean>>;
}

const [NavBarProvider, useNavBarContext] =
  createContext<NavBarContextValue>("NavBar");

function getState(state: boolean): string {
  return state ? "active" : "inactive";
}

type RootProps = React.ComponentPropsWithoutRef<"div">;

const Root = React.memo(
  React.forwardRef<HTMLDivElement, RootProps>((props, ref) => {
    const { children, ...rest } = props;
    const [visible, setVisible] = React.useState(true);
    return (
      <NavBarProvider
        value={{ activeState: visible, setActiveState: setVisible }}
      >
        <div ref={ref} {...rest} data-state={getState(visible)}>
          {children}
        </div>
      </NavBarProvider>
    );
  }),
);

Root.displayName = "Root";

/**
 * Trigger to expand/collapse navigation bar
 */

interface TriggerProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {}

const Trigger = React.memo(
  React.forwardRef<HTMLButtonElement, TriggerProps>((props, ref) => {
    const { activeState, setActiveState } = useNavBarContext();
    const [hoverState, setHoverState] = React.useState<boolean>(false);

    const onClick = React.useCallback(() => {
      setActiveState(state => !state);
    }, []);

    const onMouseEnter = React.useCallback(() => {
      setHoverState(true);
    }, []);

    const onMouseLeave = React.useCallback(() => {
      setHoverState(false);
    }, []);

    const dataActiveState = React.useMemo(
      () => getState(activeState),
      [activeState],
    );
    const dataHoverState = React.useMemo(
      () => getState(hoverState),
      [hoverState],
    );

    return (
      <div {...props}>
        {activeState ? (
          !hoverState ? (
            <DividerButton
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              data-state={dataActiveState}
              data-hover={dataHoverState}
              tooltipContent="Collapse"
              ref={ref}
            />
          ) : (
            <ChevronLeftButton
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              data-state={dataActiveState}
              data-hover={dataHoverState}
              tooltipContent="Collapse"
              ref={ref}
            />
          )
        ) : (
          <ChevronRightButton
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            data-state={dataActiveState}
            data-hover={dataHoverState}
            tooltipContent="Expand"
            ref={ref}
          />
        )}
      </div>
    );
  }),
);
Trigger.displayName = "Trigger";

const Content = React.memo(
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
    (props, ref) => {
      const { children, ...rest } = props;
      const { activeState } = useNavBarContext();

      return activeState ? (
        <div ref={ref} {...rest} data-state={getState(activeState)}>
          {children}
        </div>
      ) : (
        <div ref={ref} {...rest} data-state={getState(activeState)}>
          {children}
        </div>
      );
    },
  ),
);
Content.displayName = "Content";

export { Root, Trigger, Content };
