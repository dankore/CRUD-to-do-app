document.addEventListener("click", e => {
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
