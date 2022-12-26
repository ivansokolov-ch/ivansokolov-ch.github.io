const url = "http://localhost:8080";
const apiUrl = "https://cms.ivansokolov.ch";
const apiReqUrl = "https://req.ivansokolov.ch";

const img_standard = document.querySelector("#img_standard");
const a_standard = document.querySelector("#a_standard");
const text_standard = document.querySelector("#first");
const text_third_standard = document.querySelector("#third");

const projectToRadio = (i) => {
  return `<input ${i === 0 ? "checked" : ""} type="radio" name="radio_btn" class="radiobtn" id="radio${i}"/>`;
}

const strapiUrlToExternalUrl = (url) => {
  return `${apiUrl}${url}`;
}

const fillArticle = (e, i) => {
  const article = document.createElement("article");
  if (i % 2 === 0) {
    article.innerHTML = `<div class="container_img">
            <a href="${url}/project?id=${e.id}" title="${e.attributes.Title}">
                <img alt="${e.attributes.Title}" src="${strapiUrlToExternalUrl(e.attributes.cover.data.attributes.formats.large.url)}"/>
            </a>
        </div>
        <div class="container_text">
            <div class="container_info">
                <h2 class="primary_text">${e.attributes.Title}</h2>
                <hr>
                <p style="align-self: flex-end;" class="primary_color">${e.attributes.subtitle}</p>
            </div>
        </div>`;
  } else {
    article.style.justifyContent = "flex-end";
    article.innerHTML = `<div class="container_text" style="justify-content: flex-start;">
            <div class="container_info">
                <h2 class="primary_text">
                    ${e.attributes.Title}
                </h2>
                <hr>
                <p style="align-self: flex-end;" class="primary_color">${e.attributes.subtitle}</p>
            </div>
        </div>
        <div class="container_img" style="width: 49.8%;">
            <a href="${url}/project?id=${e.id}" title="${e.attributes.Title}">
                <img alt="${e.attributes.Title}" src="${strapiUrlToExternalUrl(e.attributes.cover.data.attributes.formats.large.url)}" />
            </a>
        </div>`;
  }

  return article;
}

const projects = new XMLHttpRequest();
projects.overrideMimeType("application/json");
projects.open("GET", `${apiUrl}/api/projects?populate[0]=cover&sort[0]=id`);
projects.onreadystatechange = () => {
  if (projects.readyState === 4 && projects.status === 200) {
    const data = JSON.parse(projects.responseText).data;

    for (let i = 0; i < data.length; i++) {
      document.querySelector("main .slides").innerHTML += projectToRadio(i);
    }
    let elem = document.querySelector("main");
    for (let i = 0; i < data.length; i++) {
      document.querySelector(`#radio${i}`).addEventListener("click", () => {
        text_standard.innerHTML = data[i].attributes.Title;
        text_third_standard.innerHTML = data[i].attributes.subtitle;
        a_standard.href = `${url}/project?id=${data[i].id}`;
        img_standard.classList.remove("fade");
        setTimeout(() => {
          img_standard.classList.add("fade");
          setTimeout(() => {
            img_standard.src = strapiUrlToExternalUrl(data[i].attributes.cover.data.attributes.formats.large.url);
          }, 400);
        }, 50);
      })
      const e = fillArticle(data[i], i);

      elem.parentElement.insertBefore(e, elem.nextSibling);
      elem = e;
    }
    if (data.length > 0) {
      document.querySelector("#radio0").click();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  projects.send();
});

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
    emailAnswer.innerHTML = "Email not valid";
    emailAnswer.style.color = 'red';
  }
})

emailSubmit.addEventListener("click", () => {
  if (emailInput.value != null && emailInput.value.length > 0 && emailInput.validity.valid) {
    const emailRequest = new XMLHttpRequest();
    emailRequest.overrideMimeType("application/json");
    emailRequest.open("POST", `${apiReqUrl}/send`);
    emailRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const data = { email: emailInput.value };
    emailRequest.onreadystatechange = () => {
      if (emailRequest.readyState === 4 && emailRequest.status === 200) {
        emailAnswer.innerHTML = "You will receive the portfolio in you email box.";
      }
    };
    emailRequest.send(JSON.stringify(data));
  }
})