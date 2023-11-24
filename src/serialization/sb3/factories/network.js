var netDef = require("./network.json");

module.exports = {
    target_opcode: "network_messagereceived",
    script: function (block, blocks, blockId, target, projectJson) {
        projectJson.targets.forEach(targ => { // Search for the stage, and inject the network loop inside.
            if (targ.isStage) {
                console.log("Found stage, injecting...");
                Object.assign(targ.blocks, netDef);
            }
        });
        Object.assign(block, { // Replace network_messagerecieved blocks with event_whenbroadcastreceived blocks.
            "opcode": "event_whenbroadcastreceived",
            "inputs": {},
            "fields": {
                "BROADCAST_OPTION": [
                    "$rt.Network Message Received",
                    "rt_network_message_received"
                ]
            },
        });
    }
}