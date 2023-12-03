// const { functions } = require("lodash");

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



// js for single image and carosel image delete
const deleteSliderSingleImg = (tag) => {
  let deletedNode = tag.parentNode;
  let deleteFromParentNode = tag.parentNode.parentNode;

  if (deletedNode) {
    deleteFromParentNode.removeChild(deletedNode);
    topUploadParent.style.display = "block";
  }
};
function getCombinations(arrays, prefix = [], results = []) {
  if (prefix.length === arrays.length) {
    results.push(prefix.slice());
    return;
  }

  for (let i = 0; i < arrays[prefix.length].length; i++) {
    prefix.push(arrays[prefix.length][i]);
    getCombinations(arrays, prefix, results);
    prefix.pop();
  }

  return results;
}

const mula = (tag, num) => {
  let labelParent;
  let table;
  let tableHeadTr;

  if (num) {
    labelParent = document.getElementById(`varient_container__${num}`);
    table = document.getElementById(`product_table_${num}`);
    tableHeadTr = document.getElementById(`tableHeadTr_${num}`);
  } else {
    labelParent = document.getElementById(`varient_container_`);
    table = document.getElementById(`product_table`);
    tableHeadTr = document.getElementById(`tableHeadTr`);
  }
  let all_varient_table_labels = tableHeadTr.querySelectorAll(
    ".varient_table_label"
  );

  Array.from(all_varient_table_labels).forEach((element) => {
    element.remove();
  });

  let varient_labels = labelParent.querySelectorAll("label");
  let varient_uls = labelParent.querySelectorAll(".colorInputUL");

  //  for (let i = 0; i < varient_labels.length; i++) {
  //     const element = varient_labels[i];
  //     console.log("varient_labels == ", varient_labels[i]);
  //  }
  //  for (let i = 0; i < varient_uls.length; i++) {
  //     const element = varient_uls[i];
  //     console.log("varient_labels == ", varient_uls[i]);
  //  }

  let varient_table_labels = [];

  const values = []; //aikhane problem
  let emptyUlIndex = [];

  $(varient_uls).each(function (index, element) {
    // console.log('element == ', element, element.querySelectorAll("li").length, 'index == ', index);
    let inputArray = [];
    if (element.querySelectorAll("li").length != "0") {
      varient_table_labels.push(all_varient_table_labels[index]);
      element.querySelectorAll("li").forEach((li) => {
        inputArray.push(li.innerText);
      });
      values.push(inputArray);
    } else emptyUlIndex.push(index);
  });
  console.log("emptyUlIndex === ", emptyUlIndex);

  const combinations = getCombinations(values);
  const combinations_input = document.getElementById("varient_combinations");
  combinations_input.setAttribute("value", JSON.stringify(combinations));
  
  for (let i = varient_labels.length - 1; i >= 0; i--) {
    console.log("the varient is === ", varient_labels[i]);
    if (!emptyUlIndex.includes(i)) {
      console.log("varient_labels each === ", i, varient_labels[i].textContent);
      let th = document.createElement("th");
      th.classList.add("varient_table_label");
      th.innerHTML = varient_labels[i].textContent;
      let input = document.createElement("input");
      input.type = "text";
      input.setAttribute("value", varient_labels[i].textContent.trim());
      input.setAttribute("name", "varient_labels[]");
      input.classList.add("d-none");
      th.appendChild(input);
      tableHeadTr.prepend(th);
      console.log("tableHeadTr == ", tableHeadTr);
    } else console.log("include here ==");
  }

  // Array.from(varient_labels).reverse().forEach(label=>{
  //     let th = document.createElement("th");
  //     th.classList.add("varient_table_label");
  //     th.innerHTML = label.textContent;
  //     tableHeadTr.prepend(th);
  // });

  tableHeadTr.children[0].style.borderTopLeftRadius = "10px";
  table.innerHTML = "";

  combinations.forEach((combination, key) => {
    let tr = document.createElement("tr");
    tr.classList.add("tableBody");
    combination.forEach((comb) => {
      let td = document.createElement("td");
      td.innerHTML = comb;
      tr.appendChild(td);
    });

    let input4 = document.createElement("input");
    input4.setAttribute("name", "quantitys[]");
    input4.classList.add("myInput");
    input4.setAttribute("placeholder", "Qunatity");
    let td4 = document.createElement("td");
    td4.appendChild(input4);
    tr.appendChild(td4);

    let icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash", "text-danger", "delete-table-data");
    icon.setAttribute("id", "td_" + key);
    icon.setAttribute("onclick", "tableDataDelete(this)");
    let td7 = document.createElement("td");
    td7.style.textAlign = "center";
    td7.appendChild(icon);
    tr.appendChild(td7);
    table.appendChild(tr);
  });
  let tableDataleftBox = table.querySelectorAll("tr");
  let tableLastRow = tableDataleftBox[tableDataleftBox.length - 1];
  let tableDataList = tableLastRow.querySelectorAll("td");
  let firstTableData = tableDataList[0];
  let lastTableData = tableDataList[tableDataList.length - 1];
  firstTableData.style.borderBottomLeftRadius = "10px";
  lastTableData.style.borderBottomRightRadius = "10px";
};
// End mula function

