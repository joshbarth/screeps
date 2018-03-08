var enums = require("creep.enums");

var roleHarvester = {
    run: function(creep) {
        var target;
        if(_.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.state = enums.States.TRANSFER;
            target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        } else {
            creep.memory.state = enums.States.HARVEST;
            target = creep.pos.findClosestByPath(FIND_SOURCES);
        }
        switch(creep.memory.state) {
            case enums.States.HARVEST:
                if(creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                break;
            case enums.States.TRANSFER:
                if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
                break;
            default:
                break;
        }
    }
};

module.exports = roleHarvester;