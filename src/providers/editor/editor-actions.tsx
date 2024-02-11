import { DeviceTypes, EditorElement } from "./editor-provider";

/**
 * @ADD_ELEMENT 添加元素
 * @UPDATE_ELEMENT 更新元素
 * @DELETE_ELEMENT 删除元素
 * @CHANGE_CLICKED_ELEMENT 改变选中元素
 * @CHANGE_DEVICE 改变设备
 * @TOGGLE_PREVIEW_MODE 切换预览模式
 * @TOGGLE_LIVE_MODE 切换实时模式
 * @REDO 重做
 * @UNDO 撤销
 * @LOAD_DATA 加载数据
 */
export type EditorAction =
  | {
      type: "ADD_ELEMENT";
      /**
       * @containerId 容器id
       * @elementDetails 元素详情
       */
      payload: {
        containerId: string;
        elementDetails: EditorElement;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "CHANGE_CLICKED_ELEMENT";
      payload: {
        elementDetails?:
          | EditorElement
          | {
              id: "";
              content: [];
              name: "";
              styles: {};
              type: null;
            };
      };
    }
  | {
      type: "CHANGE_DEVICE";
      payload: {
        device: DeviceTypes;
      };
    }
  | {
      type: "TOGGLE_PREVIEW_MODE";
    }
  | {
      type: "TOGGLE_LIVE_MODE";
      payload?: {
        value: boolean;
      };
    }
  | { type: "REDO" }
  | { type: "UNDO" }
  | {
      type: "LOAD_DATA";
      payload: {
        elements: EditorElement[];
        withLive: boolean;
      };
    }
  | {
      type: "SET_FUNNELPAGE_ID";
      payload: {
        funnelPageId: string;
      };
    }
  | {
      type: "UPDATE_ELEMENT_INDEX";
      /**
       * @elementId 当前元素id
       * @targetIndex 当前元素的目标位置下标
       */
      payload: {
        elementId: string;
        targetIndex: number;
      };
    };
