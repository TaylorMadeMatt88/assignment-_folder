function validateform(){  
// Function to validate the form

var fname=document.myform.fname.value;
var lname=document.myform.lname.value;
var email=document.myform.email.value;
var phone=document.myform.phone.value;
var message=document.myform.message.value;
// 5 variables used in this function  

// IF statement with 5 sections, one for each form field

if (fname==null || fname==""){  
	alert("How Would We Know What To Call You? Please Enter A First Name");  
	return false;
// Field 1 - First Name
	
} else if (lname==null || lname==""){
	alert("Please Enter A Last Name");  
	return false;
// Field 2 - Last Name
	
} else if (email==null || email==""){  
	alert("Email Can't Be Blank");  
	return false;
// Field 3 - Email	
	
} else if (phone==null || phone==""){  
	alert("Please Enter A Phone Number");  
	return false;
// Field 4 - Phone Number	
	
} else if (message==null || message==""){  
	alert("Oops! You Missed Out Your Message");  
	return false;
}
// Field 5 - Message	

}
// Close closing bracket for validateform function. The code used has elements from https://www.w3schools.com/howto/howto_js_validation_empty_input.asp

updateCartTotal();
// Get cart total from session on load


document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}
// Elements & listeners for empty & add to cart buttons

function addToCart(elem) {
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
    var stringCart;
    // Add to cart functions

    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    // This tells the siblings to cycle 

    var product = {
        productname : getproductName,
        price : getprice
    };
    var stringProduct = JSON.stringify(product);
    // Converts product data to JSON for storage
    
    if(!sessionStorage.getItem('cart')){
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
       cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
    // Session storage if/else function

function updateCartTotal(){
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {

        var cart = JSON.parse(sessionStorage.getItem('cart'));
        items = cart.length;

        for (var i = 0; i < items; i++){
            var x = JSON.parse(cart[i]);
            price = parseFloat(x.price.split('£')[1]);
            productname = x.productname;

            carttable += "<tr><td>" + productname + "</td><td>£" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
// Cart Total function with 5 variables  
    
    document.getElementById("total").innerHTML = total.toFixed(2);
    // Updates total
    document.getElementById("carttable").innerHTML = carttable;

    document.getElementById("itemsquantity").innerHTML = items;
    // Updates products in cart
}

function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}

function emptyCart() {

    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();

      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}
// Remove items from cart function

function checkoutNow() {
	let confirmAction = confirm("Finished shopping?");
	
	if (confirmAction) {
	  document.getElementById('checkoutDiv').style.display = "block";
	} else {
	  alert("Looks like you forgot someting");
	}
    // Checkout confirmation with messages
}

// Close closing bracket for cart function. The code used has elements from external code.