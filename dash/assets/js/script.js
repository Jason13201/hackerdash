const getUserLocation = () => {
  return new Promise(resolve => {
    window.navigator.geolocation.getCurrentPosition(resolve, console.error);
  });
};

function initMap() {
  getUserLocation().then(loc => {
    const { latitude: lat, longitude: lng } = loc.coords;
    const currentPos = { lat, lng };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: currentPos,
    });
    const marker = new google.maps.Marker({ position: currentPos, map: map });
  });
}

const generateHackathonList = () => {
  hackathons.length = 8;
  const hHtml = hackathons
    .map(
      hackathon =>
        `<div class="item">
    <a href="${hackathon.link}" class="ui tiny image">
      <img
        src="${hackathon.image}"
      />
    </a>
    <div class="content">
      <a href="${hackathon.link}" class="header">${hackathon.name}</a>
      <div class="description">
        <p>
          ${hackathon.desc}. Date: ${hackathon.date}
        </p>
      </div>
    </div>
  </div>`
    )
    .join("");
  document.querySelector(".content .ui.items").insertAdjacentHTML("beforeend", hHtml);
};

const generateNewsList = () => {
  news.length = 9;
  const hHtml = news
    .map(
      newss =>
        `<div class="item">
    <a href="${newss.link}" class="ui tiny image">
      <img
        src="${newss.image}"
      />
    </a>
    <div class="content">
      <a href="${newss.link}" class="header">${newss.name}</a>
      <div class="description">
        <p>
          ${newss.desc}.
        </p>
      </div>
    </div>
  </div>`
    )
    .join("");
  document.querySelector(".news .ui.items").insertAdjacentHTML("beforeend", hHtml);
};

generateNewsList();
generateHackathonList();
