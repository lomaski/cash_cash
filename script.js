const buttonConversion = document.querySelector('.button-conversion')
const coin = document.querySelectorAll('.coin')


const rates = {
    real: 1,
    dolar: 5.17, // Valor padrão caso a API falhe
    euro: 6.08,
    libra: 6.93,
    bitcoin: 353392.97
}

// Configurações de formatação
const formats = {
    real: { locale: 'pt-BR', currency: 'BRL' },
    dolar: { locale: 'en-US', currency: 'USD' },
    euro: { locale: 'de-DE', currency: 'EUR' },
    libra: { locale: 'en-GB', currency: 'GBP' },
    bitcoin: { locale: 'en-US', currency: 'BTC' }
}

const API_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"

fetch(API_URL)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
    })
    .then(data => {
        rates.dolar = parseFloat(data.USDBRL.bid)
        rates.euro = parseFloat(data.EURBRL.bid)
        rates.libra = parseFloat(data.GBPBRL.bid)
        
        if (data.BTCBRL) {
            rates.bitcoin = parseFloat(data.BTCBRL.bid)
        }
        
        console.log("✅ Moedas atualizadas com sucesso!")
        conValues() // Atualiza a tela com os novos valores
    })
    .catch(error => {
        console.warn("⚠️ Usando taxas offline:", error.message)
    });

function conValues() {
    const inputValue = document.querySelector('.section-input').value
    const r1 = document.querySelector('.r1')
    const r2 = document.querySelector('.r2')
    if (!inputValue || inputValue <= 0) {
        r1.innerHTML = "R$ 0,00"
        r2.innerHTML = "R$ 0,00"
        return
    }

    const fromCurrency = coin[0].value
    const toCurrency = coin[1].value

    // Lógica: Converte o valor de origem para Real, depois para o destino
    const valueInReal = inputValue * rates[fromCurrency]
    const result = valueInReal / rates[toCurrency]

    // Exibe o valor de origem (r1)
    r1.innerHTML = new Intl.NumberFormat(formats[fromCurrency].locale, {
        style: 'currency', currency: formats[fromCurrency].currency
    }).format(inputValue)

    // Exibe o valor convertido (r2)
    r2.innerHTML = new Intl.NumberFormat(formats[toCurrency].locale, {
        style: 'currency', 
        currency: formats[toCurrency].currency,
        minimumFractionDigits: toCurrency === 'bitcoin' ? 8 : 2
    }).format(result)
}

function change() {
    const name1 = document.getElementById('name1')
    const name2 = document.getElementById('name2')
    const img = document.querySelectorAll('.moeda-div-img')

    const data = {
        dolar: { name: 'Dólar', img: 'img/eua.png' },
        euro: { name: 'Euro', img: 'img/euro.png' },
        real: { name: 'Real', img: 'img/br.png' },
        libra: { name: 'Libra', img: 'img/uk.png' },
        bitcoin: { name: 'Bitcoin', img: 'img/bit.png' }
    }

    // Atualiza Origem
    name1.innerHTML = data[coin[0].value].name
    img[0].src = data[coin[0].value].img

    // Atualiza Destino
    name2.innerHTML = data[coin[1].value].name
    img[1].src = data[coin[1].value].img

    conValues()
}

// Ouvintes de eventos corrigidos
coin[0].addEventListener('change', change)
coin[1].addEventListener('change', change)
buttonConversion.addEventListener('click', conValues)

// No final do arquivo
document.addEventListener('DOMContentLoaded', () => {
    change() // Atualiza nomes e imagens
    conValues() // Calcula valores iniciais
})

let timeoutId
buttonConversion.addEventListener('click', () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(conValues, 100)
})

if (!buttonConversion || coin.length < 2) {
    console.error("❌ Elementos do DOM não encontrados!")
}