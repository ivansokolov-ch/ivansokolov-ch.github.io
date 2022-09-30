const radio1 = document.querySelector("#radio1");
const radio2 = document.querySelector("#radio2");
const radio3 = document.querySelector("#radio3");
const radio4 = document.querySelector("#radio4");
const radio5 = document.querySelector("#radio5");
const radio6 = document.querySelector("#radio6");

const img_standard = document.querySelector("#img_standard");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const img4 = document.querySelector("#img4");
const img5 = document.querySelector("#img5");
const img6 = document.querySelector("#img6");

const text_standard = document.querySelector("#first");
const text_second_standard = document.querySelector("#second");
const text_third_standard = document.querySelector("#third");

console.log(text_second_standard);

radio1.addEventListener("click", () => {
  // img_standard.src = img1.src;
  text_standard.innerHTML = "Fabri Fibra";
  text_second_standard.innerHTML = "Caos Tour - 2022";
  text_third_standard.innerHTML = "Fotografia";
});

radio2.addEventListener("click", () => {
  // img_standard.src = img2.src;
  text_standard.innerHTML = "Drytech";
  text_second_standard.innerHTML = "ADV";
  text_third_standard.innerHTML = "Regia - Montaggio";
});

radio3.addEventListener("click", () => {
  // img_standard.src = img3.src;
  text_standard.innerHTML = "Fashion";
  text_second_standard.innerHTML = "";
  text_third_standard.innerHTML = "Fotografia";
});

radio4.addEventListener("click", () => {
  // img_standard.src = img4.src;
  text_standard.innerHTML = "Anagrafe";
  text_second_standard.innerHTML = "";
  text_third_standard.innerHTML = "Direzione Artistica";
});

radio5.addEventListener("click", () => {
  // img_standard.src = img5.src;
  text_standard.innerHTML = "Moda";
  text_second_standard.innerHTML = "";
  text_third_standard.innerHTML = "Fotografia";
});

radio6.addEventListener("click", () => {
  // img_standard.src = img6.src;
  text_standard.innerHTML = "Alpen Group";
  text_second_standard.innerHTML = "";
  text_third_standard.innerHTML = "Fotografia - Video";
});

Array.from(document.getElementsByClassName("radiobtn")).forEach((item) =>
  item.addEventListener("click", (_) => {
    img_standard.classList.remove("fade");
    setTimeout(() => {
      img_standard.classList.add("fade");
      setTimeout(() => {
        console.log(window.img);
        img_standard.src = document.querySelector(`#img${item.id[5]}`).src;
      }, 400);
    }, 50);
  })
);
