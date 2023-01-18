// Select Element
const shoppingTable = document.querySelector('.shoppingCart-table');

// Event Listeners
setEventListeners();

function setEventListeners() {
    shoppingTable.addEventListener('click', manageCount);
}


// Func : for management count a product
function manageCount(e) {
    if (e.target.classList.contains('fa')) {
        const parent = e.target.parentElement.parentElement; // access to the parent element tag(manage-count)
        const counter = parent.querySelector('.counter'); // access to the counter
     
        if (e.target.classList.contains('fa-plus')) {
            counter.textContent = Number(counter.innerText) + 1; // increase count
        }
        else if (e.target.classList.contains('fa-minus')) {
            counter.textContent = Number(counter.innerText) - 1; // decrease count
        }
    }
}