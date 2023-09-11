import React from "react";

const cities = [
  {
    id: 1,
    title: "Vienna",
  },
  {
    id: 2,
    title: "Tehran",
  },
  {
    id: 3,
    title: "Tokyo",
  },
  {
    id: 4,
    title: "Toronto",
  },
  {
    id: 5,
    title: "Paris",
  },
];

const TopMenu = (props) => {
  return (
    <div className=" flex item-center justify-around my-6">
      {cities.map(({ id, title }) => (
        <button
          key={id}
          className="text-white text-lg font-medium hover:scale-125 transition ease-out "
          onClick={() => props.onItemClick(title)}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default TopMenu;
