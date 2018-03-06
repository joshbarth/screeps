var harvester = require("role.harvester");
var upgrader = require("role.upgrader");
var creepEnums = require("creep.enums");

module.exports.loop = function () {
    for(var i in Game.creeps) {
        var creep = Game.creeps[i];

        switch(creep.memory.role) {
            case creepEnums.Roles.HARVESTER:
                harvester.run(creep);
                break;
            case creepEnums.Roles.UPGRADER:
                upgrader.run(creep);
                break;
            default:
                break;
        }
    }
    
    for(var i in Game.spawns) {
        var spawn = Game.spawns[i];
        
        if (spawn.energy >= 300) {
            var x = Game.time;
            spawn.createCreep([MOVE, CARRY, WORK], 'Worker' + x, { memory: {role: creepEnums.Roles.HARVESTER}});
        }
    }
    
    //clean up dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}