function startup() {
    document.getElementById('rollsForm').style.display = 'none';
    document.getElementById('orbsForm').style.display = 'none';
};
function showRollsForm(whichForm) {
    if (whichForm) {
        document.getElementById('rollsForm').style.display = 'block';
        document.getElementById('orbsForm').style.display = 'none';
    }
    else {
        document.getElementById('orbsForm').style.display = 'block';
        document.getElementById('rollsForm').style.display = 'none';
    };
};
function findRolls() {
    percentList = [];
    chanceList = [0];
    cumulativeChance = [0];
    pity = 0.25;
    frequency = 5;
	startChance = parseFloat(document.getElementById('starting').value);
	desiredPercent = parseFloat(document.getElementById('desired').value);
    if (!document.getElementById('nopity').checked) {
        if (document.getElementById('pitypercent').value != '') {
            pity = parseFloat(document.getElementById('pitypercent').value);
        };
        if (document.getElementById('pityfrequency').value != '') {
            frequency = parseFloat(document.getElementById('pityfrequency').value);
        };
    }
    else {
        pity = 0;
        frequency = 1;
    };
	if (desiredPercent >= 100 || desiredPercent <= 0 || startChance <= 0 || startChance > 100) {
		alert('Invalid percent');
		return 0;
	};
	for (let i = 0; i <= 92100; i++) {  // I'm sure this number was probably significant but I don't remember why
		percentList[i] = startChance + pity * i;
	};
	actualChance = startChance/100;
	rolls = 0;
    if (!(actualChance < (desiredPercent)/100)) {  // We already have the desired chance
        rolls = 1;
    };
	while (actualChance < (desiredPercent)/100) {
		rolls++;
		chanceList[rolls] = percentList[Math.floor(rolls/frequency)]/100;
		cumulativeChance[rolls] = 1 - ((1 - cumulativeChance[rolls-1]) * (1 - chanceList[rolls]));
		actualChance = cumulativeChance[rolls];
	};
    document.getElementById('rollsResult').innerText = rolls;
	return;
};
function findOrbs() {
    if (document.getElementById('summons').value != '' && !isNaN(document.getElementById('summons').value)) {
        currentSummons = parseFloat(document.getElementById('summons').value);
    }
    else {
        alert('Input a valid number of summons');
        return 0;
    };
    if (currentSummons < 0 || currentSummons > 40) {
        alert('Invalid number of summons');
        return 0;
    };
    summonsRemaining = 40 - currentSummons;
    orbsRemaining = Math.floor(summonsRemaining/5) * 20;
    switch (summonsRemaining % 5) {
        case 1:
            orbsRemaining += 5;
            break;
        case 2:
            orbsRemaining += 9;
            break;
        case 3:
            orbsRemaining += 13;
            break;
        case 4:
            orbsRemaining += 17;
            break;
        default:
            break;
    }
    document.getElementById('orbsResult').innerText = orbsRemaining + " orbs until guarantee (assuming you roll full multis)"
};
function toggleCheckBox() {
    if (document.getElementById('nopity').checked) {
        document.getElementById('pitypercent').parentNode.style.display = 'none';
        document.getElementById('pityfrequency').parentNode.style.display = 'none';
    }
    else {
        document.getElementById('pitypercent').parentNode.style.display = 'block';
        document.getElementById('pityfrequency').parentNode.style.display = 'block';
    };
};