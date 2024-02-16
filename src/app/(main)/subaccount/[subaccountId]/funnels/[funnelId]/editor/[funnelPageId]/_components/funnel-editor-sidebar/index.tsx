"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import React from "react";
import TabList from "./tabs";
import SettingsTab from "./tabs/settings-tab";
import MediaBucketTab from "./tabs/media-bucket-tab";
import ComponentsTab from "./tabs/components-tab";
import LayerTab from "./tabs/layer-tab";

type Props = {
  subaccountId: string;
};
/** 编辑器侧边栏 */
const FunnelEditorSidebar = ({ subaccountId }: Props) => {
  const { state, dispatch } = useEditor();

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full " defaultValue="Settings">
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[97px] w-16 z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden",
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden ",
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            {/* 元素属性设置 */}
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            {/* 资源库 */}
            <TabsContent value="Media">
              <MediaBucketTab subaccountId={subaccountId} />
            </TabsContent>
            <TabsContent value="Layers">
              <SheetHeader className="text-left p-6 ">
                <SheetTitle>Layer</SheetTitle>
                <SheetDescription>
                  View the editor in a tree like structure.
                </SheetDescription>
              </SheetHeader>
              <LayerTab subaccountId={subaccountId} />
            </TabsContent>
            {/* 组件 */}
            <TabsContent value="Components">
              <SheetHeader className="text-left p-6 ">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  You can drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default FunnelEditorSidebar;
