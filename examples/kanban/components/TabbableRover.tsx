import { RoverOptions, useRover, RoverHTMLProps } from "reakit";
import { createHook, createComponent } from "reakit-system";

export const useTabbableRover = createHook<RoverOptions, RoverHTMLProps>({
  name: "TabbableRover",
  compose: [useRover],

  useCompose(options, htmlProps) {
    return {
      ...useRover(options, htmlProps),
      tabIndex: 0
    };
  }
});

const TabbableRover = createComponent({
  as: "button",
  useHook: useTabbableRover
});

export default TabbableRover;
