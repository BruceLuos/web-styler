import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Layers } from "lucide-react";
import React from "react";

type Props = {
  subaccountId: string;
};

/** 网页层级结构 */
const LayerTab = (props: Props) => {
  const { state, dispatch } = useEditor();
  console.log("编辑器数据", state.editor.elements);

  const handleElementClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: EditorElement
  ) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const content = (data: EditorElement[]) => {
    return data.map((ct) => {
      return (
        <AccordionContent key={ct.id} className="py-0 ">
          <AccordionItem
            value={ct.id}
            className={clsx("pl-3 pr-0 border-t-[1px] border-b-0", {
              "py-2 cursor-pointer": !Array.isArray(ct.content),
            })}
            onClick={(e) => handleElementClick(e, ct)}
          >
            {Array.isArray(ct.content) && (
              <AccordionTrigger className="!no-underline py-2">
                {ct.name}
              </AccordionTrigger>
            )}
            {Array.isArray(ct.content) ? content(ct.content) : ct.name}
          </AccordionItem>
        </AccordionContent>
      );
    });
  };

  const node = (
    <Accordion
      type="multiple"
      className="w-full"
      // defaultValue={["Layout", "Elements"]}
    >
      {state.editor.elements.map((item) => {
        return (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="px-6 py-0 border-y-[1px]"
            onClick={(e) => handleElementClick(e, item)}
          >
            <AccordionTrigger className="!no-underline py-2">
              {item.name}
            </AccordionTrigger>
            {Array.isArray(item.content) ? content(item.content) : null}
          </AccordionItem>
        );
      })}
    </Accordion>
  );

  return node;
};

export default LayerTab;
