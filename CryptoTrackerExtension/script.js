var btc = document.getElementById("bitcoin");
var lite = document.getElementById("litecoin");
var eth = document.getElementById("ethereum");
var doge = document.getElementById("doge");
var sol = document.getElementById("solana");


const API_URL = 
"https://api.coingecko.com/api/v3/simple/price?ids=binance%2Csolana%2Cethereum%2Cbitcoin%2Cdoge%2Clitecoin&vs_currencies=usd"
//"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Clitecoin%2Cethereum%2Cdogecoin&vs_currencies=usd"

fetch(API_URL)
	.then(response => response.json())
	.then(response => {
		// For debugging
		console.log(response)
    console.log(response.solana.usd);
		btc.innerHTML = response.bitcoin.usd;
		lite.innerHTML = response.litecoin.usd;
		eth.innerHTML = response.ethereum.usd;
		doge.innerHTML = response.dogecoin.usd;
        sol.innerHTML = response.solana.usd; 
    
	});
