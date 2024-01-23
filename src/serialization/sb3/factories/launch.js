function genCharList(charlist, len) {
    // Function used to generate a randomized UUID from a charlist (either an array of characters or a string) of length len.
    var str = "";
    for (let i = 0; i < len; i++) {
        str += charlist[Math.floor(charlist.length * Math.random())];
    }
    return str;
}
module.exports = {
    target_opcode: "control_launch",
    script: function (block, blocks, blockId, target, projectJson) {
        var broadcastReceiveId = genCharList("abcdefghijklmnopqrstuvwxyz1234567890", 14);
        var broadcastVarId = genCharList("abcdefghijklmnopqrstuvwxyz1234567890", 14);
        var broadcastVarName = genCharList("abcdefghijklmnopqrstuvwxyz1234567890", 14);
        var substackid = block.inputs["SUBSTACK"] && typeof block.inputs["SUBSTACK"][1] === "string" ? block.inputs["SUBSTACK"][1] : null;
        projectJson.targets.forEach(targ => { // Search for the stage, and inject the network loop inside.
            if (targ.isStage) {
                targ.broadcasts[broadcastVarId] = broadcastVarName;
            }
        });
        
        Object.assign(block, {
            "opcode": "event_broadcast",
            "inputs": {
                "BROADCAST_INPUT": [1, [11, broadcastVarName, broadcastVarId]]
            },
            "fields": {},
            "shadow": false,
        });
        if (substackid) {
            blocks[substackid].parent = broadcastReceiveId;
            blocks[broadcastReceiveId] = {
                "opcode": "event_whenbroadcastreceived",
                "next": substackid,
                "parent": null,
                "inputs": {},
                "fields": {
                    "BROADCAST_OPTION": [broadcastVarName, broadcastVarId]
                },
                "shadow": false,
                "topLevel": true,
                "x": 0,
                "y": 0
            };
        }
    }
}