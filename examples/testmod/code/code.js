GDT.addAchievement({title: "Testing Achievmement", description: "[insert description here]"}, isActivated:(function(){return true;})});
GDT.addLabResearch({
        id: "popupthingy",
        name: "Popup Research".localize(),
        pointsCost: 1500,
        canResearch: function(b) {
            return true
        },
        description: "lol do nothing/".localize(),
        complete: function(_) {}
}