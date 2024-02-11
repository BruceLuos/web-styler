import { EditorElement } from "@/providers/editor/editor-provider";

export const findElementIndex = (
  elements: EditorElement[],
  targetElement: EditorElement
): number => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element === targetElement) {
      return i;
    }
    if (element.content && Array.isArray(element.content)) {
      const nestedIndex = findElementIndex(element.content, targetElement);
      if (nestedIndex !== -1) {
        return nestedIndex;
      }
    }
  }
  return -1;
};

export const findElement = (
  elements: EditorElement[],
  targetIndex: number
): EditorElement | undefined => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (i === targetIndex) {
      return element;
    }
    if (element.content && Array.isArray(element.content)) {
      const nestedElement = findElement(element.content, targetIndex);
      if (nestedElement) {
        return nestedElement;
      }
    }
  }
  return undefined;
};

export const findElementById = (elements: EditorElement[], id: string): EditorElement | undefined =>{
  for (const element of elements) {
    if (element.id === id) {
      return element;
    }

    if (element.content && Array.isArray(element.content)) {
      const nestedElement = findElementById(element.content, id);
      if (nestedElement) {
        return nestedElement;
      }
    }
  }

  return undefined;
}

function swapElements(array: EditorElement[], index1: number, index2: number) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  console.log('array',array)
}

export const findAndSwapElements = (
  elements: EditorElement[],
  currentElementIndex: number,
  dragElementIndex: number
) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.content && Array.isArray(element.content)) {
      // Recursively search and swap in nested content
      if (
        findAndSwapElements(
          element.content,
          currentElementIndex,
          dragElementIndex
        )
      ) {
        return true;
      }
    }

    if (currentElementIndex !== -1 && dragElementIndex !== -1) {
      // Swap the positions if both indexes are found
      swapElements(elements, currentElementIndex, dragElementIndex);
      return true;
    }
  }

  return false;
};

export const findAndSwapElementss = (
  elements: EditorElement[],
  currentElementIndex: number,
  dragElementIndex: number
) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.content && Array.isArray(element.content)) {
      if (
        findAndSwapElementss(
          element.content,
          currentElementIndex,
          dragElementIndex
        )
      ) {
        return true;
      }
    }

    if (
      i === currentElementIndex &&
      currentElementIndex !== -1 &&
      dragElementIndex !== -1
    ) {
      swapElements(elements, currentElementIndex, dragElementIndex);
      return true;
    }
  }
  console.log("elements", elements);

  return false;
};

export const findAndSwapElementss_ = (
  elements: EditorElement[],
  currentElementIndex: number,
  dragElementIndex: number
) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.content && Array.isArray(element.content)) {
      console.log('element.content是数组')
      // Recursively search and swap in nested content
      const updatedContent = findAndSwapElementss_(
        element.content,
        currentElementIndex,
        dragElementIndex
      );
      if (updatedContent.length > 0) {
        element.content = updatedContent;
        return elements;
      }
    }

    if (currentElementIndex !== -1 && dragElementIndex !== -1) {
      // Swap the positions if both indexes are found
      swapElements(elements, currentElementIndex, dragElementIndex);
      return elements;
    }
  }

  return elements;
};


export const findAndSwapElements1 = (elements:EditorElement[], index1:number, index2:number)=> {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.content) {
      if (Array.isArray(element.content) && element.content.length > 0) {
        const updatedContent = findAndSwapElements1(element.content, index1, index2);
        // @ts-ignore
        if (updatedContent !== element.content) {
        // @ts-ignore
          element.content = updatedContent;
        }
      } else {
        swapElements(elements, index1, index2);
        return elements;
      }
    }
  }

  return elements;
}