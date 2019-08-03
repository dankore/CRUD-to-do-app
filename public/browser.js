document.addEventListener("click", e => {
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt("enter");
    axios.post('/update-item', {text: userInput}).then(()=>{
        // Do something later
    }).catch(()=>{
        console.log('Please try again later');
    })
  }
});
