const inputTypeCheckBox = (tag, num, className) => {
  // console.log("input tag active", tag.parentNode.parentNode.parentNode.parentNode.children[1]);
  let theInput = tag.parentNode.parentNode.parentNode.parentNode.children[1];
  let input = theInput.querySelector("input");
  //   if (num) {
  //     input = document.getElementById(`${className}_${num}`);
  //   } else {
  //     input = document.getElementById(className);
  //   }
  if (tag.checked == true) {
    input.disabled = false;
  } else if (tag.checked == false) {
    input.disabled = true;
    // console.log("omar", document.querySelectorAll(".content_dropdown-menu"));
    Array.from(document.querySelectorAll(".content_dropdown-menu")).forEach(
      (element) => {
        // console.log(element);
        element.classList.add("d-none");
      }
    );
  }
};

let dateSelectArray = [];
let daySelectArray = [];
let parentId = "";
const selectDateForOpen = (tag, bigBoxNo, smBoxNo) => {
  // console.log('small box no; ', smBoxNo);

  let day_time_in = document.getElementById(`sdays_0`);
  let day_time_in_val = JSON.parse(day_time_in.getAttribute("value")); // [[],[],[],[],[],[],[]]
  let day_value = tag.innerText.trim();

  let allDayConatiner = tag.parentNode.parentNode.parentNode.parentNode;
  let dayNames = Array.from(allDayConatiner.querySelectorAll(".dayName"));
  for (let i = 0; i < dayNames.length; i++) {
    if (dayNames[i].parentNode.parentNode !== tag.parentNode.parentNode) {
      if (dayNames[i].innerText === day_value) {
        if (dayNames[i].classList.contains("forDisable")) {
          dayNames[i].classList.remove("forDisable");
        } else {
          dayNames[i].classList.add("forDisable");
          dayNames[i].classList.remove("activeDayName");
        }

        // dayNames[i].removeAttribute("name");
      }
    }
    // else{
    //   if (dayNames[i].innerText === day_value) {
    //     dayNames[i].classList.remove("forDisable");

    //   }
    // }
  }
  // console.log(allDayConatiner);

  // console.log(day_time_in_val);

  if (Array.isArray(day_time_in_val[bigBoxNo][smBoxNo])) {
    if (day_time_in_val[bigBoxNo][smBoxNo].indexOf(day_value) !== -1) {
      // console.log("nijer modhe already present");
      let indexToRemove = day_time_in_val[bigBoxNo][smBoxNo].indexOf(day_value);
      day_time_in_val[bigBoxNo][smBoxNo].splice(indexToRemove, 1);
      tag.classList.remove("activeDayName");
    } else {
      // console.log("nijer modhe nai");
      tag.classList.add("activeDayName");
      day_time_in_val[bigBoxNo].forEach((element, index) => {
        element.forEach((ele, ind) => {
          if (ele == day_value) {
            element.splice(ind, 1);
            // console.log("after pop element ", day_time_in_val);
          }
        });
      });
      day_time_in_val[bigBoxNo][smBoxNo].push(day_value);
    }
  }
  console.log("day_time_in_val", day_time_in_val);
  day_time_in.setAttribute("value", JSON.stringify(day_time_in_val));

  day_time_in.setAttribute("placeholder", JSON.stringify(day_time_in_val));

  return;
  let allday_name = allDayParents.querySelectorAll(".dayName");
  tag.classList.toggle("activeDayName");
  let innerText = tag.innerText;
  console.log("the parent ==", tag.parentNode.parentNode.parentNode);
  let allDayParents = tag.parentNode.parentNode.parentNode;
  let allDate = allDayParents.querySelectorAll(".dayName");
  console.log(allDate);

  if (parentId != tag.parentNode.parentNode.id) {
    dateSelectArray = [];
  }

  if (tag.hasAttribute("name")) {
    tag.removeAttribute("name");

    daySelectArray[arrNum].splice(daySelectArray[arrNum].indexOf(innerText), 1);
    dateSelectArray = dateSelectArray.filter((day) => day !== innerText);
    for (let i = 0; i < allDate.length; i++) {
      if (allDate[i].parentNode.parentNode !== tag.parentNode.parentNode) {
        if (allDate[i].innerText === innerText) {
          allDate[i].classList.remove("activeDisable");
          allDate[i].classList.remove("forDisable");
          allDate[i].classList.remove("activeDayName");
          allDate[i].removeAttribute("name");
        }
      }
    }
  } else {
    tag.setAttribute("name", innerText);
    if (daySelectArray[arrNum] === undefined) {
      dateSelectArray.push(innerText);
      daySelectArray.push(dateSelectArray);
      for (let i = 0; i < allDate.length; i++) {
        if (allDate[i].parentNode.parentNode !== tag.parentNode.parentNode) {
          if (allDate[i].innerText === innerText) {
            allDate[i].classList.add("forDisable");
          }
        }
      }
    } else {
      // dateSelectArray.push(innerText);
      daySelectArray[arrNum].push(innerText);
      for (let i = 0; i < allDate.length; i++) {
        if (allDate[i].parentNode.parentNode !== tag.parentNode.parentNode) {
          if (allDate[i].innerText === innerText) {
            allDate[i].classList.add("forDisable");
          }
        }
      }
      // for (let i = 0; i < daySelectArray.length; i++) {
      // for (let j = 0; j < daySelectArray[i].length; j++) {
      // }
      // if (parentId != tag.parentNode.parentNode.id) {
      // daySelectArray.push(dateSelectArray);
      // timeSelectArray.push(newSelectTime)
      // }
      // let isSubset = dateSelectArray.every(item => daySelectArray[i].includes(item));
      // if (isSubset === true) {
      // }
      // }
    }
  }

  //   .setAttribute("value", JSON.stringify(daySelectArray));
  // console.log("daySelectArray == ", daySelectArray);

  // let dateTimeBoxs = dateTimeContainer.querySelectorAll('.dateTimeBox');
  // for (let i = 0; i < dateTimeBoxs.length; i++) {
  //    let dateNames = dateTimeBoxs[i].querySelectorAll('p');
  //    for (let i = 0; i < dateNames.length; i++) {
  //       if(dateNames[i].hasAttribute("name") && dateNames[i].classList.contains("activeDayName") && !dateSelectArray.includes(dateNames[i].innerText) ){
  //          dateSelectArray.push(dateNames[i].innerText);
  //       }
  //    }
  // }

  // let dateTimeBoxs = dateTimeContainer.querySelectorAll('.dateTimeBox')
  // for (let i = 0; i < dateTimeBoxs.length; i++) {
  //    let dateNames = dateTimeBoxs[i].querySelectorAll('p')
  //    for (let i = 0; i < dateNames.length; i++) {
  //       if(dateNames[i].hasAttribute("name") && dateNames[i].classList.contains("activeDayName") && !dateSelectArray.includes(dateNames[i].innerText) ){
  //          dateSelectArray.push(dateNames[i].innerText);
  //          if (daySelectArray.length === 0) {
  //             daySelectArray.push(dateSelectArray)
  //          }
  //          else{
  //             for (let i = 0; i < daySelectArray.length; i++) {
  //                for (let j = 0; j < daySelectArray[i].length; j++) {
  //                   const isSubset = dateSelectArray.every(item => daySelectArray.includes(item));
  //                }
  //             }
  //          }

  //       }
  //       else if(dateNames[i].innerText == innerText && !dateNames[i].hasAttribute("style") && !dateNames[i].classList.contains("activeDayName")){
  //          dateNames[i].style.backgroundColor = "rgb(145 147 150)"
  //          dateNames[i].style.color = "#fff"
  //          dateNames[i].style.cursor = "not-allowed";
  //          dateNames[i].style.pointerEvents = "none"
  //       }
  //       else if(dateNames[i].innerText == innerText && dateNames[i].hasAttribute("style")){
  //          dateNames[i].style.backgroundColor = ""
  //          dateNames[i].style.color = ""
  //          dateNames[i].style.cursor = "";
  //          dateNames[i].style.pointerEvents = ""
  //       }
  //    }
  // }
  // if (tag.hasAttribute("name")) {
  //    tag.removeAttribute("name");
  //    tag.style.backgroundColor = ""
  //    tag.style.color = ""
  //    tag.style.cursor = "";
  //    tag.style.pointerEvents = ""
  //    dateSelectArray = dateSelectArray.filter(day => day !== innerText);
  // }
  // else{
  //    tag.setAttribute("name", innerText)
  //    dateSelectArray.push(innerText)
  // }
  parentId = tag.parentNode.parentNode.id;
};

