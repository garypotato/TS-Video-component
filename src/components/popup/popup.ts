// import "./popup.css";
let styles = require("./popup.css");
// import styles from "./popup.css";

interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content?: (content: HTMLElement) => void;
}

interface IComponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

function popup(options: Ipopup) {
  return new Popup(options);
}

class Popup implements IComponent {
  tempContainer;
  mask;
  constructor(private settings: Ipopup) {
    this.settings = Object.assign(
      {
        width: "100%",
        height: "100%",
        title: "",
        pos: "center",
        mask: true,
        content: function () {},
      },
      this.settings
    );
    this.init();
  }

  init() {
    this.template();
    this.settings.mask && this.createMask();
    this.handle();
    this.contentCallback();
  }
  template() {
    this.tempContainer = document.createElement("div");
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.className = styles.default.popup;
    this.tempContainer.innerHTML = `
    <div class="${styles.default["popup-title"]}">
        <h3>${this.settings.title}</h3>
        <i><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#2d2e2f" d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"  /></svg></i>
    </div>
    <div class="${styles.default["popup-content"]}">
    </div>
    `;
    document.body.appendChild(this.tempContainer);
    if (this.settings.pos === "left") {
      this.tempContainer.style.left = 0;
      this.tempContainer.style.top =
        window.innerHeight - this.tempContainer.offsetHeight + "px";
    } else if (this.settings.pos === "right") {
      this.tempContainer.style.right = 0;
      this.tempContainer.style.top =
        window.innerHeight - this.tempContainer.offsetHeight + "px";
    } else {
      this.tempContainer.style.left =
        (window.innerWidth - this.tempContainer.offsetWidth) / 2 + "px";
      this.tempContainer.style.top =
        (window.innerHeight - this.tempContainer.offsetHeight) / 2 + "px";
    }
  }
  handle() {
    let popupCLose = this.tempContainer.querySelector(
      `.${styles.default["popup-title"]} i`
    );
    popupCLose.addEventListener("click", () => {
      document.body.removeChild(this.tempContainer);
      this.settings.mask && document.body.removeChild(this.mask);
    });
  }
  createMask() {
    this.mask = document.createElement("div");
    this.mask.className = styles.default.mask;
    this.mask.style.width = "100%";
    this.mask.style.height = document.body.offsetHeight + "px";
    document.body.appendChild(this.mask);
  }
  contentCallback() {
    let popupContent = this.tempContainer.querySelector(
      `.${styles.default["popup-content"]}`
    );
    this.settings.content(popupContent);
  }
}

export default popup;
