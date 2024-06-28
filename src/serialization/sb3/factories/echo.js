module.exports = {
    target_opcode: ["operator_color", "operator_string"],
    script: function (block, blocks, blockId, target, projectJson) {
        var valueKey = Object.keys(block.inputs)[0];
        Object.assign(block, { // Replace network_messagerecieved blocks with event_whenbroadcastreceived blocks.
            "opcode": "operator_join",
            "inputs": {
                "STRING1": block.inputs[valueKey],
                "STRING2": [1, [10, ""]]
            },
        });
    }
}