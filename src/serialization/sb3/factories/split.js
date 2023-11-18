var splitDef = require("./split.json");

module.exports = {
    target_opcode: "data_setlisttosplit",
    script: function (block, blocks, blockId, target) {
        var listName = block.fields["LIST"][0];
        var listId = block.fields["LIST"][1];
        var prototypeBlock = null;
        if (!blocks[`rt_split_${listName}_3`]) {
            var def = JSON.stringify(splitDef);
            var uIndex = 1;
            def = def.replaceAll("{LISTNAME}", listName);
            def = def.replaceAll("{LISTID}", listId);
            while (def.includes(`{uuid`)) {
                def = def.replaceAll(`{uuid${uIndex}}`, `rt_split_${listName}_${uIndex}`);
                uIndex++;
                if (uIndex > 999) {
                    console.log(def);
                    break;
                }
            }
            var definition = JSON.parse(def);
            prototypeBlock = definition[`rt_split_${listName}_3`];
            Object.assign(blocks, definition);
        } else {
            prototypeBlock = blocks[`rt_split_${listName}_3`];
        }
        
        // Now to convert the split block into a procedures_call block

        block.opcode = "procedures_call";
        block.mutation = {
            tagName: "mutation",
            children: [],
            proccode: `$rt.split.${listName} %s by %s`,
            warp: "true"
        }
        block.mutation.argumentids = prototypeBlock.mutation.argumentids;
        block.fields = {};

        var targetInputKeys = Object.keys(prototypeBlock.inputs);
        var inputsObj = {};
        var oldInputKeys = Object.keys(block.inputs);
        for (let i = 0; i < oldInputKeys.length; i++) {
            inputsObj[targetInputKeys[i]] = block.inputs[oldInputKeys[i]];
        }
        block.inputs = inputsObj;
    }
}