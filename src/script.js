import "./index.css";

const data = [
  [0, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];

const boxes = data.flat(Infinity);
let clickStack = [];

const container = document.getElementById("container");
boxes?.forEach((box, index) => {
  const newBox = document.createElement("div");
  const isVisible = box === 1;
  newBox.classList.add("box", isVisible ? "visible" : "hidden");
  newBox.setAttribute("key", index);
  //click boxes
  newBox.addEventListener("click", async () => {
    if (!isVisible) return;
    if (clickStack.indexOf(index) !== -1) {
      const filteredStack = clickStack.filter((item) => item !== index);
      clickStack = filteredStack;
      newBox.classList.remove("marked");
    } else {
      clickStack.push(index);
      newBox.classList.add("marked");
    }
    //deselect boxes, when all boxes are selected
    await popping();
  });
  container.appendChild(newBox);
});

// deselect boxes funciton
async function popping() {
  const visibleBoxes = document.querySelectorAll(".visible");
  const allBoxes = document.querySelectorAll(".box");
  if (clickStack.length === visibleBoxes.length) {
    while (clickStack.length !== 0) {
      const elemIndex = clickStack.pop();
      const elem = allBoxes[elemIndex];
      await new Promise((resolve) => setTimeout(resolve, 250));
      elem && elem?.classList?.remove("marked");
    }
  }
}
