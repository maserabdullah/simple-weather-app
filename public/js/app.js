let frmLocation = document.querySelector(".frm-location");
let txtLocation = document.querySelector(".txt-location");
let paraOne = document.querySelector(".para-one");
let paraTwo = document.querySelector(".para-two");

window.onload = () => txtLocation.focus();
frmLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = txtLocation.value;
  paraOne.classList.remove("error");
  paraTwo.textContent = "";
  paraOne.textContent = "loading ⏳";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        paraOne.textContent = data.error;
        paraOne.classList.add("error");
        paraTwo.textContent = "";
        return;
      }
      paraOne.classList.remove("error");
      paraOne.textContent = data.location;
      paraTwo.textContent = data.forecast;
    });
});
