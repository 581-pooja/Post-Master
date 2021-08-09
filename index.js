console.log("PostMan Clone");

// Utility functions:
// Utility function to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
}

// initialize no of parameters
let addedParamCount = 0;

// Hide the parameters Box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none'

// if the user clicks on params , hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
  document.getElementById('requestJsonBox').style.display = 'none'
  document.getElementById('parametersBox').style.display = 'block'
})

// if the user clicks on  json, hide the params box
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
  document.getElementById('requestJsonBox').style.display = 'block'
  document.getElementById('parametersBox').style.display = 'none'
})

// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam')

addParam.addEventListener('click', () => {
  let params = document.getElementById('params');
  let string = `
          <div class="col-sm-10 my-3">
            <div class="row "> <!--This is parent element of button-->
            <label for="Parameters" class="col-sm-2 col-form-label ">Parameters ${addedParamCount + 2}</label>
              <div class="col">
                <input type="text" class="form-control" placeholder="Enter parameter ${addedParamCount + 2} key" id="parametersKey${addedParamCount + 2}">
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Enter parameter ${addedParamCount + 2} value" id="parametersValue${addedParamCount + 2}">
              </div>
                <button class="col-sm-2 btn btn-primary deleteParam" >-</button>
            </div>
          </div>
    `;

  // convert the element
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);


  // Add an  event listener to remove the parameter on clicking - button
  let deleteParam = document.getElementsByClassName('deleteParam');
  for (item of deleteParam) {
    item.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    })
  }
  addedParamCount++;
})

// if the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
  document.getElementById('responsePrism').innerHTML = "Please wait...while we are fetching your response..."

  // fetch all the values user has entered
  let url = document.getElementById('url').value;
  let requestType = document.querySelector("input[name='requestType']:checked").value;
  let ContentType = document.querySelector("input[name='ContentType']:checked").value;

  
  // if user has used params option instead of json, collect all the parameters in an object
  if(ContentType == 'params'){
    // console.log("inside loop 1")
    data = {};
    for(let i=0; i < addedParamCount + 1; i++){
      // console.log("inside loop 2")
      if(document.getElementById('parametersKey' + (i+1)) != undefined){
        let key = document.getElementById('parametersKey' + (i+1)).value;
        // console.log("inside loop 3")
        let value = document.getElementById('parametersValue' + (i+1)).value;
        data[key] = value;
        // console.log("inside loop 4")
      } 
    }
    data = JSON.stringify(data);
  }
  else{
    data = document.getElementById('requestJsonText').value;
  }

  // log all the values in the console for debugging
  // console.log("url is " + url)
  // console.log("requestType is " + requestType)
  // console.log("ContentType is " + ContentType)
  // console.log("data is " + data)

  // If the request type is post , invoke fetch api 
  if(requestType == 'GET'){
    fetch(url , {
      method: 'GET',
    })
    .then(response => response.text())
    .then((text)=>{
      // document.getElementById('responseJsonText').value = text;
      document.getElementById('responsePrism').innerHTML = text;

    });
  }
  else{
    fetch(url , {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.text())
    .then((text)=>{
      // document.getElementById('responseJsonText').value = text;
      document.getElementById('responsePrism').innerHTML = text;
    });
  }

}) 
