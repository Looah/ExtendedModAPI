//Enhanced Mod API
//Written by Looah

// If EMAPI is already running, halt code
if (typeof EMAPI_RUNNING != "undefined")
{
	while (true)
	{
		//ugly halt
	}
}

//flags
var EMAPI_RUNNING = true;
//simple check if undefined or not
function checkExist(x)
{
	if (typeof x != "undefined")
	{
		return x;
	} else {
		return false;
	}
}
function waitForExist(x)
{
	while (typeof x == "undefined") {} //yield
	return x;
}
(function(){
var UniqueValue = 0;
	//Achievements
		GDT.addAchievement = function (achievement) {
			while (typeof Achievements == "undefined") {} //yield until Achievements exists
			Achievements[achievement.id]={
			id: checkExist(achievement.id) || "Unnamed_" + (UniqueValue-1),
			title: achievement.title || typeof achievement.title,
			description: achievement.description || typeof achievement.description,
			isAchieved: checkExist(achievement.isAchieved) || (function(){return false;}),
			tint: checkExist(achievement.tint) || "#F4B300",
			value: checkExist(achievement.value) || 150
			};
		}
		GDT.getAchievements = function() {
			
		}
	//Music and sound effects
		GDT.resetMusic = function () {
			while (!checkExist(Sound)) {} //yield until Sound exists
			Sound._backgroundMusic = [];
			Sound._backgroundMusic2 = [];
			Sound._backgroundMusic3 = [];
			Sound._backgroundMusic4 = [];
		}
		GDT.resetMusicByStage = function (stage) {
		while (!checkExist(Sound)) {} //yield until Sound exists
			switch (stage)
			{
				case 1:
					Sound._backgroundMusic = [];
					break;
				case 2:
					Sound._backgroundMusic2 = [];
					break;
				case 3:
					Sound._backgroundMusic3 = [];
					break;
				case 4:
					Sound._backgroundMusic4 = [];
					break;
				default:
					break;
			}
		}
		GDT.addMusic = function (music) {
			while (!checkExist(Sound)) {} //yield until Sound exists
			createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
			var musicloader = new createjs.LoadQueue;
			musicloader.installPlugin(createjs.Sound);
			musicloader.loadManifest([music]);
			Sound._backgroundMusic.push(music.id);
		}
	//UI
		
})();