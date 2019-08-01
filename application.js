function findRolls() {
    percentList = [];
    chanceList = [0];
    cumulativeChance = [0];
    pity = 0.25;
    frequency = 5;
	startChance = parseInt(document.getElementById('starting').value);
	desiredPercent = parseInt(document.getElementById('desired').value);
    if (!document.getElementById('nopity').checked) {
        if (document.getElementById('pitypercent').value != '') {
            pity = parseInt(document.getElementById('pitypercent').value);
        };
        if (document.getElementById('pityfrequency').value != '') {
            frequency = parseInt(document.getElementById('pityfrequency').value);
        };
    }
    else {
        pity = 0;
        frequency = 1;
    };
	if (desiredPercent >= 100) {
		alert('Invalid percent');
		return 0;
	};
	for (let i = 0; i <= 1000; i++) {
		percentList[i] = startChance + pity * i;
	};
	actualChance = startChance/100;
	rolls = 0;
	while (actualChance < (desiredPercent)/100) {
		rolls++;
		chanceList[rolls] = percentList[Math.floor(rolls/frequency)]/100;
		cumulativeChance[rolls] = 1 - ((1 - cumulativeChance[rolls-1]) * (1 - chanceList[rolls]));
		actualChance = cumulativeChance[rolls];
	};
    document.getElementById('result').innerText = rolls;
	return;
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