import { EditorElement } from "@/providers/editor/editor-provider";
import React, { memo } from "react";
import TextComponent from "./text";
import Container from "./container";
import VideoComponent from "./video";
import LinkComponent from "./link-component";
import ContactFormComponent from "./contact-form-component";
import Checkout from "./checkout";

type Props = {
  element: EditorElement;
};
/** 递归组件 */
const Recursive = ({ element }: Props) => {
  console.log("element", element.type);
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "contactForm":
      return <ContactFormComponent element={element} />;
    case "paymentForm":
      return <Checkout element={element} />;
    case "2Col":
      return <Container element={element} />;
    case "__body": {
      console.log(
        "初始化时会有一个type为__body的元素, 这个元素是整个页面的根节点,所以也用container包裹起来"
      );
      return <Container element={element} />;
    }
    case "link":
      return <LinkComponent element={element} />;
    default:
      return null;
  }
};

export default memo(Recursive);
