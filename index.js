document.addEventListener("DOMContentLoaded", applyClickHandlers);

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
    .then(function(data) {
      loadProfileCards(data);
    })
    .catch(function(err) {
      console.error(err, "Could not perform request");
    });
}

function loadProfileCards(employeeData) {
  const cards = document.querySelectorAll(".profile-card");
  const wrappers = document.querySelectorAll(".wrapper");
  const imagesFolder = employeeData[1]["images-folder"];
  const names = employeeData[0].employees;
  const images = employeeData[1].employees;
  const descriptions = employeeData[2].employees;
  const randomizerList = employeeData[0].employees.slice();

  for (let i = 0; i < 3; i++) {
    const rand = Math.floor(Math.random() * randomizerList.length);
    const index = randomizerList.splice(rand, 1)[0].id - 1;
    const children = wrappers[i].children;
    children[0].innerText =
      names[index].first_name + " " + names[index].last_name;
    children[1].innerText = descriptions[index].title;
    children[2].innerText = descriptions[index].description;
    cards[i].style.backgroundImage =
      "url(" + imagesFolder + images[index].full + ")";
  }
}

function applyClickHandlers() {
  const links = document.querySelectorAll("nav .link");
  links.forEach(function(link) {
    link.addEventListener("click", function(e) {
      links.forEach(function(link) {
        link.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      toggleMobileMenu();
    });
  });

  document
    .querySelector(".hamburger")
    .addEventListener("click", toggleMobileMenu);
}

function toggleMobileMenu() {
  document.querySelector(".hamburger").classList.toggle("open");
  document.querySelector(".links").classList.toggle("open");
}
