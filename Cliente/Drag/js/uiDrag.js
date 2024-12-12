export const uiDrag = {
  init: (config) => {
    const { parents, elements } = config;

    uiDrag.initializeDraggAbleParents(parents);
    uiDrag.initializeDraggAbleElements(elements);
  },

  initializeDraggAbleParents: (parentsData) => {
    parentsData.forEach((parentData) => {
      const nodeParent = document.getElementById(parentData.id);

      nodeParent.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      nodeParent.addEventListener("drop", (event) => {
        event.preventDefault();

        const dataElement = JSON.parse(event.dataTransfer.getData("text"));

        const nodeElement = document.getElementById(dataElement.id);

        const rectParent = nodeParent.getBoundingClientRect();
        const offsetX = event.clientX - rectParent.left;
        const offsetY = event.clientY - rectParent.top;

        nodeElement.style.position = "absolute";
        nodeElement.style.left = `${offsetX - dataElement.offsetX}px`;
        nodeElement.style.top = `${offsetY - dataElement.offsetY}px`;
        nodeElement.style.backgroundColor = parentData.color;

        if (!event.target.contains(nodeElement)) {
          event.target.appendChild(nodeElement);
        }
      });
    });
  },

  initializeDraggAbleElements: (elementsData) => {
    let i = 1;
    elementsData.forEach((elementData) => {
      const nodeElements = document.querySelectorAll(elementData.getClass);
      nodeElements.forEach((nodeElement) => {
        nodeElement.setAttribute("draggable", "true");
        nodeElement.setAttribute("id", `element${i}`);
        i++;
        nodeElement.addEventListener("dragstart", (event) => {
          const rect = event.target.getBoundingClientRect();
          const styles = {
            id: event.target.id,
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
          };
          event.dataTransfer.setData("text", JSON.stringify(styles));
        });
      });
    });
  },
};
