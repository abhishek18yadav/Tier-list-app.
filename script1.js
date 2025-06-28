let currentDraggedItem;
const tierInput = document.getElementById('tier');
const submitBtn = document.getElementById('submit');
console.log(tierInput);
const itemContainers = document.getElementsByClassName('item-container')
const imageForm = document.getElementById('image-form');
console.log("imageForm", imageForm);


for( const itemContainer of itemContainers){
  
    setUpItemContainerForDrag(itemContainer);
} 

imageForm.addEventListener('submit' , (event)=>{
    event.preventDefault();
    console.log(imageForm);
    const imageItemInput = document.getElementById('image-item');
    if(imageItemInput.value === ''){
        alert("please input valid url");
        return;
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value = '';
});
  
// /// sensitive 
function setUpItemContainerForDrag(itemContainer){
    console.log("image is here")
    itemContainer.addEventListener('dragstart', (event)=>{
        currentDraggedItem = event.target.parentNode;
        //event.target.parentNode -> div of image
        console.log('itemContainer', itemContainer )
        console.log('currentDraggedItem', currentDraggedItem )
    });
    itemContainer.addEventListener('dblclick',(event)=>{
        const parentNode = event.target.parentNode;
        console.log("event.target", event.target);
      const nonTierSection = document.getElementById('non-tier-section');
      nonTierSection.appendChild(parentNode);
    })
}

submitBtn.addEventListener('click',(event)=>{
    event.preventDefault(); 
    if(tierInput.value== ''){
        alert('please input valis url');
        return;
    }
    createTierList(tierInput.value);
    tierInput.value='';
});
function createTierList(tierListName){
    const newTierList = document.createElement('div');
    newTierList.classList.add('tier-list');
    
    const heading = document.createElement('div');
    heading.classList.add('heading');
    const textContainer = document.createElement('div')
    textContainer.classList.add('textCotainer')
    textContainer.textContent = tierListName;
    heading.appendChild(textContainer);

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);
}

function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener('drop',(event)=>{
        event.preventDefault();
    });
    // tierListItem.addEventListener('dragover',(event)=>{
    //     if(this !== currentDraggedItem.parentNode){
    //         this.appendChild(currentDraggedItem);
    //     }
        
    // });
    // this doesnt work with ^ above code
    tierListItem.addEventListener('dragover',function(event){
        if(this !== tierListItem.parentNode){
            this.appendChild(currentDraggedItem);
        }
    });
}
 


function createTierListItem(imageurl){
    console.log("its hetr")
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('item-container');
    imageDiv.setAttribute('draggable','true');
    setUpItemContainerForDrag(imageDiv);

    const img = document.createElement("img");
    img.src = imageurl;
    imageDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);
}

