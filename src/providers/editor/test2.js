function swapElements(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function findAndSwapElements(elements, index1, index2) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.content) {
      if (Array.isArray(element.content) && element.content.length > 0) {
        const updatedContent = findAndSwapElements(element.content, index1, index2);
        if (updatedContent !== element.content) {
          element.content = updatedContent;
        }
      } else {
        // console.log('eee',elements)
        swapElements(elements, index1, index2);
        return elements;
      }
    }
  }

  return elements;
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



const index1 = 0; // First index to swap
const index2 = 1; // Second index to swap

const updatedData = JSON.parse(JSON.stringify(testdata)); // Create a deep copy of the data

// findAndSwapElements(updatedData, index1, index2);

// console.log(updatedData[0].content[0].content);
console.log(findAndSwapElements(updatedData,index1,index2)[0].content[0].content)