let officeTimeArr = new Array(2);
for (let i = 0; i < 7; i++) {
  officeTimeArr[i] = new Array(2);
}
const officeStartTime = (tag, serNum, timeSlodNum, bigBoxNo) => {
  
  let time_in = document.getElementById(`stimes_0`);
  time_in_val = JSON.parse(time_in.getAttribute("value"));
  time_in_val[bigBoxNo][timeSlodNum][serNum] = tag.value;
  // console.log("previous value for time input ", time_in_val);
  time_in.setAttribute("value", JSON.stringify(time_in_val));
  time_in.setAttribute("placeholder", JSON.stringify(time_in_val));
  // console.log("new value for time input ", time_in_val);
};

// get date time input value
let dateSlotCount = 0;
// let duplicateDate = 0;
const duplicateTimeSlot = (tag, boxno) => {
  dateSlotCount = dateSlotCount + 1;
  let copySlotParent = tag.parentNode.parentNode.children[0];
  let copySlot =
    tag.parentNode.parentNode.children[0].children[0].cloneNode(true);

  function collectInnerIDs(element) {
    if (element.id) {
      if (element.id.includes("_")) {
        element.id = element.id + "_" + dateSlotCount;
      } else {
        element.id = element.id + "_0_" + dateSlotCount;
      }
    }

    if (element.hasAttribute("onchange")) {
      let onchangeIS = element.getAttribute("onchange");
      var onchangeParts = onchangeIS.split("," || " ");
      // console.log("onchangeParts", onchangeParts);
      if (
        onchangeParts[0] == "officeStartTime(this" ||
        onchangeParts[0] == "officeEndTime(this"
      ) {
        element.setAttribute(
          "onchange",
          onchangeParts[0] +
            ", " +
            onchangeParts[1] +
            ", " +
            dateSlotCount +
            "," +
            boxno +
            ")"
        );
      }
    }

    if (element.hasAttribute("onclick")) {
      let onchangeIS = element.getAttribute("onclick");
      var onclickParts = onchangeIS.split("," || " ");
      let allCopySlotParent =
        tag.parentNode.parentNode.children[0].children.length;
      let _timeCopy = allCopySlotParent;
      // console.log(
      //   "allCopySlotParent",
      //   allCopySlotParent,
      //   _timeCopy,
      //   typeof allCopySlotParent
      // );
      if (onclickParts[0] == "selectDateForOpen(this") {
        element.setAttribute(
          "onclick",
          onclickParts[0] + ", " + onclickParts[1] + ", " + _timeCopy + ")"
        );
      }
    }
    for (var i = 0; i < element.children.length; i++) {
      collectInnerIDs(element.children[i]);
    }
  }
  collectInnerIDs(copySlot);
  let copySlotFirstClild = copySlot.children[0];
  let copyAllDays = copySlotFirstClild.querySelectorAll(".dayName");
  let allDays = document.querySelectorAll(".dayName");
  // console.log(allDays);
  for (let i = 0; i < allDays.length; i++) {
    if (allDays[i].parentNode.parentNode !== copySlot) {
      for (let i = 0; i < copyAllDays.length; i++) {
        if (copyAllDays[i].classList.contains("activeDayName")) {
          copyAllDays[i].classList.add("forDisable");
          copyAllDays[i].classList.remove("activeDayName");
        }
      }
    }
  }

  copySlotParent.append(copySlot);
};

