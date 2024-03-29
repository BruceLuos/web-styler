"use client";
import { Button } from "@/components/ui/button";
import { getFunnelPageDetails } from "@/lib/queries";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import React, { useEffect } from "react";
import Recursive from "./funnel-editor-components/recursive";

type Props = {
  funnelPageId: string;
  /** 实时模式 */
  liveMode?: boolean;
};

/** 网页编辑器 */
const FunnelEditor = ({ funnelPageId, liveMode }: Props) => {
  const { dispatch, state, pageDetails } = useEditor();
  console.log("编辑器的数据", state.editor);
  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  //CHALLENGE: make this more performant 13:31:12
  useEffect(() => {
    const fetchData = async () => {
      // 优化：不再需要每次进入页面都重新请求数据，
      // 之前进入funnelPageId页时已获取过一次并将数据存储到state中，所以直接可以获取pageDetails数据
      // 提升渲染性能

      const response = await getFunnelPageDetails(funnelPageId);
      // if (!response) return;
      // dispatch({
      //   type: "LOAD_DATA",
      //   payload: {
      //     elements: response.content ? JSON.parse(response?.content) : "",
      //     withLive: !!liveMode,
      //   },
      // });
      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: JSON.parse(pageDetails?.content!),
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [funnelPageId]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };
  return (
    <div
      className={clsx(
        "use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md",
        {
          "!p-0 !mr-0":
            state.editor.previewMode === true || state.editor.liveMode === true,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[420px]": state.editor.device === "Mobile",
          "w-full": state.editor.device === "Desktop",
          "!h-[calc(100%-97px)]":
            state.editor.previewMode === false &&
            state.editor.liveMode === false,
        }
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default FunnelEditor;
