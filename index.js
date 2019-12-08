document.addEventListener("DOMContentLoaded", applyClickHandlers);
let imagesFolder = null;

function init() {
  Promise.all([
    fetch("https://techi.envivent.com/names.json").then(function(res) {
      return res.json();
    }),
    fetch("https://techi.envivent.com/images.json").then(function(res) {
      return res.json();
    }),
    fetch("https://techi.envivent.com/description.json").then(function(res) {
      return res.json();
    })
  ])
    .then(function(data){
      loadProfileCards(data)
    })
    .catch(function(err){
      console.error(err, "Could not perform request")
  });
}

function loadProfileCards(employeeData) {
  const names = employeeData[0];
  const images = employeeData[1];
  const descriptions = employeeData[2];
  imagesFolder = images["images-folder"];
  const employeeCount = names.employees.length;
  const ids = [];
  do {
    const rand = Math.floor(Math.random() * employeeCount);
    if (!ids.includes(rand)) {
      ids.push(rand);
      renderCard(
        names.employees[rand],
        images.employees[rand],
        descriptions.employees[rand]
      );
    }
  } while (ids.length < 3);
}

function renderCard(name, image, description) {
  const cards = document.querySelectorAll(".profile-card");

  for (let i = 0; i < cards.length; i++) {
    const classList = cards[i].classList;
    const style = cards[i].style;
    const children = cards[i].children;
    if (!classList.contains("loaded")) {
      const fullName = name.first_name + " " + name.last_name;
      const title = description.title
      style.backgroundImage = 'url(' + imagesFolder + image.full + ')';

      if (fullName.toLowerCase() === "michelangelo buonarroti") {
        style.boxShadow = "inset 0 0 0 200px rgba(0,0,0,.25)";
      }
      if (fullName.length > 20) {
        children[0].style.fontSize = "18px";
      } else if (fullName.length > 15) {
        children[0].style.fontSize = "22px";
      }
      if (title.length > 37) {
        children[1].style.fontSize = "12px";
      }

      children[0].innerText = fullName;
      children[1].innerText = title;
      children[2].innerText = description.description;

      classList.add("loaded");

      break;
    }
  }
}
function applyClickHandlers() {
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      mobileLinks.forEach(function(link){
        link.classList.remove('active');
      })
      e.currentTarget.classList.add('active');
      toggleMobileMenu();
    });
  });

  document.querySelector(".hamburger").addEventListener("click", toggleMobileMenu);

}

function toggleMobileMenu(){
    document.querySelector('.hamburger').classList.toggle("open");
    document.querySelector(".mobile-nav").classList.toggle("active");
}
