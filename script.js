const buttonConversion = document.querySelector('.button-conversion')
const coin = document.querySelectorAll('.coin')


function conValues = async() => {
    const inputValue = document.querySelector('.section-input')
    const r1 = document.querySelector('.r1')
    const r2 = document.querySelector('.r2')
    const dolasToday = 5.17
    const euroToday = 6.08
    const realToday = 0.19
    const libraToday = 6.93
    const bitcoinToday = 353392.97
    const cVal = inputValue.value / dolasToday

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"), then(response = response.json())
    
    console.log(data)


    if(coin[0].value == "dolar"){
        r1.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency", currency: 'USD'
        }).format(dolasToday)
    }
    if(coin[0].value == "euro"){
        r1.innerHTML = new Intl.NumberFormat("en", {
            style: "currency", currency: 'EUR'
        }).format(euroToday)
    }
    if(coin[0].value == "real"){
        r1.innerHTML = new Intl.NumberFormat("pt-br", {
            style: "currency", currency: 'BRL'
        }).format(realToday)
    }
    if(coin[0].value == "libra"){
        r1.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency", currency: 'GBP'
        }).format(libraToday)
    }
    if(coin[0].value == "bitcoin"){
        r1.innerHTML = new Intl.NumberFormat('en-US', {
            style: "currency", currency: 'XBT',
            minimumFractionDigits: 2, // Customize as needed, BTC often uses more
            maximumFractionDigits: 8  // BTC can have up to 8 decimal places 
        }).format(bitcoinToday)
    }


    if(coin[1].value == "dolar"){
        r2.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency", currency: 'USD'
        }).format(cVal)
    }
    if(coin[1].value == "euro"){
        r2.innerHTML = new Intl.NumberFormat("en", {
            style: "currency", currency: 'EUR'
        }).format(inputValue.value / euroToday)
    }
    if(coin[1].value == "real"){
        r2.innerHTML = new Intl.NumberFormat("pt-br", {
            style: "currency", currency: 'BRL'
        }).format(inputValue.value / realToday)
    }
    if(coin[1].value == "libra"){
        r2.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency", currency: 'GBP'
        }).format(inputValue.value / libraToday)
    }
    if(coin[1].value == "bitcoin"){
        r2.innerHTML = new Intl.NumberFormat('en-US', {
            style: "currency", currency: 'XBT',
            minimumFractionDigits: 2, // Customize as needed, BTC often uses more
            maximumFractionDigits: 8  // BTC can have up to 8 decimal places 
        }).format(inputValue.value / bitcoinToday)
    }


}

function change(){
    //console.log('Ch-ch-ch-ch-changes')

    const name1 = document.getElementById('name1')
    const name2 = document.getElementById('name2')
    const img = document.querySelectorAll('.moeda-div-img')

    if (coin[0].value == 'dolar') {
        name1.innerHTML = 'Dólar'
        img[0].src = "img/eua.png"
    }

    if (coin[0].value == 'euro') {
        name1.innerHTML = 'Euro'
        img[0].src = "img/euro.png"
    }

    if (coin[0].value == 'real') {
        name1.innerHTML = 'Real'
        img[0].src = "img/br.png"
    }

    if (coin[0].value == 'libra') {
        name1.innerHTML = 'Libra'
        img[0].src = "img/uk.png"
    }
    
    if (coin[0].value == 'bitcoin') {
        name1.innerHTML = 'Bitcoin'
        img[0].src = "img/bit.png"
    }



    if (coin[1].value == 'dolar') {
        name2.innerHTML = 'Dólar'
        img[1].src = "img/eua.png"
    }

    if (coin[1].value == 'euro') {
        name2.innerHTML = 'Euro'
        img[1].src = "img/euro.png"
    }

    if (coin[1].value == 'real') {
        name2.innerHTML = 'Real'
        img[1].src = "img/br.png"
    }

    if (coin[1].value == 'libra') {
        name2.innerHTML = 'Libra'
        img[1].src = "img/uk.png"
    }
    
    if (coin[1].value == 'bitcoin') {
        name2.innerHTML = 'Bitcoin'
        img[1].src = "img/bit.png"
    }

    conValues()
}


coin[0].addEventListener('change', change)
coin[1].addEventListener('change', change)
buttonConversion.addEventListener('click', conValues)