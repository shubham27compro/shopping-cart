var stateZip = { "Delhi": 101, "Mumbai": 102, "Himachal Pradesh": 103, 
                 "Dehradhun": 104, "Gujrat": 105};
var itemarray = [{
        "category": "MANGO",
        "item": [
            { "id" : "it1", "name": "Alphonso", "price": 20 },
            { "id": "it2", "name": "Kesar", "price": 30 },
            { "id": "it3", "name": "Dasheri", "price": 40 },
            { "id": "it4", "name": "Langra", "price": 50 }
        ]
    },
    {
        "category": "CAR",
        "item": [
            { "id": "it5", "name": "BMW", "price": 1000 },
            { "id": "it6", "name": "Audi", "price": 1320 },
            { "id": "it7", "name": "Merc", "price": 2220 },
            { "id": "it8", "name": "Ferrari", "price": 8520 }
        ]
    },
    {
        "category": "BIKE",
        "item": [
            { "id": "it9", "name": "Enfield", "price": 5000 },
            { "id": "it10", "name": "Harley", "price": 2120 },
            { "id": "it11", "name": "Ducati", "price": 3550 },
            { "id": "it12", "name": "Benelli", "price": 6890 },
            { "id": "it13", "name": "Suzuki", "price": 4350 },
            { "id": "it14", "name": "Honda", "price": 7120 },
            { "id": "it15", "name": "Indian", "price": 9550 }
        ]
    }];
  var i, j;
  var cart1 = {};
  var cart_total = 0;
  var containerdiv = document.getElementById("container");
  var totalPrice = document.getElementById("cartitems");
  for (i = 0; i < itemarray.length; i++) {
    var category = itemarray[i].category;
    for (j = 0; j < itemarray[i].item.length; j++) {
      createItem(category, itemarray[i].item[j]);
    }
  }
  
  // function to create an item tile on window
  function createItem(item_category, item) {
    var newdiv = document.createElement("div");
    newdiv.classList.add("tile");
    var c = create_elem("div", item_category);
    var n = create_elem("div", item.name);
    var p = create_elem("div", "Price: Rs." + item.price);
    var add = create_elem("button", "Add");
    var remove = create_elem("button", "Remove");
    c.classList.add("innerElement");
    n.classList.add("innerElement");
    p.classList.add("innerElement");
    add.disabled = false;
    remove.disabled = true;
    add.classList.add(item.id);
    remove.classList.add(item.id);
    add.classList.add("add_btn");
    remove.classList.add("remove_btn");
    newdiv.append(c, n, p, add, remove);
    containerdiv.appendChild(newdiv);
    add.addEventListener("click", function(){ additem(this, item); });
    remove.addEventListener("click", function(){ removeitem(this, item); });
  }

  // function to create an inner element in an item tile 
  function create_elem(tag, text) {
    var element = document.createElement(tag);
    element.textContent = text;
    return element;
  }
  
  // Checking if there are items stored in session storage
  if (localStorage.getItem("cart")) {
    cart1 = JSON.parse(localStorage.getItem("cart"));
    var saveditems;
    for (saveditems in cart1) {
      document.getElementsByClassName(saveditems)[0].disabled = true;
      document.getElementsByClassName(saveditems)[1].disabled = false;
      cart_total += cart1[saveditems][1];
    }
    totalPrice.innerHTML = cart_total;
  }

  // function to add items in the cart
  function additem(ele, item) {
    var item_id = item.id;
    var remove_ele = document.getElementsByClassName(item_id)[1];
    remove_ele.disabled = false;
    ele.disabled = true;
    cart1[item_id] = [item.name, item.price];
    cart_total += item.price;
    totalPrice.innerHTML = cart_total;
    localStorage.setItem("cart", JSON.stringify(cart1));
  }

  // function to remove items from cart
  function removeitem(ele, item) {
    var item_id = item.id;
    ele.disabled = true;
    var add_ele = document.getElementsByClassName(item_id)[0];
    add_ele.disabled = false;
    delete cart1[item_id];
    cart_total -= item.price;
    totalPrice.innerHTML = cart_total;
    localStorage.setItem("cart", JSON.stringify(cart1));
  }

  // removing all the items from cart
  var clear_btn = document.getElementById("clearBtn");
  var addButtons = document.getElementsByClassName("add_btn");
  var removeButtons = document.getElementsByClassName("remove_btn");
  clear_btn.onclick = function () {
    cart1 = {};
    cart_total = 0;
    localStorage.clear();
    totalPrice.innerHTML = 0;
    for (var x of addButtons) {
      x.disabled = false;
    }
    for (var y of removeButtons) {
      y.disabled = true;
    }
  }

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal and checks out
  var checkout_btn = document.getElementById("checkoutBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  /* When the user clicks the Checkout button, 
     cart is stored in session storage and modal open's*/ 
  var list = document.getElementById("finalcart");
  checkout_btn.onclick = function () {
    if (Object.keys(cart1).length === 0) {
      alert("Cart is empty!");
      localStorage.clear();
    } else {
      localStorage.setItem("cart", JSON.stringify(cart1));
      modal.style.display = "flex";
      for (var itemx in cart1) {
        createListItem(cart1[itemx]);
      }
      document.getElementById("finalprice").innerHTML = cart_total;
    }
  }
  // function to create modal's final list items
  function createListItem(listItem) {
    var element = document.createElement("div");
    element.classList.add("modallistitem");
    var n = create_elem("span", listItem[0]);
    var p = create_elem("span", listItem[1]);
    element.append(n, p);
    list.appendChild(element);
  }
  
  // delivery address form handling
  var formState   = document.getElementById("st");
  var formName    = document.getElementById("name");
  var formEmail   = document.getElementById("email");
  var formPhoneno = document.getElementById("phoneNo");
  var formAddress = document.getElementById("address");
  var formZip     = document.getElementById("zip");
  var placeOrder  = document.getElementById("placeorder");
  var bName       = false,
      bEmail      = false,
      bPhoneno    = false,
      bAddress    = false;
  //function to place order, doing final form checks 
  placeOrder.onclick = function () {
    if(formAddress.value ==="" || formEmail.value ==="" || formName.value ==="" || 
       formPhoneno.value ==="" || formState.value ==="" || formZip.value ===""){
      alert("Delivery Form incomplete");
    }else if(bEmail === false || bAddress === false || bName === false || bPhoneno === false){
      alert("Incorrect values");
    }
    else{
      localStorage.clear(); 
      location.reload();
    }
  }

  // function to set zip automatically from selectes state
  function setZip() {
    if (stateZip[formState.value] === undefined) {
      formZip.value = "";
    } else {
      formZip.value = stateZip[formState.value];
    }
  }

  // function to validate name format
  function checkName() {
    bName = true;
    for(var index=0 ; index<formName.value.length; index++){
      if(!((formName.value[index]>='a' && formName.value[index]<='z') || 
           (formName.value[index]>='A' && formName.value[index]<='Z') || (formName.value[index]===" "))){
        
        bName = false;
        formName.style.border = "1px solid red";
        alert("Invalid Name Format");
        break;
      }
    }
    if(formName.value.indexOf(" ")===0 || formName.value.indexOf("  ") !== (-1) ){
      bName = false;
      formName.style.border = "1px solid red";
      alert("Invalid Name Format");
    }
    if(bName== true){ formName.style.border = ""; }
  }

  // function to validate Email format
  function checkEmail() {
    var emailvalue = formEmail.value;
    if (emailvalue.indexOf("@") !== (-1) && emailvalue.indexOf(".") !== (-1) && 
          emailvalue.indexOf("@") < emailvalue.lastIndexOf(".") && emailvalue.startsWith("@") === false && emailvalue.endsWith(".") === false &&
          emailvalue.indexOf(" ") === (-1) && emailvalue.indexOf("@") === emailvalue.lastIndexOf("@") &&
         (emailvalue.indexOf("@")+1) !== emailvalue.lastIndexOf(".")) {
      bEmail = true;
      formEmail.style.border = "";
    }else{
      formEmail.style.border = "1px solid red";
      alert("Invalid Email Format");
      bEmail = false;
    }
  }

  // function to validate phone number format
  function checkPhoneNo() {
    if (isNaN(formPhoneno.value) || ((formPhoneno.value).length !== 10)) {
      alert("Invalid Phone Number");
      formPhoneno.style.border = "1px solid red";
      bPhoneno = false;
    }else{
      bPhoneno = true;
      formPhoneno.style.border = "";
    }
  }

  // function to validate address
  function checkAddress(){
      bAddress = true;
      if(formAddress.value === " " || formAddress.value.indexOf("  ") !== (-1)){
        alert("Invalid address format");
        formAddress.style.border =  "1px solid red";
        bAddress = false; 
      }
      if(bAddress === true){ formAddress.style.border = ""; }
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    list.innerHTML = "";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      list.innerHTML = "";
    }
  }