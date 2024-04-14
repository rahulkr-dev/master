// for very first time

// Interaction observer for infinite scroll
const options = {
  root: document.querySelector("#scrollArea"),
};
const observerCallback = (entries, observer) => {
  if (entries[0].isIntersecting) {
    const targetEle = entries[0].target;
    console.log("Element is intersecting", Date.now());
    observer.unobserve(targetEle);
    creatingMultipleChildren(10, "scrollArea");
  }
};
let scrollObserver = new IntersectionObserver(observerCallback, options);

function creatingMultipleChildren(noOfEl, parentId) {
  let parentContainer = document.getElementById(parentId);
  for (let i = 0; i < noOfEl; i++) {
    const bgColor = i <= 9 ? i * 100 : Math.floor(Math.random() * 100);
    const textColor = Math.floor(bgColor - 900);
    let childContainer = document.createElement("div");
    childContainer.setAttribute("id", `child${i}`);
    childContainer.setAttribute(
      "class",
      `border-2 p-4 py-12 bg bg-gray-${bgColor} text-gray-${textColor}`
    );
    childContainer.innerHTML = `Child ${i}`;
    parentContainer.appendChild(childContainer);
    if (i === noOfEl - 1) {
      scrollObserver.observe(childContainer);
    }
  }
}

creatingMultipleChildren(10, "scrollArea");
