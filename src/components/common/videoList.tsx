import type { VideoConfigType } from "../../scripts/googleApi";
import { CollapseList } from "../cohort/CollapseList";

export const VideoList = ({
  videoConfig,
}: {
  videoConfig: VideoConfigType;
}) => {
  return (
    <>
      <CollapseList
        header="Checkout our videos of the previous PR reviews"
        listConfig={videoConfig?.map((vid) => {
          return {
            q: (
              <a
                className="flex text-sm lg:text-xl items-center text-left "
                href={vid.link}
                target="_blank"
              >
                <img className=" mr-5 h-24" src={vid.img} alt={vid.title} />
                {vid.title}
              </a>
            ),
            a: null,
          };
        })}
        disableClick
      />
      <div className="mb-6 flex w-full justify-center">
        <a
          className=" cursor-pointer hover:underline"
          href="https://www.youtube.com/playlist?list=PLdHBT9oS8yMW9rp2_plnJVPYAEAIrDmVL"
          target="_blank"
        >
          See all videos
        </a>
      </div>
    </>
  );
};