const tableDataDelete = (tag) => {
  // let table = document.getElementById("product_table");
  let deleteItem = tag.parentNode.parentNode;
  let parentTable = tag.parentNode.parentNode.parentNode;
  // console.log("the table is = ", table, deleteItem, parentTable);
  parentTable.removeChild(deleteItem);
};

const table_content_dropdown_add = (tag, num) => {
  count += 1;
  let table_content = document.getElementById("table_content_dropdown_");
  let table_content_container;
  let new_content = table_content.cloneNode(true);
  if (num) {
    table_content_container = document.getElementById(
      `table_content_dropdown_box_${num}`
    );
    // let new_content = table_content.cloneNode(true);
    new_content.setAttribute("id", `table_content_dropdown_${num}_${count}`);

    var innerIDs = [];

    function collectInnerIDs(element) {
      if (element.hasAttribute("onclick")) {
        let onchangeIS = element.getAttribute("onclick");
        var onclickParts = onchangeIS.split("," || " ");
        if (onclickParts[0] == "deleteTableContent(this") {
          console.log("what is element === ", element);
          element.setAttribute("onclick", onclickParts[0] + ", " + num + ")");
        }
      }

      for (var i = 0; i < element.children.length; i++) {
        collectInnerIDs(element.children[i]);
      }
    }

    collectInnerIDs(new_content);
  } else {
    table_content_container = document.getElementById(
      `table_content_dropdown_box`
    );
    new_content.setAttribute("id", "table_content_dropdown_" + count);
  }

  new_content.classList.remove("d-none");
  let firstChild = new_content.children[0];
  let input = firstChild.children[0].children[1].children[0];
  let dropDownMenu = firstChild.children[0].children[1].children[1];
  console.log("firstChild", firstChild, input, dropDownMenu);

  input.setAttribute("id", "contentsTitleInput_" + count);
  input.setAttribute("onclick", "showContentDropdown(" + count + ")");
  dropDownMenu.setAttribute("id", "dropdownMenu_" + count);
  table_content_container.appendChild(new_content);
};

const deleteTableContent = (tag, num) => {
  let table_content_container;
  if (num) {
    table_content_container = document.getElementById(
      `table_content_dropdown_box_${num}`
    );
  } else {
    table_content_container = document.getElementById(
      `table_content_dropdown_box`
    );
  }
  let table_content = tag.parentNode.parentNode;
  console.log("table_content", table_content_container, table_content);
  table_content_container.removeChild(table_content);
};

const cancel = () => {
  let product_table = document.getElementById("product_table");
  const allInput = $(".main-contact-area").find("input");
  const allSelect = $(".main-contact-area").find("select");
  const allTextarea = $(".main-contact-area").find("textarea");
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
  for (let i = 0; i < allSelect.length; i++) {
    // allSelect[i].value = "";
    allSelect[i].selectedIndex = 0;
  }
  product_table.innerHTML = "";
  for (let i = 0; i < allTextarea.length; i++) {
    allTextarea[i].value = "";
  }
};

