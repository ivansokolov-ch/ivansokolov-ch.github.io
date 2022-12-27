const url = "http://localhost:8080";
const apiUrl = "https://cms.ivansokolov.ch";
const apiReqUrl = "https://req.ivansokolov.ch";

const t = window.location.href;
const locale = t.substring(t.indexOf(url)+url.length+1,t.indexOf(url)+url.length+3)

const emailInput = document.querySelector("#portfolio-request-email");
const emailSubmit = document.querySelector("#portfolio-request-submit");
const emailAnswer = document.querySelector("#portfolio-request-answer");
emailInput.addEventListener("input", (e) => {
  if (e.target.value != null && e.target.value.length > 0 && emailInput.validity.valid) {
    emailSubmit.style.opacity = "1";
    emailAnswer.innerHTML = "";
    emailAnswer.style.color = 'black';
  } else {
    emailSubmit.style.opacity = ".3";
    emailAnswer.innerHTML = locale==="en"?"Email not valid":"Email non valida";
    emailAnswer.style.color = 'red';
  }
})

emailSubmit.addEventListener("click", () => {
  if (emailInput.value != null && emailInput.value.length > 0 && emailInput.validity.valid) {
    const emailRequest = new XMLHttpRequest();
    emailRequest.overrideMimeType("application/json");
    emailRequest.open("POST", `${apiReqUrl}/send`);
    emailRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const data = { email: emailInput.value, locale };
    emailRequest.onreadystatechange = () => {
      if (emailRequest.readyState === 4 && emailRequest.status === 200) {
        emailAnswer.innerHTML = locale==="en"?"You will receive the portfolio in you email box.":"Riceverai il portfolio nella tua casella di posta";
      }
    };
    emailRequest.send(JSON.stringify(data));
  }
})

const strapiUrlToExternalUrl = (url) => {
  return `${apiUrl}${url}`;
}