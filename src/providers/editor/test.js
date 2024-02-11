function swapElements(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function findAndSwapElements(elements) {
  let videoIndex = -1;
  let contactFormIndex = -1;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.type === "video") {
      videoIndex = i;
    } else if (element.type === "contactForm") {
      contactFormIndex = i;
    }

    if (videoIndex !== -1 && contactFormIndex !== -1) {
      // Swap the positions if both indexes are found
      swapElements(elements, videoIndex, contactFormIndex);
      return true;
    }

    if (element.content && Array.isArray(element.content)) {
      // Recursively search and swap in nested content
      if (findAndSwapElements(element.content)) {
        return true;
      }
    }
  }

  return false;
}

const data = [
  {
    content: [
      {
        content: [
          {
            content: {
              src: "https://www.youtube.com/embed/A3l6YYkXzzg?si=zbcCeWcpq7Cwf8W1",
            },
            id: "9e5cb56c-582b-4a2e-b6ad-310e7a6a3747",
            name: "Video",
            styles: {},
            type: "video",
          },
          {
            content: [],
            id: "06e65185-8b42-4c86-990e-f5734abf7abe",
            name: "Contact Form",
            styles: {},
            type: "contactForm",
          },
        ],
        id: "879266c3-bf3d-464b-ab4d-cd21663770b2",
        name: "Container",
        styles: {
          backgroundPosition: "center",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          textAlign: "left",
          opacity: "100%",
        },
        type: "container",
      },
    ],
    id: "__body",
    name: "Body",
    styles: {
      backgroundColor: "white",
    },
    type: "__body",
  },
];

const elements = data[0].content; // Accessing the content array
// const elements = data; // Accessing the content array

// findAndSwapElements(elements);

// console.log(data[0].content[0]); // Updated data with swapped positions

function findAndSwapElements_(elements, currentElementIndex, dragElementIndex) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.content && Array.isArray(element.content)) {
      // Recursively search and swap in nested content
      if (
        findAndSwapElements_(
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
}

// findAndSwapElements_(elements, 1, 0);
// console.log(data[0].content[0]); // Updated data with swapped positions

function findAndSwapElementss(elements, currentElementIndex, dragElementIndex) {
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

  return false;
}

const testdata = [
  {
    content: [
      {
        content: [
          {
            content: {
              src: "https://www.youtube.com/embed/A3l6YYkXzzg?si=zbcCeWcpq7Cwf8W1",
            },
            id: "9b9b7c13-7f54-455b-bb03-1e30c7eb2e57",
            name: "Video",
            styles: {},
            type: "video",
          },
          {
            content: [],
            id: "ec0eb158-b7a4-45a9-b098-28e9981db2e3",
            name: "Contact Form",
            styles: {},
            type: "contactForm",
          },
        ],
        id: "c8534602-f5c2-447e-be1b-c36c84951e7a",
        name: "Container",
        styles: {
          backgroundPosition: "center",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          textAlign: "left",
          opacity: "100%",
        },
        type: "container",
      },
    ],
    id: "__body",
    name: "Body",
    styles: {
      backgroundColor: "white",
    },
    type: "__body",
  },
];

// findAndSwapElementss(testdata, 1, 0);
// console.log(testdata, testdata[0].content[0]); // Updated data with swapped positions

const findAndSwapElementss_ = (
  elements,
  currentElementIndex,
  dragElementIndex
) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.content && Array.isArray(element.content)) {
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

// findAndSwapElementss_(testdata[0].content, 1, 0);
console.log(findAndSwapElementss_(testdata[0].content, 1, 0)); // Updated data with swapped positions