let findInput = 0;
let oldDropdownContent = "";
const showContentDropdown = (id, num) => {
  let dropdownMenu_s;
  if (num) {
    dropdownMenu_s = document.getElementById(`dropdownMenu_${id}_${num}`);
  } else {
    dropdownMenu_s = document.getElementById(`dropdownMenu_${id}`);
  }
  if (
    oldDropdownContent &&
    !oldDropdownContent.classList.contains("d-none") &&
    findInput != id
  ) {
    oldDropdownContent.classList.add("d-none");
  }
  dropdownMenu_s.classList.toggle("d-none");
  findInput = id;
  oldDropdownContent = dropdownMenu_s;
};

document.addEventListener("click", function (event) {
  var target = event.target;
  let dropdownBox = document.querySelectorAll(".dropdownBox");
  if (target.tagName != "INPUT") {
    for (let i = 0; i < dropdownBox.length; i++) {
      if (!dropdownBox[i].classList.contains("d-none")) {
        dropdownBox[i].classList.add("d-none");
      }
    }
  }
});

let allInputTags = document.querySelectorAll("input");
$(allInputTags).each(function (index, element) {
  element.addEventListener("input", function (e) {
    let dropdownBox = document.querySelectorAll(".dropdownBox");
    for (let i = 0; i < dropdownBox.length; i++) {
      console.log("dropdownBox[i]", dropdownBox[i]);
      if (!dropdownBox[i].classList.contains("d-none")) {
        dropdownBox[i].classList.add("d-none");
      }
    }
  });
});

function selectOption(tag, num) {
  let textInput;
  if (num) {
    textInput = document.getElementById(
      `contentsTitleInput_${findInput}_${num}`
    );
  } else {
    textInput = document.getElementById(`contentsTitleInput_${findInput}`);
  }

  let text = tag.innerText;
  textInput.value = text;
  let parent = tag.parentNode;
  parent.classList.add("d-none");
}

const openAdditionalSection = () => {
  let area = document.getElementById("AdditionalArea");
  area.classList.remove("d-none");
};

// window.addEventListener("click", function (event) {
//     const dropdownMenu = document.getElementById("dropdownMenu_" + findInput);
//     console.log("dropdownMenu", dropdownMenu);
//     const textInput = document.getElementById(
//         "contentsTitleInput_" + findInput
//     );
//     let allClassList = dropdownMenu.classList.value;
//     const classListArray = allClassList.split(" ");
//     classListArray.find((className) => {
//         if (!textInput.contains(event.target)) {
//             if (!className.includes("d-none")) {
//                 dropdownMenu.classList.add("d-none");
//             }
//         }
//     });
// });




