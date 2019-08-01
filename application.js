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
	if (desiredPercent >= 100 || startChance <= 0) {
		alert('Invalid percent');
		return 0;
	};
	for (let i = 0; i <= 92100; i++) {
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