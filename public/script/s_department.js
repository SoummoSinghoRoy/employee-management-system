let tableData = document.getElementsByClassName('tData');
let editBtns = document.getElementsByClassName('editBtn');
let currentName = document.getElementById('currentName');
let editForm = document.getElementById('editForm');


for(let b = 0; b < editBtns.length; b++) {
  editBtns[b].addEventListener('click', function(event) {
    let editBtn = event.target
    for (let td = 0; td < tableData.length; td++) {
      let tdNode = tableData[td]
      let tdSpanValue = tdNode.children[0].innerHTML
      if(editBtn.id === tdNode.id) {
        currentName.innerHTML = tdSpanValue
        editForm.action = `/department/edit/${tdNode.id}`
        console.dir(editForm)
      }
    }
  })
}



/*for(let b = 0; b < editBtns.length; b++) {
  editBtns[b].addEventListener('click', function(event) {
    let editBtn = event.target
    for (let td = 0; td < tableData.length; td++) {
      let tdNode = tableData[td]
      if(editBtn.id === tdNode.id) {
        let tdSpan = tdNode.children[0]
        let tdInput = tdNode.children[1]
        
        tdSpan.className = 'd-none';
        tdInput.classList = "d-block form-control"
        editBtn.value = "Update"
        editBtn.addEventListener('click', function () {
          console.log('I am clicked');
        })
      }
    }
  })
}*/