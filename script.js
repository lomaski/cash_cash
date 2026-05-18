const buttonConversion = document.querySelector('.button-conversion')
const coin = document.querySelectorAll('.coin')

// 1. Criamos um objeto global para guardar as taxas que vão atualizar com a API
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

// 2. Buscamos o valor atualizado na API AwesomeAPI assim que a página carrega
fetch("https://awesomeapi.com.br")
    .then(response => response.json())
    .then(data => {
        // Atualiza o objeto de taxas com os dados reais do mercado
        rates.dolar = parseFloat(data.USDBRL.bid)
        rates.euro = parseFloat(data.EURBRL.bid)
        rates.libra = parseFloat(data.GBPBRL.bid)
        rates.bitcoin = parseFloat(data.BTCBRL.bid) * 1000 // A API retorna Bitcoin em milhares
    })
    .catch(error => console.error("Erro ao buscar taxas da API:", error))

function conValues() {
    const inputValue = document.querySelector('.section-input').value
    const r1 = document.querySelector('.r1')
    const r2 = document.querySelector('.r2')

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
