
var vodkaButton = document.getElementById('vodka-btn');
var tequilaButton = document.getElementById('tequila-btn');
var rumButton = document.getElementById('rum-btn');
var whiskeyButton = document.getElementById('whiskey-btn');
var scotchButton = document.getElementById('scotch-btn');
var ginButton = document.getElementById('gin-btn');
vodkaButton.addEventListener('click', function () { getDrinkList('vodka') });
tequilaButton.addEventListener('click', function () { getDrinkList('tequila') });
rumButton.addEventListener('click', function () { getDrinkList('rum') });
whiskeyButton.addEventListener('click', function () { getDrinkList('whiskey') });
scotchButton.addEventListener('click', function () { getDrinkList('scotch') });
ginButton.addEventListener('click', function () { getDrinkList('gin') });

var list_items = [];
//fetches the list of drinks and pushes them into the array. displayList fn will render the data and setupPagination will create the pagination
fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka`)
	.then((res) => res.json())
	.then(function (data) {
		let drinkList = data.drinks
		list_items = [];
		for (let index = 0; index < drinkList.length; index++) {
			list_items.push(drinkList[index].strDrink);
		}
		console.log("list items:", list_items);
		DisplayList(list_items, list_element, rows, current_page);
		SetupPagination(list_items, pagination_element, rows);
	})
	.catch((err) => console.log(err));


function getDrinkList(drink) {
	fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`)
	.then((res) => res.json())
	.then(function (data) {
		let drinkList = data.drinks
		list_items = [];
		for (let index = 0; index < drinkList.length; index++) {
			list_items.push(drinkList[index].strDrink);
		}
		console.log("list items:", list_items);
		DisplayList(list_items, list_element, rows, current_page);
		SetupPagination(list_items, pagination_element, rows);
	})
	.catch((err) => console.log(err));
}

//store the elements where the data will be rendered
var list_element = document.getElementById('list');
var pagination_element = document.getElementById('pagination');
//declare current page and row
let current_page = 1;
let rows = 10;
//function will display the items per page
function DisplayList(items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];

		let item_element = document.createElement('div');
		item_element.classList.add('item');
		item_element.innerText = item;

		wrapper.appendChild(item_element);
	}
}
//function creates the pagination
function SetupPagination(items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton(page, items) {
	//reset the current page back to one, and display the page starting at the current page
	current_page = 1;
	DisplayList(items, list_element, rows, current_page);
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, list_element, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

