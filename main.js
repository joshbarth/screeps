var harvester = require("role.harvester");
var upgrader = require("role.upgrader");
var creepEnums = require("creep.enums");

module.exports.loop = function () {
    Game.creeps.forEach(function (creep) {
        switch (creep.memory.role) {
            case creepEnums.Roles.HARVESTER:
                harvester.run(creep);
                break;
            case creepEnums.Roles.UPGRADER:
                upgrader.run(creep);
                break;
            default:
                break;
        }
    });

    Game.spawns.forEach(function (spawn){
        if (spawn.energy >= 300) {
            var x = Game.time;
            spawn.createCreep([MOVE, CARRY, WORK], 'Worker' + x, {role: creepEnums.Roles.HARVESTER});
        }
    });
    
    //clean up dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
};