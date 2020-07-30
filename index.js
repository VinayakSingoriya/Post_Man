console.log("Hello PostMan!!");

function getElementFromString(string) {
    let div=document.createElement('div');
    div.innerHTML=string;
    // console.log(div);
    // console.log(div.firstElementChild);
    return div.firstElementChild;

}

// Initailize the number of parameter count
let addedParamCount=0;

// Initially hide the parameter box as by default
 let parametersBox=document.getElementById("parametersBox");
// console.log(parametersBox);
parametersBox.style.display='none';

// if anyone clicks on a custom parameters ,then JOSN box will hide
paramsRadio=document.getElementById("paramsRadio");
paramsRadio.addEventListener("click",()=>{
  let  requestJsonBox=document.getElementById("requestJsonBox");
  requestJsonBox.style.display='none';
  parametersBox.style.display='block';
})

// if anyone clicks on JSON parameter,then custom parameter will hide
jsonRadio=document.getElementById("jsonRadio");
jsonRadio.addEventListener("click",()=>{
  let parametersBox=document.getElementById("parametersBox");
  requestJsonBox=document.getElementById("requestJsonBox");
  parametersBox.style.display='none';
  requestJsonBox.style.display='block';
})

// if the user clicks on a + button in params section,then more parameter will be added
let addParam=document.getElementById("addParam");
addParam.addEventListener("click",(e)=>{
    console.log("you have clicked the + button");
    e.preventDefault();
    let string= 
       ` <div class="form-row my-2">
           <label for="parameterKey" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
             <div class="col">
              <input type="text" id="parameterKey${addedParamCount + 2}" class="form-control" placeholder="Enter parameter ${addedParamCount + 2} key">
             </div>
             <div class="col">
               <input type="text" id="parameterValue${addedParamCount + 2}" class="form-control" placeholder="Enter parameter ${addedParamCount + 2} value">
            </div>
           <button  type="button" class="btn btn-dark deleteParam ">-</button>
      </div>`;

    //   convert the element string to node node
    let paramElement=getElementFromString(string);
   params.appendChild(paramElement);

     // Remove the parameter on click - button
      let deleteParam=document.getElementsByClassName('deleteParam');
     for (let item of deleteParam) {
     item.addEventListener('click',(e)=>{
      let r;
      r=confirm("Are u really want to delete this parameter?")
      if (r==true) {
        e.target.parentElement.remove();
       }
   
  })
     }
        addedParamCount++;
     })

    //  If the user  clicks on a submitt button
    let submit=document.getElementById("submit");
    // console.log(submit);
    submit.addEventListener("click",()=>{
      // Show please wait in the response box
      console.log("You have clicked on submit button");
      document.getElementById("responsePrism").innerHTML="Please wait.....fatching your response";
      url=document.getElementById("url").value;
      requestType=document.querySelector("input[name='requestType']:checked").value;
      contentType=document.querySelector("input[name='contentType']:checked").value;
      console.log(url, requestType, contentType);

      // If user selects custom parameters option instead of json,then we will collect all the parameters in a object form
      if(contentType=='params')
      {
        data={};
        for(i=0;i<addedParamCount+1;i++)
         {
           console.log("we are in for loops")
           if(document.getElementById("parameterKey"+(i+1))!=undefined)
           {
             let key=document.getElementById("parameterKey"+(i+1)).value;
             let value=document.getElementById("parameterValue"+(i+1)).value;
             data[key]=value;
           }
         }
         data=JSON.stringify(data);
         console.log("main data",data);
      }
      else
      {
        data=document.getElementById("requestJsonText").value;
      }

      // Log all the values for debugging
      console.log("url is :",url);
      console.log("Request Type is:",requestType);
      console.log("Content Type is:",contentType);
      console.log("data is: ",data);

      // If the request type is "GET", invoke fetch API  to create a GET request
      if(requestType=="GET")
      {
        fetch(url,{
          method:'GET'
        })
        .then(response=>response.text())
        .then((text)=>{
          // document.getElementById("responseJsonText").value=text;
          document.getElementById("responsePrism").innerHTML=text;
           Prism.highlightAll();
        });
      }
      else{
        fetch(url,{
          method:"POST",
          body:data,
          headers:{
            "content-type":"application/json;charset=UTF-8"
          }
        })
        .then(response=>response.text())
        .then((text)=>{
          // document.getElementById("responseJsonText").value=text;
          document.getElementById("responsePrism").innerHTML=text;
          Prism.highlightAll();
        });
      }

    })
