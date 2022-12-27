const text_standard = document.querySelector("#first");
const text_third_standard = document.querySelector("#third");
const description = document.querySelector("#description");

const contentToSection = (d) => {
  const section = document.createElement("section");
  if (d.attributes.centerImage.data == null && d.attributes.centerHTML == null) {
    let html = "<div style=\"width: 16.6%;\"></div>";
    if (d.attributes.leftImage.data == null) {
      html += `<div style="display: flex;width:33vw;align-items: center;">
    ${d.attributes.leftHTML}
</div>`
    } else {
      html += `<img alt="${d.attributes.leftImageAlt}" src="${strapiUrlToExternalUrl(d.attributes.leftImage.data.attributes.formats.large.url)}" style="width:33vw;position: relative;"/>`
    }
    html += `<div style="width: 16.6%;"></div>`;
    if (d.attributes.rightImage.data == null) {
      html += `<div style="display: flex;width:33vw;align-items: center;">${d.attributes.rightHTML}</div>`
    } else {
      html += `<img alt="${d.attributes.rightImageAlt}" src="${strapiUrlToExternalUrl(d.attributes.rightImage.data.attributes.formats.large.url)}" style="width:33vw;position:relative;top:13rem;"/>`
    }
    section.style.marginTop = "15rem !important";
    section.style.display = "flex";
    section.innerHTML = html;
  } else {
    if (d.attributes.centerImage.data != null) {
      section.style.display = "flex";
      section.style.justifyContent = "center"
      section.style.flexDirection = "column";
      section.style.marginTop = "0";
      section.innerHTML = `<div style="display: flex;padding-left: 16.6%; margin-top: 2rem;">
    <div style="width: 16.6vw;display: flex;align-items: center;">
        <p class="primary_text">${d.attributes.leftHTML || ""}</p>
    </div>
    <img src="${strapiUrlToExternalUrl(d.attributes.centerImage.data.attributes.formats.large.url)}" alt="${d.attributes.centerImageAlt}" style="width: 33vw"/>
</div>`
    } else {
      section.innerHTML = `<div style="display: flex;padding-left: 16.6%; margin-top: 2rem;">
    <div style="width: 16.6vw;display: flex;align-items: center;">
        <p class="primary_text">${d.attributes.leftHTML || "ss"}</p>
    </div>
    <div style="width: 33vw;">${d.attributes.centerHTML}</div>
</div>`
    }
  }

  return section;
}

const id = window.location.href.substring(window.location.href.indexOf("id") + 3);
const project = new XMLHttpRequest();
project.overrideMimeType("application/json");
project.open("GET", `${apiUrl}/api/projects/${id}?populate[contents][populate][0]=rightImage&populate[contents][populate][1]=centerImage&populate[contents][populate][2]=leftImage&populate[contents][sort][0]=weight&locale=${locale}`);
project.onreadystatechange = () => {
  if (project.readyState === 4 && project.status === 200) {
    const data = JSON.parse(project.responseText).data;
    text_standard.innerHTML = data.attributes.Title;
    text_third_standard.innerHTML = data.attributes.subtitle;
    description.innerHTML = data.attributes.description;

    const c = data.attributes.contents.data;
    let elem = document.querySelector("header");
    for (let i = 0; i < c.length; i++) {
      console.log(c[i]);
      const e = contentToSection(c[i]);
      elem.parentElement.insertBefore(e, elem.nextSibling);
      elem = e;
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  project.send();
});