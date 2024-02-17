"use client";
import { Badge } from "@/components/ui/badge";
import { EditorBtns } from "@/lib/constants";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";
import { findElement, findElementIndex } from "../../../../utils";

type Props = {
  element: EditorElement;
};

const VideoComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const styles = props.element.styles;

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
    console.log("video组件内部的拖拽事件", type);

    const currentElements = state.editor.elements[0].content as EditorElement[];
    // const currentElementsIndex = currentElements.indexOf(props.element);
    const currentElementsIndex = findElementIndex(
      currentElements,
      props.element
    );
    const currentElement = findElement(currentElements, currentElementsIndex);

    e.dataTransfer.setData("dragElementIndex", currentElementsIndex.toString());
    console.log(currentElements, currentElementsIndex);
  };

  const handleOnDrop = (e: React.DragEvent, type: EditorBtns) => {
    e.stopPropagation();
    console.log("contact-from组件内部的拖拽放下事件", type);
    const currentElements = state.editor.elements[0].content as EditorElement[];
    // const currentElementsIndex = currentElements.indexOf(props.element);
    const currentElementsIndex = findElementIndex(
      currentElements,
      props.element
    );

    let currentElement = findElement(currentElements, currentElementsIndex);

    console.log(currentElements, currentElementsIndex);
    console.log("dragElementIdx", e.dataTransfer.getData("dragElementIndex"));
    const dragElementIndex = parseInt(
      e.dataTransfer.getData("dragElementIndex")
    );

    // dispatch({
    //   type: "UPDATE_ELEMENT_INDEX",
    //   payload: {
    //     elementId: props.element.id,
    //     targetIndex: dragElementIndex,
    //   },
    // });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      onDragOver={handleDragOver}
      onDrop={(e) => handleOnDrop(e, "video")}
      onClick={handleOnClick}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,
          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
          "!p-0": state.editor.liveMode, // 预览模式，不需要padding
          "!m-0": state.editor.liveMode, // 预览模式，不需要margin
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {!Array.isArray(props.element.content) && (
        <iframe
          width={props.element.styles.width || "560"}
          height={props.element.styles.height || "315"}
          src={props.element.content.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default VideoComponent;
