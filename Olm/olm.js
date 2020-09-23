var health = 99;
var prayer = '';
var attackstyle = 'mage';
var olm;
var canvas = document.getElementById("olm-fight");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function StartSim(){
	health = 99;
	prayer = '';
	attackstyle = 'mage';
	document.getElementById("olm_attack_style").innerHTML = attackstyle;
	document.getElementById("user_health").innerHTML = health;
	sleep(2400).then(() => { OlmAttack(); });
}
function component(){
	health = 1;
}

function MagePray(){
	prayer = 'mage';
	document.getElementById("user_prayer").innerHTML = prayer;
}
function RangePray(){
	prayer = 'range';
	document.getElementById("user_prayer").innerHTML = prayer;
}

function DrinkAid(){
	if (health <=0){
		return;
	}
	if (health <= 115){
		health = health + 19;
		if (health > 115){
		health = 115;
		}
	}
	document.getElementById("user_health").innerHTML = health;
}

<!--  -->
function OlmChangeAttack(){
    if (attackstyle == 'range'){
		console.log('switched to mage');
        attackstyle = 'mage';
	}
    else{
        attackstyle = 'range';
		console.log('switched to range');
	}
}

function OlmAttack(){
	<!-- while (health > 0){ -->
		attack = Math.floor(Math.random() * 10);
		if (attack >= 7){
			OlmChangeAttack();
			<!-- console.log('changed attacks'); -->
			document.getElementById("olm_attack_style").innerHTML = attackstyle;
		}
		if (attackstyle == prayer){
			damage = Math.floor(Math.random() * 5);
			health =  health - damage;
			if (health <= 0){
				document.getElementById("user_health").innerHTML = 'Dead';
			}
			else{
				document.getElementById("user_health").innerHTML = health;
			}
		}
		if (attackstyle != prayer){
			damage = Math.floor(Math.random() * 40);
			health = health - damage;
			if (health <= 0){
				document.getElementById("user_health").innerHTML = 'Dead';
			}
			else{
				document.getElementById("user_health").innerHTML = health;
			}
		}
		console.log(attackstyle);
		console.log(damage);
		sleep(2400).then(() => { OlmAttack(); });
	<!-- } -->
}
tartSim();