const save_varient = (tag, num) => {
  console.log("save the varient ====");
  let varient_container;
  let custom_variant;
  let newVarientUl;
  let modal_varient_name;
  let varientLabelInput;
  let varientTagUlInput;
  if (num) {
    varient_container = document.getElementById(`varient_container__${num}`);
    custom_variant = document.getElementById(`custom_variant_${num}`);
    newVarientUl = document.getElementById(`addNewVarient_${num}`);
    modal_varient_name = document.getElementById(
      `modal_varient_name_${num}`
    ).value;
    varientLabelInput = document.getElementById(`modal_varient_name_${num}`);
    varientTagUlInput = document.getElementById(`addNewVarient_${num}`);
  } else {
    varient_container = document.getElementById(`varient_container_`);
    custom_variant = document.getElementById(`custom_variant`);
    newVarientUl = document.getElementById("addNewVarient");
    modal_varient_name = document.getElementById("modal_varient_name").value;
    varientLabelInput = document.getElementById(`modal_varient_name`);
    varientTagUlInput = document.getElementById(`addNewVarient`);
  }

  // let modal_varient_name = document.querySelector(
  //     "#modal_varient_name"
  // ).value;

  // let varient_container = document.querySelector("#varient_container_");
  // varient_container.classList.add("colorVariantBox");
  let data = [];
  let varientLi = newVarientUl.querySelectorAll("li");
  varientLi.forEach((li) => {
    data.push(li.innerText);
  });
  // let data = $(custom_variant).select2("val");

  let colorVariantBox = document.createElement("div");
  colorVariantBox.classList.add(
    "col-lg-4",
    "col-md-4",
    "col-sm-12",
    "colorVariantBox",
    "mt-3"
  );
  let variantInnderBox = document.createElement("div");
  variantInnderBox.style.backgroundColor = "white";
  variantInnderBox.style.borderRadius = "5px";
  variantInnderBox.style.padding = "10px";
  let label2 = document.createElement("label");
  label2.classList.add(
    "varient_label",
    "inline-block",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  label2.innerText = modal_varient_name;
  // label2.classList.add("inline-block");
  // label2.classList.add("varient_label");
  // label2.classList.add("d-flex");
  // label2.classList.add("justify-content-between");
  // label2.classList.add("align-items-center");
  // label2.style.marginTop = "20px";
  // x-mark
  let x_span = document.createElement("span");
  x_span.setAttribute(
    "onclick",
    "this.parentNode.parentNode.parentNode.remove()"
  );
  x_span.innerHTML =
    '<i class="fa-solid fa-circle-xmark" style="font-size:20px;color:skyblue;border:1px solid skyblue;border-radius:50%;cursor:pointer;"></i>';
  label2.append(x_span);
  let dropdownPositionDiv = document.createElement("div");
  dropdownPositionDiv.classList.add("position-relative");
  let ul = document.createElement("ul");
  ul.classList.add("colorInputUL");
  ul.style.marginBottom = "0px";
  ul.setAttribute("onclick", "showColorDropDown(this)");
  let inputInUL = document.createElement("input");
  inputInUL.setAttribute("type", "text");
  inputInUL.classList.add("tagIntpus");
  inputInUL.setAttribute("spellcheck", "false");
  inputInUL.setAttribute("placeholder", "Write here for tag");
  inputInUL.setAttribute("onkeypress", "return event.keyCode != 13;");
  ul.append(inputInUL);

  let dropdownOptionBox = document.createElement("div");
  dropdownOptionBox.classList.add("dropdownBox", "d-none");
  dropdownOptionBox.style.height = "200px";
  dropdownOptionBox.style.overflowY = "auto";
  let dropdownUL = document.createElement("ul");
  data.forEach((element) => {
    let li = document.createElement("li");
    onclick = "getValueFronDropDown(this)";
    li.setAttribute("onclick", "getValueFronDropDown(this)");
    li.textContent = element;
    dropdownUL.append(li);
  });

  // dropdownOptionBox.append(ul);
  dropdownOptionBox.append(dropdownUL);
  dropdownPositionDiv.append(ul);
  dropdownPositionDiv.append(dropdownOptionBox);
  variantInnderBox.append(label2);
  variantInnderBox.append(dropdownPositionDiv);
  colorVariantBox.append(variantInnderBox);
  varient_container.append(colorVariantBox);

  // Create a new script element
  const newScript = document.createElement("script");

  // Set the script content
  newScript.textContent = `
$("#varient-select2-${modal_varient_name}").select2({
  tags: true,
  tokenSeparators: [',', ' '],
  dropdownParent: $('.addProduct___'),
  placeholder: "Select Product Color",
  allowClear: true
});
`;

  // Append the new script to the document body
  document.body.appendChild(newScript);

  varientLabelInput.value = "";
  let varientTagUlInputLi = varientTagUlInput.querySelectorAll("li");
  for (let i = 0; i < varientTagUlInputLi.length; i++) {
    console.log(varientTagUlInputLi[i]);
    varientTagUlInputLi[i].remove();
    // removarientTagUlInputLi[i];
  }
  console.log("varientTagInput", varientTagInput.querySelectorAll("li"));
};

{
  /* <div class="col-lg-4 col-sm-12">
    <div class="single-contact-info Description form-group" id="addProduct1">
        <label style="font-size: 15px;">Color</label>
        <select
            class="form-control-select2 js-select2-multi"
            multiple="multiple"
            id="color_variant"
            style="width:100%;z-index: 99999;width:200px;"
        >
            <option>Red</option>
            <option>Blue</option>
            <option>Black</option>
            <option>Pink</option>
            <option>Yellow</option>
            <option>White</option>
            <option>Brown</option>
        </select>
    </div>
</div>;  */
}
