

const tierInput = document.getElementById("tier");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    if(tierInput.value===''){
        alert("please enter tier name");
        return;
    }
    createTierList(tierInput.value);
    tierInput.value='';
})
function createTierList(tierListName){
    const newTierList = document.createElement("div");
    newTierList.classList.add("tier-list");
    const heading = document.createElement("div");
    heading.classList.add("heading");
    const textContainer = document.createElement("div");
    textContainer.textContent = tierListName;
    heading.appendChild(textContainer);
    const newTierListItems = document.createElement("div");
    newTierListItems.classList.add("tier-list-items");
    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);
    setUpDropZoneInTierListItem(newTierListItems);
    const tiersection = document.getElementById("tier-list-section");
    tiersection.appendChild(newTierList);
}
// 
let currentDraggedItem;
const imageform = document.getElementById("image-form");
imageform.addEventListener("submit",(event)=>{
    event.preventDefault();
    const imageItemInput = document.getElementById("image-item");
    if( imageItemInput.value === ''){
        alert("please enter a url of image");
        return;
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value='';
})

function createTierListItem(imageUrl){
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("item-container");
    imageDiv.setAttribute("draggable","true");
    setUpItemContainerForDrag(imageDiv);
    const img =document.createElement("img");
    img.src = imageUrl; // or img.setAttribute("src",imageUrl);
    imageDiv.appendChild(img);
    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);
}
function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener("dragstart",(event)=>{
        currentDraggedItem = event.target.parentNode;
    })
    itemContainer.addEventListener("dblclick",(event)=>{
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
    })
}
function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener("drop",(event)=>{
        event.preventDefault();
    })
    tierListItem.addEventListener("dragover",function(event){
        if(this !== currentDraggedItem.parentNode){
            this.appendChild(currentDraggedItem);
        }
    })
}