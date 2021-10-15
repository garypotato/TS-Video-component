let styles = require("./Video.css");

interface IVideo {
  url: string;
  elem: string | HTMLElement;
  width?: string;
  height?: string;
  autoplay?: boolean;
}

interface IComponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

function video(options: IVideo) {
  return new Video(options);
}

class Video implements IComponent {
  tempContainer;
  constructor(private settings: IVideo) {
    this.settings = Object.assign(
      { width: "100%", height: "100%", autoplay: false },
      this.settings
    );
    this.init();
  }
  init() {
    this.template();
    this.handle();
  }
  template() {
    this.tempContainer = document.createElement("div");
    this.tempContainer.className = styles.default.video;
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.innerHTML = `
        <video class="${styles.default["video-content"]}" src="${this.settings.url}"></video>
        <div class="${styles.default["video-controls"]}">
            <div class="${styles.default["video-progress"]}">
                <div class="${styles.default["video-progress-now"]}"></div>
                <div class="${styles.default["video-progress-suc"]}"></div>
                <div class="${styles.default["video-progress-bar"]}"></div>
            </div>
            <div class ="${styles.default["video-play"]}">
                <i><svg class="icon" width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"  /></svg></i>
            </div>
            <div class ="${styles.default["video-time"]}">
                <span>00:00</span> / <span>00:00</span>
            </div>
            <div class ="${styles.default["video-full"]}">
                <i><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="32px" height="32.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M358.4 768H426.666667v85.333333H213.333333v-213.333333h85.333334v68.266667l128-128 59.733333 59.733333-128 128z m345.6 0l-128-128 59.733333-59.733333 132.266667 132.266666V640h85.333333v213.333333h-213.333333v-85.333333h64zM358.4 298.666667l128 128-59.733333 59.733333-128-128V426.666667H213.333333V213.333333h213.333334v85.333334H358.4z m345.6 0H640V213.333333h213.333333v213.333334h-85.333333V354.133333l-132.266667 132.266667-59.733333-59.733333 128-128z"  /></svg></i>
            </div>
            <div class ="${styles.default["video-volume"]}">
                <i><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M830.450526 853.759999q-11.722105 8.791579-27.351579 8.791579-19.536842 0-33.701053-14.164211t-14.164211-33.701053q0-21.490526 16.606316-36.143158 0.976842-0.976842 1.953684-1.465263t1.953684-1.465263l0.976842-0.976842q27.351579-18.56 50.795789-43.957895t41.027368-55.191579 27.351579-63.494737 9.768421-69.84421q0-73.263158-37.12-133.827368t-92.8-99.637895q-20.513684-14.652632-20.513684-39.073684 0-19.536842 14.164211-33.701053t33.701053-14.164211q16.606316 0 29.305263 10.745263 36.143158 25.397895 67.402105 59.098947t53.726316 73.263158 35.166316 84.496842 12.698947 92.8q0 48.842105-12.698947 93.776842t-35.654737 84.985263-54.214737 73.751579-68.378947 59.098947zM775.747368 415.157894q20.513684 28.328421 32.72421 57.145263t12.210526 69.84421q0 39.073684-12.698947 70.332632t-32.235789 56.656842q-7.814737 10.745263-16.606316 19.048421t-22.467368 8.303158q-17.583158 0-29.793684-12.698947t-12.210526-30.282105q0-7.814737 2.930526-15.629474l-0.976842 0q4.884211-10.745263 11.722105-20.513684t13.187368-20.025263 10.745263-23.444211 4.395789-31.747368q0-17.583158-4.395789-30.770526t-10.745263-23.932632-13.187368-20.513684-10.745263-20.513684q-2.930526-6.837895-2.930526-15.629474 0-17.583158 12.210526-30.282105t29.793684-12.698947q13.675789 0 22.467368 8.303158t16.606316 19.048421zM460.227368 995.402104q-49.818947-44.934737-105.498947-93.776842t-103.545263-89.869474q-55.68-46.888421-111.36-92.8-10.745263 0.976842-21.490526 0.976842-8.791579 0.976842-18.56 0.976842l-16.606316 0q-26.374737 0-42.981053-16.117895t-16.606316-38.585263l0-246.16421 0.976842 0-0.976842-0.976842q0-27.351579 17.094737-44.934737t42.492632-17.583158l55.68 0q89.869474-76.193684 163.132631-136.757895 31.258947-26.374737 61.541053-51.28421t54.703158-45.423158 41.027368-34.189474 20.513684-16.606316q29.305263-21.490526 47.376842-19.536842t28.328421 17.583158 14.164211 38.096842 3.907368 41.027368l0 788.311578 0 2.930526q0 18.56-6.837895 39.562105t-21.002105 33.212632-35.654737 10.256842-49.818947-28.328421z" /></svg></i>
                <div class="${styles.default["video-volprogress"]}">
                    <div class="${styles.default["video-progress-now"]}"></div>
                    <div class="${styles.default["video-progress-bar"]}"></div>
                </div>
            </div>
        </div>
        `;
    if (typeof this.settings.elem === "object") {
      this.settings.elem.appendChild(this.tempContainer);
    } else {
      document
        .querySelector(`${this.settings.elem}`)
        .appendChild(this.tempContainer);
    }
  }
  handle() {
    let videoContent: HTMLVideoElement = this.tempContainer.querySelector(
      `.${styles.default["video-content"]}`
    );
    let videoControls = this.tempContainer.querySelector(
      `.${styles.default["video-controls"]}`
    );
    let videoPlay = this.tempContainer.querySelector(
      `.${styles.default["video-play"]} i`
    );
    let videoTimes = this.tempContainer.querySelectorAll(
      `.${styles.default["video-time"]} span`
    );
    let videoFull = this.tempContainer.querySelector(
      `.${styles.default["video-full"]} i`
    );
    let videoProgress = this.tempContainer.querySelectorAll(
      `.${styles.default["video-progress"]} div`
    );
    let videoVolProgress = this.tempContainer.querySelectorAll(
      `.${styles.default["video-volprogress"]} div`
    );
    let timer;

    videoContent.volume = 0.5;
    if (this.settings.autoplay) {
      timer = setInterval(playing, 1000);
      videoContent.play();
    }

    this.tempContainer.addEventListener("mouseenter", function () {
      videoControls.style.bottom = 0;
    });
    this.tempContainer.addEventListener("mouseleave", function () {
      videoControls.style.bottom = "-50" + "px";
    });

    videoContent.addEventListener("canplay", () => {
      videoTimes[1].innerHTML = formatTime(videoContent.duration);
    });
    videoContent.addEventListener("play", () => {
      timer = setInterval(playing, 1000);
    });
    videoContent.addEventListener("pause", () => {
      clearInterval(timer);
    });
    videoPlay.addEventListener("click", () => {
      if (videoContent.paused) {
        videoContent.play();
      } else if (videoContent.play) {
        videoContent.pause();
      }
    });
    videoFull.addEventListener("click", () => {
      videoContent.requestFullscreen();
    });
    videoProgress[2].addEventListener("mousedown", function (ev: MouseEvent) {
      let downX = ev.pageX;
      let downL = this.offsetLeft;
      document.onmousemove = (ev: MouseEvent) => {
        let scale =
          (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;

        if (scale < 0) {
          scale = 0;
        } else if (scale > 1) {
          scale = 1;
        }
        videoProgress[0].style.width = scale * 100 + "%";
        videoProgress[1].style.width = scale * 100 + "%";
        this.style.left = scale * 100 + "%";
        videoContent.currentTime = scale * videoContent.duration;
      };
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
      ev.preventDefault();
    });

    videoVolProgress[1].addEventListener(
      "mousedown",
      function (ev: MouseEvent) {
        let downX = ev.pageX;
        let downL = this.offsetLeft;
        document.onmousemove = (ev: MouseEvent) => {
          let scale =
            (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;

          if (scale < 0) {
            scale = 0;
          } else if (scale > 1) {
            scale = 1;
          }
          videoVolProgress[0].style.width = scale * 100 + "%";
          this.style.left = scale * 100 + "%";
          videoContent.volume = scale;
          document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
          };
          ev.preventDefault();
        };
      }
    );

    function playing() {
      let scale = videoContent.currentTime / videoContent.duration;
      let scaleSuc = videoContent.buffered.end(0) / videoContent.duration;
      videoTimes[0].innerHTML = formatTime(videoContent.currentTime);
      videoProgress[0].style.width = scale * 100 + "%";
      videoProgress[1].style.width = scaleSuc * 100 + "%";
      videoProgress[2].style.left = scale * 100 + "%";
    }

    function formatTime(number: number): string {
      number = Math.round(number);
      let min = Math.floor(number / 60);
      let sec = number % 60;
      return setZero(min) + ":" + setZero(sec);
    }
    function setZero(number: number): string {
      if (number < 10) {
        return "0" + number;
      } else {
        return "" + number;
      }
    }
  }
}

export default video;
