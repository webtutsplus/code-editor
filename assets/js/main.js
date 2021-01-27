const select = document.querySelector(".myselect");
const options = document.querySelectorAll(".myselect option");

// 1st method
select.addEventListener("change", function() {
  const url = this.options[this.selectedIndex].dataset.url;
  if(url) {
    location.href = url;
  }
});

for(const option of options) {
  const url = option.dataset.url;
  if(location.href.includes(url)) {
    option.setAttribute("selected", "");
    break;
  }
}

// 2nd method
/*select.addEventListener("change", function() {
  const url = this.options[this.selectedIndex].dataset.url;
  if(url) {
    localStorage.setItem("url", url);
    location.href = url;
  }
});
if(localStorage.getItem("url")) {
  for(const option of options) {
    const url = option.dataset.url;
    if(url === localStorage.getItem("url")) {
      option.setAttribute("selected", "");
      break;
    }
  }
}*/