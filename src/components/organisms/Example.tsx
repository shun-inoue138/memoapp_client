import clsx from "clsx";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

//todo:ログイン済みの場合と未ログインの場合で、保存場所をDBとlocalStorageで分ける

const DragDiv: FC<{ id: number }> = ({ id }) => {
  useLayoutEffect(() => {
    const topKey = `top-${id}`;
    const leftKey = `left-${id}`;
    const top = localStorage.getItem(topKey);
    const left = localStorage.getItem(leftKey);
    if (top && left) {
      setTopAndLeft({ top: parseInt(top), left: parseInt(left) });
    }
  }, []);
  const [topAndLeft, setTopAndLeft] = useState({ top: 20, left: 20 });
  const [collected, drag, dragPreview] = useDrag(
    {
      type: "box",
      item: { top: topAndLeft.top, left: topAndLeft.left, setTopAndLeft, id },
    },
    [topAndLeft]
  );

  return (
    <div
      className={clsx("bg-slate-50 border border-black p-4 absolute ")}
      style={topAndLeft}
      ref={drag}
    >
      {`DragDiv ${id}`}
    </div>
  );
};

const Example = () => {
  const [collectedDrop, drop] = useDrop({
    accept: "box",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      item.setTopAndLeft({ left, top });
      const topKey = `top-${item.id}`;
      const leftKey = `left-${item.id}`;
      localStorage.setItem(topKey, top.toString());
      localStorage.setItem(leftKey, left.toString());
      return undefined;
    },
  });

  return (
    <div className=" bg-slate-400 w-[600px] h-[600px] relative" ref={drop}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <DragDiv key={i} id={i} />
      ))}
    </div>
  );
};

export default Example;
