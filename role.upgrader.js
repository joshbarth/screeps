var enums = require("creep.enums");

var roleUpgrader = {
    run: function(creep) {
        var target;
        if (_.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.state = enums.States.UPGRADE;
            target = creep.room.controller.pos;
        } else {
            creep.memory.state = enums.States.WITHDRAW;
            target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        }


        switch (creep.memory.state) {
            case enums.States.UPGRADE:
                if(creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                break;
            case enums.States.WITHDRAW:
                if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                break;
            default:
                break;
        }
    }
};

module.exports = roleUpgrader;