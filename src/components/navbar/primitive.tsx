import React from "react";
import { createContext } from "../helper";
import {
  DividerButton,
  ChevronRightButton,
  ChevronLeftButton,
} from "../helper";

/**
 * NavBar context shared among its children.
 *
 * activeState value is modified by the Trigger child component
 */
interface NavBarContextValue {
  /**
   * Active state value
   */
  activeState: boolean;
  /**
   * Dispatch method to toggle active state
   */
  setActiveState: React.Dispatch<React.SetStateAction<boolean>>;
}

// NavBar context provider and hook
const [NavBarProvider, useNavBarContext] =
  createContext<NavBarContextValue>("NavBar");

/**
 * Utility method to map state boolean value to active/inactive
 * @param state - boolean value
 * @returns - active/inactive
 */
function getState(state: boolean): string {
  return state ? "active" : "inactive";
}

type RootProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Div component that provides nav bar context to its children
 *
 */
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

interface TriggerProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {}

/**
 * Trigger component that alters activeState value onClick.
 *
 * What get rendered depends on context's `activeState` and internal `hoverState`
 *
 * If activeState is False (menu is collapsed), renders an expand button.
 *
 * If activeState is True and hoverState is True, renders a collapse button.
 *
 * If activeState is True and hoverState is False, renders a divider button.
 *
 * Accept any div props except for `children`.
 *
 */
const Trigger = React.memo(
  React.forwardRef<HTMLButtonElement, TriggerProps>((props, ref) => {
    const { activeState, setActiveState } = useNavBarContext();
    const [hoverState, setHoverState] = React.useState<boolean>(false);

    // Callback to flip activeState on click
    const onClick = React.useCallback(() => {
      setActiveState(state => !state);
    }, []);

    // Callback to change hoverState when hovered/unhovered
    const onMouseEnter = React.useCallback(() => {
      setHoverState(true);
    }, []);

    const onMouseLeave = React.useCallback(() => {
      setHoverState(false);
    }, []);

    // Variables to store active/hovered states for styling
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

/**
 * Content contains navigation bar content (children prop).
 *
 * Has a data-state variable to store active/inactive state for styling
 */
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
