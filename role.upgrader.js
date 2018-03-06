var enums = require("creep.enums");

var roleUpgrader = {
    run: function(creep) {
        var target;
        if(_.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.state = enums.States.UPGRADE;
            target = creep.room.controller.pos;
        } else {
            creep.memory.state = enums.States.WITHDRAW;
            target = creep.pos.findClosestByPath(Room.FIND_MY_SPAWNS);
        }
        
        if(creep.pos.isNearTo(target)) {
            switch(creep.memory.state) {
                case enums.States.UPGRADE:
                    creep.upgradeController(target)
                    break;
                case enums.States.WITHDRAW:
                    creep.withdraw(target, RESOURCE_ENERGY);
                    break;
                default:
                    break;
            }
        } else {
            creep.moveTo(target);
        }
    }
};

module.exports = roleUpgrader;