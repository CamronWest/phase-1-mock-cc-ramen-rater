// See all ramen images in the div with the id of ramen-menu. 
// When the page loads, request the data from the server to get all the ramen objects. 
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
// Click on an image from the #ramen-menu div and see all the info about that ramen displayed 
// inside the #ramen-detail div and where it says insert comment here and insert rating here.
// Create a new ramen after submitting the new-ramen form. 
// The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; 
// in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.


document.addEventListener('DOMContentLoaded', () => {
    renderRamen();
    addSubmitListener();
})

fetch('http://localhost:3000/ramens')
.then(response => response.json())
.then(data => {
    renderRamen(data);

    ramenDetails(data[0])
});


function addSubmitListener() {
    const ramenForm = document.getElementById("new-ramen");

    ramenForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewRamen();
        ramenForm.reset();
    })
}

function displayRamens() {
    // fetch ramens from database
    fetch("http://localhost:3000/ramens")
        .then(res => res.json())
        .then(ramens => {
            ramens.forEach(ramen => renderRamen(ramen))       
            showRamenDetails(ramens[0]);
        })
}
function renderRamen(ramen){
    
        const menuRamen = document.querySelector('#ramen-menu')
        const newRamen = document.createElement('div');
        const ramenImg = document.createElement('img');

        ramenImg.src = ramen.image 

        menuRamen.append(ramenImg);
        menuRamen.append(newRamen);

        ramenImg.addEventListener("click", () => ramenDetails(ramen));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.className = 'delete-btn';
        newRamen.append(deleteButton);

        deleteButton.addEventListener('click', () => deleteRamen(ramen,id.newRamen));
}

function ramenDetails(ramen){
   

        const imageDetail = document.getElementById("detail-image");
        const nameDetail = document.getElementById("detail-name");
        const restaurantDetail = document.getElementById("detail-restaurant");
        const ratingDetail = document.getElementById("detail-rating");
        const commentDetail = document.getElementById("detail-comment");


            imageDetail.src = ramen.image;
            nameDetail.textContent = ramen.name;
            restaurantDetail.textContent = ramen.restaurant;
            ratingDetail.textContent = ramen.rating;
            commentDetail.textContent = ramen.comment;
}

const init = () => {
    const form =document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = event.target.name.value;
        const restaurantInput = event.target.restaurant.value;
        const imageInput = event.target.image.value;
        const ratingInput = event.target.rating.value;
        
        const newObj = {
            name: nameInput,
            restaurant: restaurantInput,
            image: imageInput,
            rating: ratingInput
        }
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newObj)
        })
        .then(response => response.json())
        .then(ramenObj => renderRamen([ramenObj]))
    });
}


function deleteRamen(id, newRamen){
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
}
newRamen.remove();
init();
