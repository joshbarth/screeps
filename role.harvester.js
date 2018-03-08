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
        
        if(creep.pos.isNearTo(target)) {
            switch(creep.memory.state) {
                case enums.States.HARVEST:
                    creep.harvest(target);
                    break;
                case enums.States.TRANSFER:
                    creep.transfer(target, RESOURCE_ENERGY);
                    break;
                default:
                    break;
            }
        } else {
            creep.moveTo(target);
        }
    }
};

module.exports = roleHarvester;