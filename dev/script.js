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

radio1.addEventListener("click", () => {
  img_standard.src = img1.src;
});

radio2.addEventListener("click", () => {
  img_standard.src = img2.src;
});

radio3.addEventListener("click", () => {
  img_standard.src = img3.src;
});

radio4.addEventListener("click", () => {
  img_standard.src = img4.src;
});

radio5.addEventListener("click", () => {
  img_standard.src = img5.src;
});

radio6.addEventListener("click", () => {
  img_standard.src = img6.src;
});
