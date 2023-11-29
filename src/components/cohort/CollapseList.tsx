import Collapse from "@mui/material/Collapse";
import { useState } from "react";

export const CollapseList = ({
  header,
  listConfig,
  disableClick = false,
}: {
  header: string;
  listConfig: { q: any; a: any }[];
  disableClick?: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleElementClick = (index: number) => {
    if (!disableClick) {
      if (activeIndex == index) {
        setActiveIndex(-1);
      } else {
        setActiveIndex(index);
      }
    }
  };
  return (
    <>
      <div className="mb-12 mt-6 text-5xl font-bold">
        {header}
      </div>
      <hr className="mb-8 border-spacing-12 border-dashed" />
      <ul>
        {listConfig.map((el, index) => {
          return (
            <li key={el.q} className="text-2xl">
              <button
                className="flex h-full w-full items-center justify-between p-4"
                onClick={() => handleElementClick(index)}
              >
                {el.q}
                {!disableClick && (
                  <div
                    className={` hidden text-3xl transition-transform lg:block ${
                      activeIndex == index
                        ? `rotate-45`
                        : ``
                    }`}
                  >
                    +
                  </div>
                )}
              </button>
              <Collapse
                in={activeIndex == index}
                timeout="auto"
                unmountOnExit
              >
                <div className="flex justify-between p-4">
                  {el.a}
                </div>
              </Collapse>
              <hr className="my-8 border-spacing-12 border-dashed" />
            </li>
          );
        })}
      </ul>
    </>
  );
};
