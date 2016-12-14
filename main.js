var timer = setInterval(function(){cookiesOverTime(cookiesPerInterval);}, 100);

var cookies = 0;
var cookiesPerClick = 1;
var cookiesPerInterval = 0;
var cursorEff = 0;
var factoryEff = 0;
var mineEff = 0;

var buildings = {
	cursors: 0,
	factories: 0,
	mines: 0
}

var upgrades = {
	cursorUpgrade1: {
		tag: "cursorUpgrade1",
		name: "Ικανότεροι Διαφημιστές",
		cost: 200,
		purchased: false,
		tooltip: "Ικανότεροι Διαφημιστές \nΚόστος: 200 Επισκέπτες \nΑπαιτεί τουλάχιστον 10 Διαφημιστές. \nDoubles the cookies gained from each cursor and your clicks!",
		prereq: 10
	},
	cursorUpgrade2: {
		tag: "cursorUpgrade2",
		name: "Διεθνής Διαφημιστές",
		cost: 2500,
		purchased: false,
		tooltip: "Διεθνής Διαφημιστές \nΚόστος: 2500 Επισκέπτες \nΑπαιτεί τουλάχιστον 25 Διαφημιστές. \nDoubles the cookies gained from each cursor and your clicks!",
		prereq: 25
	},
	factoryUpgrade1: {
		tag: "factoryUpgrade1",
		name: "Ραδιοφωνο - Διαφήμηση σε πιο εμπορικές εκπομπές",
		cost: 3500,
		purchased: false,
		tooltip: "Ραδιοφωνο - Διαφήμηση σε πιο εμπορικές εκπομπές \nΚόστος: 3500 Επισκέπτες \nΑπαιτεί τουλάχιστον 10 Διαφήμισεις στο ραδιόφωνο. \nΔιπλασιάζει τους επισκέπτες από κάθε διαφήμιση!",
		prereq: 10
	},
	factoryUpgrade2: {
		tag: "factoryUpgrade2",
		name: "Ραδιοφωνο - Διαφήμηση σε πιο εμπορικές ώρες",
		cost: 12000,
		purchased: false,
		tooltip: "Ραδιοφωνο - Διαφήμηση σε πιο εμπορικές ώρες \nΚόστος: 12000 Επισκέπτες \nΑπαιτεί τουλάχιστον 25 Διαφήμισεις στο ραδιόφωνο. \nΔιπλασιάζει τους επισκέπτες από κάθε διαφήμιση!",
		prereq: 25
	},
	mineUpgrade1: {
		tag: "mineUpgrade1",
		name: "Τηλεόραση - πρόσληψη διάσημου",
		cost: 150000,
		purchased: false,
		tooltip: "Τηλεόραση - πρόσληψη διάσημου \nΚόστος: 150000 Επισκέπτες \nΑπαιτεί τουλάχιστον 10 Διαφήμισεις στην τηλεόραση. \nCookies mined with these pickaxes are extra chocolatey! Each mine produces 100 more cookies at a time!",
		prereq: 10
	},
	mineUpgrade2: {
		tag: "mineUpgrade2",
		name: "Τηλεοπτική καμπάνια",
		cost: 2000000,
		purchased: false,
		tooltip: "Τηλεοπτική καμπάνια \nΚόστος: 2000000 Επισκέπτες \nΑπαιτεί τουλάχιστον 25 Διαφήμισεις στην τηλεόραση. \nCookies drilled with these are infused with extra chocolatey goodness! Each mine produces 150 more cookies at a time!",
		prereq: 25
	}
	
}

window.onload = init();

function init()
{
	//if (localStorage.getItem("save") !== "undefined")
	//	load();
	var cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
	var factoryCost = Math.floor(200 * Math.pow(1.13,buildings.factories));
	var mineCost = Math.floor(20000 * Math.pow(1.16,buildings.mines));
	
	cursorEffUpdate();
	factoryEffUpdate();
	mineEffUpdate();
	
	updateCPC();
	updateCPS();
	
	//Update stats
	document.getElementById("cookies").innerHTML = prettify(cookies);
	document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
	document.getElementById("factories").innerHTML = prettify(buildings.factories);
	document.getElementById("mines").innerHTML = prettify(buildings.mines);
	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
	document.getElementById('cursorCost').innerHTML = prettify(cursorCost);
	document.getElementById('factoryCost').innerHTML = prettify(factoryCost);
	document.getElementById('mineCost').innerHTML = prettify(mineCost);
	
	//Tooltip handling
	document.getElementById('cursorUpgrade1').setAttribute('title', upgrades.cursorUpgrade1.tooltip);
	document.getElementById('cursorUpgrade2').setAttribute('title', upgrades.cursorUpgrade2.tooltip);
	document.getElementById('factoryUpgrade1').setAttribute('title', upgrades.factoryUpgrade1.tooltip);	
	document.getElementById('factoryUpgrade2').setAttribute('title', upgrades.factoryUpgrade2.tooltip);	
	document.getElementById('mineUpgrade1').setAttribute('title', upgrades.mineUpgrade1.tooltip);	
	document.getElementById('mineUpgrade2').setAttribute('title', upgrades.mineUpgrade2.tooltip);	
};