let serviceCopyCount = 0;
const make_duplicate_service = (copy_block, parent_block) => {
  serviceCopyCount = serviceCopyCount + 1;
  let parent = document.getElementById(parent_block);
  let copy_service = document.getElementById(copy_block).cloneNode(true);

  copy_service.classList.add("mt-5");

  function collectInnerIDs(element) {

    
   
    if (element.name && element.name.includes("primary_image")) {
      element.setAttribute("name", `primary_image[${serviceCopyCount}]`);
    }
    if (element.name && element.name.includes("secondary_images")) {
      element.setAttribute("name", `secondary_images[${serviceCopyCount}]`);
    }
    if (element.id) {
      console.log(element.id);
      
    

      if (element.id.includes("_")) {
        let id = element.id.split("_");
        element.id = id[0] + "_" + serviceCopyCount;
      } else {
        element.id = element.id + "_" + serviceCopyCount;
      }
    }
    if (
      element.hasAttribute("onchange") &&
      element.getAttribute("onchange").includes("officeStartTime")
    ) {
      let onchangeIS = element.getAttribute("onchange");
      var onchangeParts = onchangeIS.split("," || " ");
      element.setAttribute(
        "onchange",
        onchangeParts[0] +
          "," +
          onchangeParts[1] +
          "," +
          onchangeParts[2] +
          ", " +
          serviceCopyCount +
          ")"
      );
    } else if (element.hasAttribute("onchange")) {
      let onchangeIS = element.getAttribute("onchange");
      var onchangeParts = onchangeIS.split("this");
      element.setAttribute(
        "onchange",
        onchangeParts[0] + "this, " + serviceCopyCount + ")"
      );
    }
    if (element.hasAttribute("for")) {
      let prev = element.getAttribute("for");
      if (prev.includes("_")) {
        let inputFor = prev.split("_");
        let newe = inputFor[0] + "_" + serviceCopyCount;
        element.setAttribute("for", newe);
      } else {
        let newe = prev + "_" + serviceCopyCount;
        element.setAttribute("for", newe);
      }
    }
    if (element.hasAttribute("onclick")) {
      let onchangeIS = element.getAttribute("onclick");
      var onclickParts = onchangeIS.split("," || " ");
      // console.log(onclickParts);
      if (onclickParts[0] == "inputTypeCheckBox(this") {
        if (onclickParts[2] == " 'priceInput')") {
          let ms =
            onclickParts[0] + ", " + serviceCopyCount + "," + onclickParts[2];
          element.setAttribute("onclick", ms);
        }
        if (onclickParts[2] == " 'timeInput')") {
          element.setAttribute(
            "onclick",
            onclickParts[0] + ", " + serviceCopyCount + "," + onclickParts[2]
          );
        }
        if (onclickParts[2] == " 'durationInput')") {
          element.setAttribute(
            "onclick",
            onclickParts[0] + ", " + serviceCopyCount + "," + onclickParts[2]
          );
        }
        if (onclickParts[2] == " 'availableTimeInput')") {
          element.setAttribute(
            "onclick",
            onclickParts[0] + ", " + serviceCopyCount + "," + onclickParts[2]
          );
        }
      } else if (onclickParts[0] == "selectDateForOpen(this") {
        element.setAttribute(
          "onclick",
          onclickParts[0] + ", " + serviceCopyCount + "," + onclickParts[2]
        );
      } else if (onclickParts[0].includes("duplicateTimeSlot")) {
        element.setAttribute(
          "onclick",
          onclickParts[0] + ", " + serviceCopyCount + ")"
        );
      }

      //   else if(onclickParts[0] == "showContentDropdown(1000',"){
      //     element.setAttribute(
      //         "onclick",
      //         showContentDropdown( + serviceCopyCount + "," + onclickParts[2]
      //       );
      //   }
      // if (onclickParts[0] == "save_varient(this" || onclickParts[0] == "mula(this" || onclickParts[0] == "selectOption(this" || onclickParts[0] == "showContentDropdown(0" || onclickParts[0] == "showContentDropdown(1" || onclickParts[0] == "showContentDropdown(1000" || onclickParts[0] == "table_content_dropdown_add(this" || onclickParts[0] == "deleteTableContent(this" || onclickParts[0] == "dynamicDropdown(this") {
      //     element.setAttribute("onclick", onclickParts[0] + ', ' + serviceCopyCount + ')');
      // }
    }

    for (var i = 0; i < element.children.length; i++) {
      collectInnerIDs(element.children[i]);
    }
  }

  collectInnerIDs(copy_service);

  let day_time = copy_service.querySelector(`.day_time`);
  day_time.remove();

  //  this code for duplicate spacific service
  //  let getDuplicateFunction = copy_service.children[0].children[0].children[1];
  //  getDuplicateFunction.setAttribute("onclick",`make_duplicate_service(addServices_${serviceCopyCount}, product_form)` )
  //  let onchangeIS =  getDuplicateFunction.getAttribute("onclick");

  // service Count duplicate
  let serviceCount = copy_service.querySelector(
    `#serviceCount_${serviceCopyCount}`
  );
  serviceCount.innerText = `Service ${serviceCopyCount + 1}`;

  //  clear all input
  let getNewAllInput = copy_service.querySelectorAll(`input`);
  for (let i = 0; i < getNewAllInput.length; i++) {
    if (getNewAllInput[i].type === "text") {
      getNewAllInput[i].value = "";
    } else if (
      getNewAllInput[i].type === "checkbox" &&
      getNewAllInput[i].checked === true
    ) {
      getNewAllInput[i].checked = !getNewAllInput[i].checked;
    } else if (getNewAllInput[i].type === "time") {
      getNewAllInput[i].value = "";
    }
  }

  let getNewTextarea = copy_service.querySelector(`textarea`);
  if (getNewTextarea) {
    getNewTextarea.value = "";
  }

  //  date and tine section edite
  let newDateTimeBox = copy_service.querySelector(
    `#dateTimeContainer_${serviceCopyCount}`
  );
  let firstDateTime = newDateTimeBox.children[0];
  newDateTimeBox.textContent = "";
  let copySlotFirstClild = firstDateTime.children[0];
  let allDays = copySlotFirstClild.querySelectorAll("p");
  for (let i = 0; i < allDays.length; i++) {
    if (
      allDays[i].classList.contains("activeDayName") ||
      allDays[i].classList.contains("forDisable") ||
      allDays[i].hasAttribute("style")
    ) {
      allDays[i].classList.remove("activeDayName");
      allDays[i].classList.remove("forDisable");
      allDays[i].removeAttribute("name");
      allDays[i].style.backgroundColor = "";
      allDays[i].style.color = "";
      allDays[i].style.cursor = "";
      allDays[i].style.pointerEvents = "";
    }
  }

  newDateTimeBox.append(firstDateTime);

  parent.append(copy_service);
  dateSlotCount = 0;
};

