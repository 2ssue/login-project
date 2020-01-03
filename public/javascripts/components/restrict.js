import { Enum } from "./enum.js";

const MakeTag = {
  enrollEventListener: function() {
    this.makeHobbyTag();
  },
  makeHobbyTag: function() {
    const inputHobby = document.getElementById("hobby");
    const container = document.querySelector(".tag-container");

    inputHobby.addEventListener("keyup", () => {
      if (/,/.test(inputHobby.value)) {
        const checkInput = inputHobby.value.match(/[^,]+(?=,)/g) || "";
        const split = inputHobby.value.split(",") || "";

        for (const element of checkInput) {
          const tag = document.createElement("span");

          const tagElement = document.createElement("span");
          tagElement.innerHTML = element;
          tagElement.className = "tag-element";

          const close = document.createElement("span");
          close.innerHTML = "&times;";
          close.className = "close";

          tag.className = "tag";
          tag.appendChild(tagElement);
          tag.appendChild(close);

          container.appendChild(tag);

          close.addEventListener("click", () => {
            close.parentNode.remove();
          });

          split.shift();
        }
        inputHobby.value = split[0];
      }
    });

    inputHobby.addEventListener("keydown", e => {
      if (e.key === "Backspace" || e.key === "Delete") {
        if (
          container.hasChildNodes() &&
          inputHobby.value === Enum.NULL_CONTENT
        ) {
          e.preventDefault();
          inputHobby.value =
            container.lastElementChild.firstElementChild.innerHTML;
          container.lastElementChild.remove();
        }
      }
    });
  }
};

export default MakeTag;
