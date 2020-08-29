hackathons = [
  {
    name: "Suns out Hacks Out",
    date: "",
    link: "",
  },
];

const getUserLocation = () => {
  // await fetch("https://api.radar.io/v1/track", {
  //   method: "POST",
  //   headers: {
  //     Authorization: "prj_live_pk_c53d8b2c4966cfe70dcfae0ccdc4ba8c864b3979",
  //   },
  // }).then(response => response.json());
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