let count = 0;
// image upload function
const main_image_changed = (tag, ind) => {
  let imgTag;
  if (ind) {
    imgTag = document.getElementById(`main-img-preview_${ind}`);
  } else {
    imgTag = document.getElementById(`main-img-preview`);
  }
  // imgTag.classList.remove("d-none");
  if (tag.files && tag.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      imgTag.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(tag.files[0]);
  }
  // let imge = document.getElementById("main-img-preview");
};
const secondary_image_changed = (tag, ind) => {
  // const previewContainer = document.getElementById("secondary-img-container");
  let previewContainer;
  if (ind) {
    previewContainer = document.getElementById(
      `secondary-img-container_${ind}`
    );
  } else {
    previewContainer = document.getElementById(`secondary-img-container`);
  }
  // const previewContainer = document.querySelector(
  //     ".secondary-img-container"
  // );
  // const secondaryImageAdder = document.querySelector(
  //     ".secondary-img-container"
  // );

  // previewContainer.innerHTML = ''; // Clear previous previews
  if (tag.files && tag.files.length > 0) {
    for (let i = 0; i < tag.files.length; i++) {
      const file = tag.files[i];
      const reader = new FileReader();
      reader.onload = function (e) {
        // const input = document.createElement("input");
        // input.type = "file";
        // input.classList.add("d-none");
        // input.files[0] = reader.result;
        // input.setAttribute("name", "secondary_images[]");
        // const fileList = new DataTransfer(); // Create a new FileList object and add the selected file to it
        // fileList.items.add(file);
        // console.log('previewContainer',fileList);
        // input.files = fileList.files; // Assign the new FileList to the main page image field

        const div = document.createElement("div");
        div.style.width = "90px";
        div.style.height = "90px";
        div.style.background = `url(${e.target.result})`;
        div.style.backgroundSize = "cover";
        div.style.marginRight = "8px";
        div.style.marginBottom = "8px";

        div.classList.add("position-relative");
        const span = document.createElement("span");
        span.innerHTML =
          '<i class="fa-solid fa-circle-xmark" style="font-size:30px;color:white;border:1px solid skyblue;border-radius:50%;"></i>';
        span.classList.add("position-absolute");
        // span.setAttribute("onclick", `removeSecondaryImg(${i})`);
        span.setAttribute("onclick", `removeSecondaryImg(this)`);
        span.style.top = "0";
        span.style.right = "0px";
        span.style.cursor = "pointer";
        div.append(span);
        // const img = document.createElement("img");
        // img.src = e.target.result;
        // img.alt = `Preview Image ${i + 1}`;
        // img.style.width = "100%";
        // img.style.height = "auto";
        // console.log(img);
        div.setAttribute("id", `secondary_img_preview_${i}`);
        // div.append(input);
        // div.append(img);
        previewContainer.prepend(div);
      };
      reader.readAsDataURL(tag.files[i]);
    }
    //   previewContainer.append(secondaryImageAdder);
  }
};
const removeSecondaryImg = (tag) => {
  let parentImgContainer = tag.parentNode.parentNode;
  let imge_cotainer = tag.parentNode;
  parentImgContainer.removeChild(imge_cotainer);
};

// for add service category
let findInput = 0;
let oldDropdownContent = "";
const showContentDropdown = (tag) => {
  // console.log("the parent ==== ", tag.parentNode);
  // let dropParent = tag.parentNode
  let dropdownMenu_s = tag.parentNode.querySelector("div");
  //   if (num) {
  //     dropdownMenu_s = document.getElementById(`dropdownMenu_${id}_${num}`);
  //   } else {
  //     dropdownMenu_s = document.getElementById(`dropdownMenu_${id}`);
  //   }
  //   if (
  //     oldDropdownContent &&
  //     !oldDropdownContent.classList.contains("d-none")
  //   ) {
  //     oldDropdownContent.classList.add("d-none");
  //   }
  dropdownMenu_s.classList.toggle("d-none");
  //   findInput = id;
  oldDropdownContent = dropdownMenu_s;
};

function selectOption(tag, num) {
  let textInput;
  if (num) {
    textInput = document.getElementById(
      `contentsTitleInput_${findInput}_${num}`
    );
  } else {
    textInput = tag.parentNode.parentNode.children[0];
  }

  let text = tag.innerText;
  textInput.value = text;
  let parent = tag.parentNode;
  parent.classList.add("d-none");
}
