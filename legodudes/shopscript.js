console.log(products)

//Gå gjennom alle produkter, generer HTML for hvert produkt, skrive til index.html 

//En variabel som kan holde på HTML-en for produktene
let productHTML = ""

products.map((product, index) => productHTML += 
            `<article class="product-card">
                <img src="website_images/PROD_${product.imagefile}" alt="PRODUKTTITTEL" />
                <a href="#KATEGORISIDE">Ninjago</a>
                <h3>${product.title}</h3>
                <p>Kr. ${product.price},-</p>
                <button onclick="addProductToCart(${product.prodid})">Legg til i handlekurv</button>
            </article>`)

//Finn #productlist of fyll den med verdiene i variabelen productHTML
document.getElementById("productlist").innerHTML = productHTML

//Lage toggel funksjonalitet for handlevogn 
document.getElementById("shoppingcart").addEventListener("click", function() {
    document.getElementById("cart").classList.toggle("visible") //classList sjekker hvilken klasse den her. Toggle er en innebygd if else test
})

//Lage addProductToCart()
function addProductToCart(prodid){
    console.log("Du vil legge til produkt id: " + prodid)
    /*bruk .some for å sjekke om prodid allerde finnes i cart: some returner true eller false
    Sjekker om prodid some finner er allerede i parameteren prodid*/
    const idExists = cart.some(cartprod => cartprod.cartprodid === prodid) 

    if(idExists) { //noe funker ikke enda 
        //Oppdatere dette produktes quantity
        //Først finne indexen til denne id-en:
        const index = cart.findIndex(p => p.cartprodid === prodid)
        //Så: Oppdatere rikitg quantity
        cart[index].quantity++ 
    } else {
        //Produktet er ikke handlevognen og vi må oppdatere det 
        cart.push({cartprodid: prodid, quantity: 1})
    }

    printCart()
    console.log(cart)
}


//Lage en funskjon som skriver oppdatert versjon av handlevognen
function printCart(){
    //Starte med en tom variabel vi kan fylle med HTML
    let cartHTML = ""

    //Lag klar variabel for pris:
    let cartTotal = 0;

    //lage variabel for antall produkter:
    let cartNumber = 0;

    //Gå gjennom cart-arrayen og generer HTML for hvert produkt 
    cart.map((cartprod, index) => {
        const currentProduct = products.findIndex(p => p.prodidv === cartprod.cartprodid)
        const currentProductInfo = products[currentProduct]
        cartHTML +=  //Feilmelding på title?
        `       <article class="cart-product">
                    <span class="title">${currentProductInfo.title}</span> 
                    <span class="price">${currentProductInfo.price},-</span>
                    <span class="quantity">x<span class="quantity-number">${cartprod.quantity}</span></span>
                    <button class="delete">x</button>
                </article>
        `
        //Regn ut totalsum:
        cartTotal += currentProductInfo.price *cartprod.quantity

        //Regn ut antall produkter 
        cartNumber += cartprod.quantity
    })

    //Skrive ut generert HTML til indexfila:
    document.getElementById("cart-products").innerHTML = cartHTML 
    //Skrive ut totalpris:
    document.getElementById("cart-total").innerHTML = cartTotal
    //Skrive ut antall produkter:
    document.getElementById("cartcount").innerHTML = cartNumber
}

printCart()