function cookiesOverTime(num)
{
	cookies = cookies + num;
	document.getElementById("cookies").innerHTML = prettify(cookies);
	console.log(num);
};

function cookieClick()
{
	cookies = cookies + cookiesPerClick;
	document.getElementById("cookies").innerHTML = prettify(cookies);
	console.log(cookiesPerClick);
};

function debugClick()  // Used only for testing purposes
{
	cookies = cookies + 10000;
	document.getElementById("cookies").innerHTML = prettify(cookies);
	console.log(cookiesPerClick);
};

function buyCursor()
{
	var cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
	if(cookies >= cursorCost)
	{
		buildings.cursors = buildings.cursors + 1;
		cookies = cookies - cursorCost;
		document.getElementById('cursors').innerHTML = prettify(buildings.cursors);
		document.getElementById('cookies').innerHTML = prettify(cookies);
	};
	var nextCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
	document.getElementById('cursorCost').innerHTML = prettify(nextCost);
	updateCPC();
};

function buyFactory()
{
	var factoryCost = Math.floor(200 * Math.pow(1.13,buildings.factories));
	if(cookies >= factoryCost)
	{
	        buildings.factories = buildings.factories + 1;
    		cookies = cookies - factoryCost;
        	document.getElementById('factories').innerHTML = prettify(buildings.factories);
	        document.getElementById('cookies').innerHTML = prettify(cookies);
	};
	var nextCost = Math.floor(200 * Math.pow(1.13,buildings.factories));
	document.getElementById('factoryCost').innerHTML = prettify(nextCost);
	updateCPS();
};

function buyMine()
{
	var mineCost = Math.floor(20000 * Math.pow(1.16,buildings.mines));
	if(cookies >= mineCost)
	{
	        buildings.mines = buildings.mines + 1;
    		cookies = cookies - mineCost;
        	document.getElementById('mines').innerHTML = prettify(buildings.mines);
	        document.getElementById('cookies').innerHTML = prettify(cookies);
	};
	var nextCost = Math.floor(20000 * Math.pow(1.16,buildings.mines));
	document.getElementById('mineCost').innerHTML = prettify(nextCost);
	updateCPS();
};

function buyUpgrade(upgradeName)
{
	
	switch (upgradeName){
		case "Ικανότεροι Διαφημιστές":
			var upgr = upgrades.cursorUpgrade1;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.cursors >= upgr.prereq)
			{
			        upgr.purchased = true;
			        cursorEffUpdate();
					updateCPC();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
			break;
		case "Διεθνής Διαφημιστές":
			var upgr = upgrades.cursorUpgrade2;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.cursors >= upgr.prereq)
			{
			        upgr.purchased = true;
			        cursorEffUpdate();
					updateCPC();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
			break;
		case "Ραδιοφωνο - Διαφήμηση σε πιο εμπορικές εκπομπές":
			var upgr = upgrades.factoryUpgrade1;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.factories >= upgr.prereq)
			{
			        upgr.purchased = true;
			        factoryEffUpdate();
					updateCPS();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
			break;
		case "Ραδιοφωνο - Διαφήμηση σε πιο εμπορικές ώρες":
			var upgr = upgrades.factoryUpgrade2;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.factories >= upgr.prereq)
			{
			        upgr.purchased = true;
			        factoryEffUpdate();
					updateCPS();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
			break;
		case "Τηλεόραση - πρόσληψη διάσημου":
			var upgr = upgrades.mineUpgrade1;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.mines >= upgr.prereq)
			{
			        upgr.purchased = true;
			        mineEffUpdate();
					updateCPS();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
			break;
		case "Τηλεοπτική καμπάνια":
			var upgr = upgrades.mineUpgrade2;
			if(cookies >= upgr.cost && upgr.purchased == false && buildings.mines >= upgr.prereq)
			{
			        upgr.purchased = true;
			        mineEffUpdate();
					updateCPS();
		    		cookies = cookies - upgr.cost;
		        	updateUpgradeButtons();
			        document.getElementById('cookies').innerHTML = prettify(cookies);
			};
			break;
		default:
			break;
	}
}

