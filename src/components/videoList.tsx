import { CollapseList } from "./CollapseList";

const videoConfig = [
  {
    title:
      "Mini-script support in Output Descriptors (Part 1)",
    img: "https://i.ytimg.com/vi/EYPfGw9Z14w/hqdefault.jpg",
  },
  {
    title:
      "Mini-script support in Output Descriptors (Part 1)",
    img: "https://i.ytimg.com/vi/EYPfGw9Z14w/hqdefault.jpg",
  },
  {
    title:
      "Mini-script support in Output Descriptors (Part 1)",
    img: "https://i.ytimg.com/vi/EYPfGw9Z14w/hqdefault.jpg",
  },
  {
    title:
      "P2P: Kkip netgroup diversity of new connections for tor/i2p/cjdns P2P: Kkip netgroup diversity of new connections for tor/i2p/cjdns",
    img: "https://i.ytimg.com/vi/EYPfGw9Z14w/hqdefault.jpg",
  },
  {
    title:
      "Mini-script support in Output Descriptors (Part 1)",
    img: "https://i.ytimg.com/vi/EYPfGw9Z14w/hqdefault.jpg",
  },
];

export const VideoList = () => {
  return (
    <CollapseList
      header="Checkout our videos of the previous PR reviews"
      listConfig={videoConfig.map((vid) => {
        return {
          q: (
            <div className="flex items-center text-left">
              <img className=" mr-5 h-24" src={vid.img} />
              {vid.title}
            </div>
          ),
          a: null,
        };
      })}
      disableClick
    />
  );
};
