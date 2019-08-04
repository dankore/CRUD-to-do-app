function itemTemplate(item) {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
          <button data-id="${
            item._id
          }" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button data-id="${
            item._id
          }" class="delete-me  btn btn-danger btn-sm">Delete</button>
        </div>
      </li>`;
}
//Initial page load render
let ourHTML = items
  .map(item => {
    return itemTemplate(item);
  })
  .join("");
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML);
//Create feature
let createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", e => {
  e.preventDefault();

  axios
    .post("/create-item", {
      text: createField.value
    })
    .then(response => {
      //Create the HTMl for the new item
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch(() => {
      console.log("Please try again later");
    });
});

document.addEventListener("click", e => {
  // Delete feature
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you want to delete this item?")) {
      axios
        .post("/delete-item", {
          id: e.target.getAttribute("data-id")
        })
        .then(() => {
          //Run when axios action  is complete
          e.target.parentElement.parentElement.remove();
        })
        .catch(() => {
          console.log("Please try again later");
        });
    }
  }

  // Update feature
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "Edit your item",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    //If statement ensures when prompt is canceled, the item wont be updated to an empty string
    if (userInput) {
      axios
        .post("/update-item", {
          text: userInput,
          id: e.target.getAttribute("data-id")
        })
        .then(() => {
          //Run when axios action  is complete
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch(() => {
          console.log("Please try again later");
        });
    }
  }
});
