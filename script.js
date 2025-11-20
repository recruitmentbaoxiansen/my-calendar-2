document.addEventListener("DOMContentLoaded", () => {
  const daysTag = document.querySelector(".days"),
        currentDate = document.querySelector(".current-date"),
        prevGif = document.getElementById("prevGif"),
        nextGif = document.getElementById("nextGif");

  let date = new Date(),
      currYear = date.getFullYear(),
      currMonth = date.getMonth();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    
    let liTag = "";

    // วันก่อนหน้า
    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // วันเดือนนี้
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = 
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear() ? "active" : "";
      liTag += `<li class="${isToday}">${i}</li>`;
    }

    // วันเดือนถัดไป เพื่อครบ 42 ช่อง
    let totalDays = liTag.match(/<li/g).length;
    for (let i = totalDays + 1; i <= 42; i++) {
      liTag += `<li class="inactive"></li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
  };

  renderCalendar();

  // ฟังก์ชันเปลี่ยนเดือน
  const changeMonth = (direction) => {
    if (direction === "prev") {
      currMonth--;
      if (currMonth < 0) {
        currMonth = 11;
        currYear--;
      }
    } else if (direction === "next") {
      currMonth++;
      if (currMonth > 11) {
        currMonth = 0;
        currYear++;
      }
    }
    renderCalendar();
  };

  // คลิก GIF ซ้าย/ขวา
  prevGif.addEventListener("click", () => changeMonth("prev"));
  nextGif.addEventListener("click", () => changeMonth("next"));
});
