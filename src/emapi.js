/*
	Source of Extended Mod API
	Written by Looah
	By using this file you accept the Greenheart Games Modding Agreement.
	Licensed under the ISC license.
	-- the legal disclaimer stuff that nobody understands except l33t hax0rs --
	Copyright (c) Looah <looah@cock.li>

	Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
	OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR
	ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
	ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	--
	Yes, this does mean that you're allowed to distribute this modifications its files with your mod.
*/
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
function _doesExist(x)
{
	if (typeof x != "undefined")
	{
		return x;
	} else {
		return false;
	}
}
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
			id: checkExist(achievement.id) || "noname_" + (UniqueValue-1),
			title: achievement.title || typeof achievement.title,
			description: achievement.description || typeof achievement.description,
			isAchieved: checkExist(achievement.isAchieved) || (function(){return false;}),
			tint: checkExist(achievement.tint) || "#F4B300",
			value: checkExist(achievement.value) || 150
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
			_yieldUntil(Sound);
			createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
			var musicloader = new createjs.LoadQueue;
			musicloader.installPlugin(createjs.Sound);
			musicloader.loadManifest([music]);
			Sound._backgroundMusic.push(music.id);
		}
	//UI
	var CollectedMenuItems = {};
		GDT.addMenuItem = function (menuitem) {
			CollectedMenuItems.push(menuitem); //lel
		};
		GDT.updateMenuItems = function (characterContextMenu) {
			_yieldUntil(UI);
			var oldContextMenu = UI.showContextMenu;
			var newContextMenu = function(menuitems, mousepos) {
				if (GameManager.isIdle() && !UI.getCharUnderCursor())
				{
					CollectedMenuItems.forEach(menuitems.push());
				}
				oldContextMenu(menuitems, mousepos);
			}
			UI.showContextMenu = newContextMenu;
		};
		GDT.removeCustomMenuItems = function() {
			CollectedMenuItems=[];
		}
	//Lab researches
		GDT.addLabResearch = function (research)
		{
			yieldUntil(Research);
			Research.push(research);
		}
})();