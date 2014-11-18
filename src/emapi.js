/*
	Source of Extended Mod API
	Written by Looah
	By using this file you accept the Greenheart Games Modding Agreement.
	Licensed under the ISC license.
	-- the legal disclaimer stuff that nobody understands except lawyers --
	Copyright (c) Looah <looah@cock.li>

	Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
	OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR
	ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
	ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	--
	Yes, this does mean that you're allowed to distribute this modifications its files with your mod.
*/

/* 
TODO list
- add argument-type checks to avoid errors that could break other mods too
- make default objects to avoid weird researches/achievements/music etc.
- fix lab researches
- finish texture swapping

/*/

// If EMAPI is already running, halt code
if (typeof EMAPI_RUNNING != "undefined")
{
	console.log("EMAPI already running :/");
	while (true)
	{
		//ugly halt
	}
}
console.log("Preparing EMAPI");
var EMAPI_RUNNING = true; //tell EMAPI is running

//if existant, return it, else return false
function _doesExist(x)
{
	if (typeof x != "undefined")
	{
		return x;
	} else {
		return false;
	}
}
//yield until x exists
function _yieldUntil(x)
{
	while (typeof x == "undefined") {} //yield
	return x;
}

(function(){
var UniqueValue = 0; //used for making non-conflicting id's
	//Achievements
		GDT.addAchievement = function (achievement) {
			_yieldUntil(Achievements);
			Achievements[achievement.id || "noname_" + UniqueValue++]={
			id: _doesExist(achievement.id) || "noname_" + (UniqueValue-1),
			title: achievement.title || typeof achievement.title,
			description: achievement.description || typeof achievement.description,
			isAchieved: _doesExist(achievement.isAchieved) || (function(){return false;}),
			tint: _doesExist(achievement.tint) || "#F4B300",
			value: _doesExist(achievement.value) || 150
			};
		}
		GDT.getAchievements = function() {
			_yieldUntil(Achievements);
			return Achievements.getAllItems();
		}
		GDT.resetAchievements = function() {
			_yieldUntil(Achievements);
			Achievements.resetAchievements();
		}
	//Music and sound effects
		GDT.resetMusic = function () {
			_yieldUntil(Sound);
			Sound._backgroundMusic = [];
			Sound._backgroundMusic2 = [];
			Sound._backgroundMusic3 = [];
			Sound._backgroundMusic4 = [];
		}
		GDT.resetMusicByStage = function (stage) {
			_yieldUntil(Sound);
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
			_yieldUntil(Sound)
			music.type = "sound";
			createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
			var musicloader = new createjs.LoadQueue;
			musicloader.installPlugin(createjs.Sound);
			musicloader.loadManifest([music]);
			Sound._backgroundMusic.push(music.id);
		}
	//UI
		GDT.addMenuItem = function (menuitem, overCharacter) {
			_yieldUntil(UI);
			var oldContextMenu = UI.showContextMenu;
			var newContextMenu = function(menuitems, mousepos) {
				if (overCharacter)
				{
					if (GameManager.isIdle() && UI.getCharUnderCursor())
					{
						menuitems.push(menuitem);
					}  	
				} else {
					if (GameManager.isIdle() && !UI.getCharUnderCursor())
					{
						menuitems.push(menuitem);
					} 
				}
				oldContextMenu(menuitems, mousepos);
			}
			UI.showContextMenu = newContextMenu;
		};
	//Graphic stuff
		GDT.swapImageOrTexture = function(){} //TODO: make this thing work
	//Lab researches
		GDT.addLabResearch = function (research)
		{
			_yieldUntil(Research);
			Research[research.id]=research;
			Research.bigProjects.push(Research[research.id]);
			//TODO: manage to make them actually appear correctly
		}
})();