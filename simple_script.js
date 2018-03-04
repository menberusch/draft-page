function toggleMenu(elem){
	document.querySelector('nav ul').classList.toggle('hide');
	elem.classList.toggle('active');
}

var cart = document.getElementById('cart');

 function openCart() {
 	cart.style.display = 'block';
 }

 function closeCart() {
 	cart.style.display = 'none';
 }

 var buttons = document.querySelectorAll('.products a');

 for (var i = 0; i < buttons.length; i++) {
 	buttons[i].onclick = addToCart;
 }

 function addToCart(){

 	var products = this.closest('.products');

 	var image = products.querySelector('img');
 	var name = products.querySelector('p').innerText;
 	var price = this.nextElementSibling.innerText;

 	var all_names = document.querySelectorAll('#cart table tr td:nth-child(2)');
 	for(var i = 0; i < all_names.length; i++){
	 	
	 	if(name === all_names[i].innerText){
	 		
	 		var repeatedInput = all_names[i].closest('tr').querySelector('input');
	 		repeatedInput.value++;
	 		
 			var act_price = repeatedInput.closest('td').previousElementSibling.innerText;
 			repeatedInput.closest('td').nextElementSibling.innerText = act_price * repeatedInput.value + ' $';

	 		openCart();
			refreshTotal();
	 		return true;

	 	}

	 }

 	var trElement = document.createElement('tr');
 	trElement.className = 'cart_products';

 	var tdImg = document.createElement('td');
 		tdImg.appendChild(image.cloneNode());
 		trElement.appendChild(tdImg);

 	var tdName = document.createElement('td');
 		trElement.appendChild(tdName);
 		tdName.textContent = name;

 	var tdActPrice = document.createElement('td');
 		trElement.appendChild(tdActPrice);
 		tdActPrice.innerText = parseInt(price);
 		tdActPrice.style.display = "none";

 	var tdQuant = document.createElement('td');
 	var inputQuant = document.createElement('input');
 		inputQuant.type = 'number';
 		inputQuant.value = '1';
 		inputQuant.min = '1';
 		inputQuant.max = '7';
 		inputQuant.addEventListener('change', priceRefresh);
 		tdQuant.appendChild(inputQuant);
 		trElement.appendChild(tdQuant);


 	var tdPrice = document.createElement('td');
 		trElement.appendChild(tdPrice);
 		tdPrice.innerText = price;

 	var tdDelete = document.createElement('td');
 		trElement.appendChild(tdDelete);
 		tdDelete.innerHTML = '<button onclick="removeElement(this)" class="delete">&#x2715;</button>';

 	var table = cart.firstElementChild.firstElementChild;
 	var total = table.querySelector('.total');

 	table.insertBefore(trElement, total);

	openCart();

	refreshTotal();
 }

 function removeElement(elem){
 	var tr = elem.closest('tr');
 	tr.closest('tbody').removeChild(tr);
 	refreshTotal();
 }

 function priceRefresh(){
 	var act_price = this.closest('td').previousElementSibling.innerText;
 	this.closest('td').nextElementSibling.innerText = act_price * this.value + ' $';
 	refreshTotal();
 }

 function refreshTotal(){
 	var allPrices = document.querySelectorAll('#cart table tr td:nth-child(5)');

 	var total = 0;

 	for(var i = 0; i < allPrices.length; i++)
 		total+= parseInt(allPrices[i].innerText);

	document.querySelector('.total td:last-child').innerText = total + ' $';
 }