function updateCPC()
{
	cursorEffUpdate();
	cookiesPerClick = 1 + cursorEff;
	document.getElementById('cookiesPerClick').innerHTML = prettify(cookiesPerClick);
	console.log(cookiesPerClick);
};

function updateCPS()
{
	factoryEffUpdate();
	mineEffUpdate();
	cookiesPerInterval = factoryEff + mineEff;
	document.getElementById('cookiesPerSecond').innerHTML = prettify(cookiesPerInterval * 10);
}

function prettify(input)
{
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function updateUpgradeButtons()
{
	for (var prop in upgrades) {
		if (upgrades.hasOwnProperty(prop)) {
			if (upgrades[prop].purchased == true) {
				document.getElementById(upgrades[prop].tag).innerHTML = "Upgrade Purchased";
				document.getElementById(upgrades[prop].tag).disabled = true;
			}
			if (upgrades[prop].purchased == false) {
				document.getElementById(upgrades[prop].tag).innerHTML = upgrades[prop].name;
				document.getElementById(upgrades[prop].tag).disabled = false;
			}
		}
	}
}

function save()
{
//	var save = {
//		cookies: cookies,
//		buildings: buildings,
//		upgrades: upgrades
//	}
//	localStorage.setItem("save",JSON.stringify(save));
}

function load()
{
//	if (localStorage.getItem("save") !== "undefined")
//		var savegame = JSON.parse(localStorage.getItem("save"));
//		cookies = savegame.cookies;
//		buildings = savegame.buildings;
//		upgrades = savegame.upgrades;
//		document.getElementById("cookies").innerHTML = prettify(cookies);
//		document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
//		document.getElementById("cursorCost").innerHTML = prettify(Math.floor(10 * Math.pow(1.15,buildings.cursors)));
//		document.getElementById("factories").innerHTML = prettify(buildings.factories);
//		document.getElementById("factoryCost").innerHTML = prettify(Math.floor(100 * Math.pow(1.1,buildings.factories)));
//		
//		updateUpgradeButtons();
//		
//		updateCPC();
//		updateCPS();
}

function deleteSave()
{
//	localStorage.removeItem("save");
//	cookies = 0;
//	buildings.cursors = 0;
//	buildings.factories = 0;
//	cookiesPerClick = 1;
//	cookiesPerInterval = 0;
//	cursorCost = Math.floor(10 * Math.pow(1.15,buildings.cursors));
//	factoryCost = Math.floor(100 * Math.pow(1.1,buildings.factories));
//	document.getElementById("cookies").innerHTML = prettify(cookies);
//	document.getElementById("cursors").innerHTML = prettify(buildings.cursors);
//	document.getElementById("factories").innerHTML = prettify(buildings.factories);
//	document.getElementById("cookiesPerClick").innerHTML = prettify(cookiesPerClick);
//	document.getElementById("cookiesPerSecond").innerHTML = prettify(cookiesPerInterval * 10);
//	document.getElementById("cursorCost").innerHTML = prettify(cursorCost);
//	document.getElementById("factoryCost").innerHTML = prettify(factoryCost);
}

function cursorEffUpdate()  // Used when updating CPC
{
	cursorEff = buildings.cursors;
	if (upgrades.cursorUpgrade1.purchased == true) {cursorEff = cursorEff * 2;}
	if (upgrades.cursorUpgrade2.purchased == true) {cursorEff = cursorEff * 2;}
}

function factoryEffUpdate()  // Used when updating CPS
{
	factoryEff = buildings.factories;
	if (upgrades.factoryUpgrade1.purchased == true) {factoryEff = factoryEff * 2;}
	if (upgrades.factoryUpgrade2.purchased == true) {factoryEff = factoryEff * 2;}
}

function mineEffUpdate()  // Used when updating CPS
{
	mineEff = buildings.mines * 15;
	if (upgrades.mineUpgrade1.purchased == true) {mineEff = mineEff + 10 * buildings.mines;}
	if (upgrades.mineUpgrade2.purchased == true) {mineEff = mineEff + 15 * buildings.mines;}
}
