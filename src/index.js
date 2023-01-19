// See all ramen images in the div with the id of ramen-menu. 
// When the page loads, request the data from the server to get all the ramen objects. 
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
// Click on an image from the #ramen-menu div and see all the info about that ramen displayed 
// inside the #ramen-detail div and where it says insert comment here and insert rating here.
// Create a new ramen after submitting the new-ramen form. 
// The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; 
// in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.


function getRamen(){
    fetch("http://localhost:3000/ramens")
    .then((r) => r.json())
    .then((data) => renderRamen(data));
  }

  getRamen()
  const ramenDetail = document.querySelector("#ramen-detail");

  const ramenMenu = document.querySelector("#ramen-menu");
  const detailImage = document.querySelector(".detail-image");
  const ramenName = document.querySelector(".name");
  const restaurant = document.querySelector('.restaurant')
  const ramenRating = document.querySelector('#rating-display')
  const ramenComment = document.querySelector('#comment-display')

  const deleteButton = document.createElement('button');
deleteButton.textContent = 'delete'
ramenDetail.append(deleteButton)
  
    function renderRamen(ramens) {
        ramens.forEach((ramen) => {
          const img = document.createElement("img");
          img.src = ramen.image;
          img.addEventListener("click", () => {
            detailImage.src = ramen.image;
            ramenName.textContent = ramen.name;
            restaurant.textContent = ramen.restaurant;
            ramenRating.textContent = ramen.rating;
            ramenComment.textContent = ramen.comment;
          });
        ramenMenu.append(img);
    })
}
        
       


const init = () => {
    const form =document.querySelector('#new-ramen');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let ramenObj = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target['new comment'].value
        }
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ramenObj)
        })
        .then(response => response.json())
        .then(newObj => renderRamen([newObj]))
    });
}


deleteButton.addEventListener('click', ()=>{
    fetch(`http://localhost:3000/ramens/${deleteButton.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      .then(r => r.json())
      .then(() => {
        getRamen()
        detailImage.src = './assets/image-placeholder.jpg'
        ramenName.textContent = 'Insert Name Here'
        restaurant.textContent = 'Insert Restaurant Here'
        ramenRating.textContent = 'Insert rating here';
        ramenComment.textContent = 'Insert comment here';
        detailImage.id = ''
        deleteButton.id = ''
      })
  })

renderRamen();
init();
deleteRamen();