"use client";
import ContactForm from "@/components/forms/contact-form";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { EditorBtns } from "@/lib/constants";
import {
  getFunnel,
  saveActivityLogsNotification,
  upsertContact,
} from "@/lib/queries";

import { ContactUserFormSchema } from "@/lib/types";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import { z } from "zod";
import { findElementIndex, findElement } from "../../../../utils";

type Props = {
  element: EditorElement;
};

const ContactFormComponent = (props: Props) => {
  const { dispatch, state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    console.log("contact-from组件内部的拖拽事件", type, props.element);
    e.dataTransfer.setData("componentType", type);

    const currentElements = state.editor.elements[0].content as EditorElement[];
    // const currentElementsIndex = currentElements.indexOf(props.element);
    const currentElementsIndex = findElementIndex(
      currentElements,
      props.element
    );
    const currentElement = findElement(currentElements, currentElementsIndex);
    e.dataTransfer.setData("dragElementIndex", currentElementsIndex.toString());
    console.log(currentElements, currentElementsIndex, currentElement);
  };

  const handleOnDrop = (e: React.DragEvent, type: EditorBtns) => {
    e.stopPropagation();
    console.log(
      "contact-from组件内部的拖拽放下事件",
      type,
      "编辑器数据",
      state
    );
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

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const styles = props.element.styles;

  const goToNextPage = async () => {
    if (!state.editor.liveMode) return;
    const funnelPages = await getFunnel(funnelId);
    if (!funnelPages || !pageDetails) return;
    if (funnelPages.FunnelPages.length > pageDetails.order + 1) {
      const nextPage = funnelPages.FunnelPages.find(
        (page) => page.order === pageDetails.order + 1
      );
      if (!nextPage) return;
      router.replace(
        `${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`
      );
    }
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const onFormSubmit = async (
    values: z.infer<typeof ContactUserFormSchema>
  ) => {
    if (!state.editor.liveMode) return;

    try {
      const response = await upsertContact({
        ...values,
        subAccountId: subaccountId,
      });
      //WIP Call trigger endpoint
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `A New contact signed up | ${response?.name}`,
        subaccountId: subaccountId,
      });
      toast({
        title: "Success",
        description: "Successfully Saved your info",
      });
      await goToNextPage();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Could not save your information",
      });
    }
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      onDragOver={handleDragOver}
      onDrop={(e) => handleOnDrop(e, "contactForm")}
      onClick={handleOnClickBody}
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
      <ContactForm
        subTitle="Contact Us"
        title="Want a free quote? We can help you"
        apiCall={onFormSubmit}
      />
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

export default ContactFormComponent;
