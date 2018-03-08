var harvester = require("role.harvester");
var upgrader = require("role.upgrader");
var creepEnums = require("creep.enums");

var targetHarvesters = 3;
var targetUpgraders = 1;

module.exports.loop = function () {
    var numOfHarvesters = 0;
    var numOfUpgraders = 0;

    Array.from(Game.creeps).forEach(function (creep) {
        switch (creep.memory.role) {
            case creepEnums.Roles.HARVESTER:
                numOfHarvesters++;
                harvester.run(creep);
                break;
            case creepEnums.Roles.UPGRADER:
                numOfUpgraders++;
                upgrader.run(creep);
                break;
            default:
                break;
        }
    });

    Array.from(Game.spawns).forEach(function (spawn){
        if (spawn.energy >= 300) {
            var x = Game.time;
            var role;
            if(numOfHarvesters < targetHarvesters) {
                role = creepEnums.Roles.HARVESTER;
                console.log("[INFO] Spawning Harvester");
            } else if(numOfUpgraders < targetUpgraders) {
                role = creepEnums.Roles.UPGRADER;
                console.log("[INFO] Spawning Upgrader");
            }
            if(role !== undefined) {
                spawn.createCreep([MOVE, CARRY, WORK], 'Worker' + x, {role: role});
            }
        }
    });
    
    //clean up dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
};