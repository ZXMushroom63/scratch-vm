/**
 * @fileoverview
 * Convert's Scratch++'s custom blocks to normal scratch.
 */

const fencingBlockDefinitions = require("./definitions/fencing.json");
const powerBlockDefinitions = require("./definitions/power.json");
const previousCostumeBlockDefinitions = require("./definitions/previous.json");
const forceSetSizeBlockDefinitions = require("./definitions/forcesetsize.json");
const pointToXYBlockDefinitions = require("./definitions/pointtoxy.json");
const minMaxBlockDefinitions = require("./definitions/minmax.json");
const ifOperatorBlockDefinitions = require("./definitions/ifoperator.json");
const replaceBlockDefinitions = require("./definitions/replace.json");
const newlineBlockDefinitions = require("./definitions/newline.json");
const hexBlockDefinitions = require("./definitions/hex.json");
const colorBlockDefinitions = require("./definitions/color.json");
const statementPatches = require("./statementPatches.json");

const { reporterPatches } = require("./reporterPatches");
const { reporterPatchesBasic } = require("./reporterPatches");

var moddedBlocks = ["motion_fencing_enable", "motion_fencing_disable", "operator_true", "operator_false", "operator_power",
    "looks_previouscostume", "looks_previousbackdrop", "looks_forcesizeto", "motion_pointtoxy", "operator_min", "operator_max",
    "operator_if", "operator_replace", "operator_newline", "operator_hex", "sensing_color", "data_setlisttosplit"];

var skipInjectingBlockDefinitions = false;
var debug = false;
var githubUrl = "https://github.com/ZXMushroom63/scratch-gui";

/*/
Note to self: If it is blank in normal scratch, check the imports, and scan for typos EVERYWHERE.
If it loads but the inputs are blank make sure to check if the block definitions prototype has an invalid `inputs` object.
/*/

var blockDefinitionsList = [];
blockDefinitionsList.push(fencingBlockDefinitions);
blockDefinitionsList.push(powerBlockDefinitions);
blockDefinitionsList.push(previousCostumeBlockDefinitions);
blockDefinitionsList.push(forceSetSizeBlockDefinitions);
blockDefinitionsList.push(pointToXYBlockDefinitions);
blockDefinitionsList.push(minMaxBlockDefinitions);
blockDefinitionsList.push(ifOperatorBlockDefinitions);
blockDefinitionsList.push(replaceBlockDefinitions);
blockDefinitionsList.push(newlineBlockDefinitions);
blockDefinitionsList.push(hexBlockDefinitions);
blockDefinitionsList.push(colorBlockDefinitions);

const splitFactory = require("./factories/split");

var factoryList = [];
factoryList.push(splitFactory);

var localVariables = {
    "rt_fencing": ["$rt.spriteFencingEnabled", 1],
    "rt_fencing_oldSize": ["$rt.fencing.oldSize", ""],
    "rt_fencing_oldCostume": ["$rt.fencing.oldCostume", ""],
    "rt_glide_newX": ["$rt.glide.newX", 0],
    "rt_glide_newY": ["$rt.glide.newY", 0],
    "rt_glide_oldX": ["$rt.glide.oldX", 0],
    "rt_glide_oldY": ["$rt.glide.oldY", 0],
    "rt_replace_i": ["$rt.replace.i", 0],
    "rt_replace_isMatch": ["$rt.replace.isMatch", 0],
    "rt_replace_j": ["$rt.replace.j", 0],
    "rt_hex": ["$rt.hex", 0],
    "rt_hex_cdiv": ["$rt.hex.cdiv", 0],
    "rt_color_r": ["$rt.color.r", 0],
    "rt_color_g": ["$rt.color.g", 0],
    "rt_color_b": ["$rt.color.b", 0],
    "rt_color_cdiv": ["$rt.color.cdiv", 0],
    "rt_color_oldCostume": ["$rt.color.oldCostume", 0],
    "rt_color_oldSize": ["$rt.color.oldSize", 0],
    "rt_color_hex": ["$rt.color.hex", 0],
    "rt_split_i": ["$rt.split.i", 0],
    "rt_split_isMatch": ["$rt.split.isMatch", 0],
    "rt_split_j": ["$rt.split.j", 0],
    "rt_split_tmp": ["$rt.split.tmp", 0]
}
var globalVariables = {
    "rt_out": ["$rt.out", 0]
}
var localLists = {
    "rt_stack": ["$rt.stack", []],
    "rt_split_temp": ["$rt.split.temp", []],
    "rt_replace": ["$rt.replace", []]
}
var globalLists = {
}

function injectCostumes(project, obj) {
    // Injects the costumes used by Scratch++ to simulate no fencing, etc.
    var data = JSON.parse(project);
    data.targets.forEach(target => {
        if (!target.isStage) {
            let largeCostumeFound = false;
            let nullCostumeFound = false;
            let dotCostumeFound = false;
            target.costumes.forEach(costume => {
                if (costume.name === "$rt.null") {
                    nullCostumeFound = true;
                }
                if (costume.name === "$rt.large") {
                    largeCostumeFound = true;
                }
                if (costume.name === "$rt.dot") {
                    dotCostumeFound = true;
                }
            });
            if (!largeCostumeFound) {
                target.costumes.push({
                    "name": "$rt.large",
                    "bitmapResolution": 1,
                    "dataFormat": "svg",
                    "assetId": obj.rt_large,
                    "md5ext": obj.rt_large + ".svg",
                    "rotationCenterX": 240,
                    "rotationCenterY": 180
                });
            }
            if (!nullCostumeFound) {
                target.costumes.push({
                    "name": "$rt.null",
                    "bitmapResolution": 1,
                    "dataFormat": "svg",
                    "assetId": obj.rt_null,
                    "md5ext": obj.rt_null + ".svg",
                    "rotationCenterX": 0,
                    "rotationCenterY": 0
                })
            }
            if (!dotCostumeFound) {
                target.costumes.push({
                    "name": "$rt.dot",
                    "bitmapResolution": 1,
                    "dataFormat": "svg",
                    "assetId": obj.rt_dot,
                    "md5ext": obj.rt_dot + ".svg",
                    "rotationCenterX": 0.75,
                    "rotationCenterY": 0.75
                })
            }
        }
    });
    return JSON.stringify(data);
}

function injectRuntimeVariables(project, obj) {
    // Injects variables and lists used by the runtime. eg: $rt.out, $rt.stack, $rt.spriteFencingEnabled
    var data = JSON.parse(project);
    data.targets.forEach(target => {
        if (target.isStage) {
            Object.assign(target.variables, globalVariables);
            Object.assign(target.lists, globalLists);
        } else {
            Object.assign(target.variables, localVariables);
            Object.assign(target.lists, localLists);
        }
    })
    return JSON.stringify(data);
}

function applyIfOperatorFix(project, obj) {
    // Scratch serialises boolean inputs weirdly, so this is a hacky fix to make sure that the if operator is ready for compilation.
    var data = JSON.parse(project);
    data.targets.forEach(target => {
        var blockKeys = Object.keys(target.blocks);
        blockKeys.forEach(key => {
            if (target.blocks[key].opcode === "operator_if") {
                var newInputObject = {};
                newInputObject["OPERAND"] = target.blocks[key].inputs["OPERAND"];
                newInputObject["STRING1"] = target.blocks[key].inputs["STRING1"];
                newInputObject["STRING2"] = target.blocks[key].inputs["STRING2"];
                target.blocks[key].inputs = newInputObject;
            }
        });
    });
    return JSON.stringify(data);
}

function applyStatementPatches(project, obj) {
    // Converts Scratch++'s new blocks in to Scratch's custom blocks.
    var targetInputKeys = [];
    function patchBlock(patch, theBlock) {
        var newPatch = Object.assign({}, patch);
        var newBlock = Object.assign({}, theBlock);
        for (let K = 0; K < blockDefinitionsList.length; K++) {
            const blockmod = blockDefinitionsList[K];
            var blockKeys = Object.keys(blockmod);
            for (let i = 0; i < blockKeys.length; i++) {
                const key = blockKeys[i];
                var block = blockmod[key];
                if (block.opcode === "procedures_prototype" && block.mutation.proccode === patch.mutation.proccode) {
                    newPatch.mutation.argumentids = block.mutation.argumentids;
                    targetInputKeys = Object.keys(block.inputs);
                } else if (block.opcode === "procedures_prototype" && debug) {
                    console.log("Failed to match statement patch: " + block.mutation.proccode + " != " + patch.mutation.proccode);
                }
            }
        }
        var inputsObj = {};
        var oldInputKeys = Object.keys(newBlock.inputs);
        for (let i = 0; i < oldInputKeys.length; i++) {
            inputsObj[targetInputKeys[i]] = newBlock.inputs[oldInputKeys[i]];
        }
        newBlock.inputs = inputsObj;
        Object.assign(newBlock, newPatch);
        return newBlock;
    }
    var data = JSON.parse(project);
    var modKeys = Object.keys(statementPatches);
    data.targets.forEach(target => {
        var keys = Object.keys(target.blocks);
        keys.forEach(key => {
            var block = target.blocks[key];
            if (modKeys.includes(block.opcode)) {
                target.blocks[key] = patchBlock(statementPatches[block.opcode], target.blocks[key]);
            }
        });
    });
    return JSON.stringify(data);
}

function applyReporterPatches(project, obj) {
    // Converts reporters to lists and custom blocks. Eg:
    // say (min (6) (4))
    // :TURNS IN TO:
    // delete all of $rt.stack
    // $rt.min (6) (4)
    // say (item (1) of $rt.stack)
    function transpileCustomReporters(project, obj) {
        var targetInputKeys = [];
        function updatePatchWithInputs(patch, theBlock) {
            var newPatch = Object.assign({}, patch);
            var newBlock = Object.assign({}, theBlock);
            for (let K = 0; K < blockDefinitionsList.length; K++) {
                const blockmod = blockDefinitionsList[K];
                var blockKeys = Object.keys(blockmod);
                for (let i = 0; i < blockKeys.length; i++) {
                    const key = blockKeys[i];
                    var block = blockmod[key];

                    if (block.opcode === "procedures_prototype" && block.mutation.proccode === patch.mutation.proccode) {
                        newPatch.mutation.argumentids = block.mutation.argumentids;
                        targetInputKeys = Object.keys(block.inputs);
                    } else if (block.opcode === "procedures_prototype" && debug) {
                        console.log("Failed to match reporter patch: " + block.mutation.proccode + " != " + patch.mutation.proccode);
                    }
                }
            }
            var inputsObj = {};
            var oldInputKeys = Object.keys(newBlock.inputs);
            for (let i = 0; i < oldInputKeys.length; i++) {
                inputsObj[targetInputKeys[i]] = newBlock.inputs[oldInputKeys[i]];
            }
            if (debug) {
                console.log("Patching inputs:");
                console.log(inputsObj);
            }
            newPatch.inputs = inputsObj;
            return newPatch;
        }
        var data = JSON.parse(project);
        var targetOpcodes = Object.keys(reporterPatches);
        data.targets.forEach(target => {
            var statementBlocks = getStatementBlocks(target.blocks);
            if (debug) {
                console.log("Statement blocks: ");
                console.log(statementBlocks);
            }
            statementBlocks.forEach(block => {
                var results = searchInputStackForOpcodes(targetOpcodes, block.id, target.blocks);
                if (results.length > 0) {
                    console.log(results);
                    results = sortInputStack(results);
                    insertBeforeBlockId(target.blocks, block.id, {
                        "opcode": "data_deletealloflist",
                        "inputs": {},
                        "fields": { "LIST": ["$rt.stack", "rt_stack"] },
                        "shadow": false,
                    });
                    for (let i = 0; i < results.length; i++) {
                        var result = results[i];
                        var tempPatch = {
                            "opcode": "procedures_call",
                            "fields": {},
                            "shadow": false,
                            "inputs": {},
                            "mutation": {
                                "tagName": "mutation",
                                "children": [],
                                "proccode": reporterPatches[target.blocks[result.reporterId].opcode],
                                "warp": "true"
                            }
                        }
                        var newPatch = updatePatchWithInputs(tempPatch, target.blocks[result.reporterId]);
                        insertBeforeBlockId(target.blocks, block.id, newPatch);
                        Object.assign(target.blocks[result.reporterId], {
                            "opcode": "data_itemoflist",
                            "inputs": { "INDEX": [1, [7, "" + (i + 1) + ""]] },
                            "fields": { "LIST": ["$rt.stack", "rt_stack"] },
                            "shadow": false,
                        });
                    }
                }
            });
        });
        return JSON.stringify(data);
    }
    var data = JSON.parse(project);
    var basicPatchesKeys = Object.keys(reporterPatchesBasic);
    data.targets.forEach(target => {
        var keys = Object.keys(target.blocks);
        keys.forEach(key => {
            var block = target.blocks[key];
            if (basicPatchesKeys.includes(block.opcode)) {
                if (debug) {
                    console.log("Patching opcode " + block.opcode + " to " + reporterPatchesBasic[block.opcode]);
                }
                block.opcode = reporterPatchesBasic[block.opcode];
            }
        });
    });
    return transpileCustomReporters(JSON.stringify(data), obj);
}

function insertAfterBlockId(blocks, blockId, data) {
    // Utility function to insert a block after another block.
    var newBlockId = genCharList("abcdefghijklmnopqrstuvwxyz1234567890", 14);
    data.next = blocks[blockId].next;
    if (blocks[blockId].next && blocks[blocks[blockId].next].parent === blockId) {
        blocks[blocks[blockId].next].parent = newBlockId;
    }
    data.id = newBlockId;
    blocks[blockId].next = newBlockId;
    data.parent = blockId;
    data.topLevel = false;
    blocks[newBlockId] = data;
}

function removeBlockId(blocks, blockId) {
    // Utility function to remove a block.
    if (blocks[blockId].parent && blocks[blocks[blockId].parent].next === blockId) {
        blocks[blocks[blockId].parent].next = blocks[blockId].next;
    }
    if (blocks[blockId].next && blocks[blocks[blockId].next].parent === blockId) {
        blocks[blocks[blockId].next].parent = blocks[blockId].parent;
    }
    delete blocks[blockId];
}

function insertBeforeBlockId(blocks, blockId, data) {
    // Utility function to insert a block before another block.
    var newBlockId = genCharList("abcdefghijklmnopqrstuvwxyz1234567890", 14);
    data.id = newBlockId;
    data.next = blockId;
    if (blocks[blockId].parent) {
        if (blocks[blocks[blockId].parent].next === blockId) {
            blocks[blocks[blockId].parent].next = newBlockId;
        } else {
            var substackDetected = false;
            var substackKey;
            var inputKeys = Object.keys(blocks[blocks[blockId].parent].inputs);
            for (let i = 0; i < inputKeys.length; i++) {
                const key = inputKeys[i];
                if (key.startsWith("SUBSTACK") && blocks[blocks[blockId].parent].inputs[key][1] === blockId) {
                    substackDetected = true;
                    substackKey = key;
                }
            }
            if (substackDetected) {
                blocks[blocks[blockId].parent].inputs[substackKey][1] = newBlockId;
            }
        }
    }
    data.parent = blocks[blockId].parent;
    blocks[blockId].parent = newBlockId;
    data.topLevel = blocks[blockId].topLevel;
    if (data.topLevel) {
        data.x = blocks[blockId].x;
        data.y = blocks[blockId].y;
    }
    blocks[blockId].topLevel = false;
    blocks[newBlockId] = data;
}

function removeOrphanModdedBlocks(project, obj) {
    // Removes orphan modded blocks that were not compiled.
    var data = JSON.parse(project);

    data.targets.forEach(target => {
        var blockKeys = Object.keys(target.blocks);
        blockKeys.forEach(key => {
            if (target.blocks[key].topLevel && !target.blocks[key].next && !target.blocks[key].parent && moddedBlocks.includes(target.blocks[key].opcode)) {
                removeBlockId(target.blocks, key);
            }
        });
    });

    return JSON.stringify(data);
}

/*/
Returns an array of objects:
[{
    reporterId: BlockID,
    inputsEntry: {
        inputs: Object,
        inputKey: String
    },
    foundIn: BlockID,
    opcode: String,
    depth: Integer
}]
/*/
function searchInputStackForOpcodes(opcodes, blockId, blocks, arr = [], parentBlockId = null, inputKey = null, depth = 0) {
    // Scans down the input stack of a block for a list of opcodes and returns an array of data relating to matches.
    if (opcodes.includes(blocks[blockId].opcode)) {
        var alrDone = false;
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            if (e.reporterId === blockId) {
                alrDone = true;
            }
        }
        if (!alrDone && !!parentBlockId) {
            arr.push({
                reporterId: blockId,
                foundIn: parentBlockId,
                inputsEntry: {
                    inputKey: inputKey,
                    inputs: blocks[parentBlockId].inputs
                },
                opcode: blocks[blockId].opcode,
                depth: depth,
            });
        }
    }
    var inputKeys = Object.keys(blocks[blockId].inputs);
    for (let i = 0; i < inputKeys.length; i++) {
        const ik = inputKeys[i];
        if (blocks[blockId].inputs[ik][0] === 3 && !Array.isArray(blocks[blockId].inputs[ik][1])) {
            arr = searchInputStackForOpcodes(opcodes, blocks[blockId].inputs[ik][1], blocks, arr, blockId, ik, depth + 1);
        }
    }
    return arr;
}

function sortInputStack(stack) {
    // Sorts the results of searchInputStackForOpcodes by depth to ensure that reporters are compiled in the correct order.
    var out = [];
    var tmpKeys = [];
    var tmp = {};
    for (let i = 0; i < stack.length; i++) {
        if (!tmp[stack[i].depth]) {
            tmp[stack[i].depth] = [];
        }
        tmp[stack[i].depth].push(stack[i]);
    }

    tmpKeys = Object.keys(tmp);
    tmpKeys.sort(function (a, b) { return parseInt(b) - parseInt(a) });

    for (let i = 0; i < tmpKeys.length; i++) {
        const depth = tmpKeys[i];
        for (let j = 0; j < tmp[depth].length; j++) {
            out.push(tmp[depth][j]);
        }
    }
    return out;
}

function getBlocksInTree(blocks, blockId, tempBlocks = []) {
    // Returns an array of blocks in a tree.
    const block = blocks[blockId];
    tempBlocks.push(block);
    if (block.next) {
        tempBlocks = getBlocksInTree(blocks, block.next, tempBlocks);
    }
    return tempBlocks;
}
function getStatementBlocks(blocks) {
    // Returns all of the statement blocks from a sprite's blocks object.
    var statementBlocks = [];
    var topLevelBlocks = [];
    var keys = Object.keys(blocks);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (blocks[key].topLevel === true) {
            topLevelBlocks.push(key);
        } else if (blocks[key].parent) {
            var parentBlock = blocks[blocks[key].parent];
            var isValid = false;
            var iKeys = Object.keys(parentBlock.inputs);
            for (let i = 0; i < iKeys.length; i++) {
                const iKey = iKeys[i];
                if (iKey.startsWith("SUBSTACK") && Array.isArray(parentBlock.inputs[iKey]) && parentBlock.inputs[iKey][0] === 2 && parentBlock.inputs[iKey][1] === key) {
                    if (debug) {
                        console.log("Bypassed for " + blocks[key].opcode)
                    }
                    isValid = true;
                }
            }
            if (isValid) {
                topLevelBlocks.push(key);
            }
        }
    }
    for (let i = 0; i < topLevelBlocks.length; i++) {
        const blockid = topLevelBlocks[i];
        var arr = getBlocksInTree(blocks, blockid);
        statementBlocks = statementBlocks.concat(arr);
    }

    return statementBlocks;
}

function addIdPropertiesToBlocks(project, obj) {
    // Adds utility ID properties to all the blocks for use in other scripts.
    var data = JSON.parse(project);
    data.targets.forEach(target => {
        var blockIds = Object.keys(target.blocks);
        blockIds.forEach(blockId => {
            target.blocks[blockId].id = blockId;
        });
    });
    return JSON.stringify(data);
}

function removeIdPropertiesToBlocks(project, obj) {
    // Removes the utility ID properties once done to save storage.
    var data = JSON.parse(project);
    data.targets.forEach(target => {
        var blockIds = Object.keys(target.blocks);
        blockIds.forEach(blockId => {
            if (target.blocks[blockId].id) {
                delete target.blocks[blockId].id;
            }
        });
    });
    return JSON.stringify(data);
}

function addCredits(project, obj) {
    // Adds credits to the projects metadata and also as comments in sprites.
    var data = JSON.parse(project);
    data.meta.GNU = "terry pratchett";
    data.meta.readme = "Compiled from the Scratch++ editor! Made by ZXMushroom63";
    if (window.location.protocol.startsWith("http") && window.location.hostname != "localhost") {
        data.meta.editorUrl = window.location.href;
    } else {
        data.meta.editorUrl = "This sb3 was compiled from either the offline version of the editor or a development version.";
    }
    if (githubUrl != "") {
        data.meta.githubUrl = githubUrl;
    }
    var githubSection = "";
    if (githubUrl != "") {
        githubSection = "\n\nCheck us out on GitHub:\n" + githubUrl;
    }
    var compiledSection = "";
    if (window.location.protocol.startsWith("http") && window.location.hostname != "localhost") {
        compiledSection = "\n\nThis project was compiled with this Scratch++ editor:\n" + window.location.href;
    } else {
        compiledSection = "\n\nThis project was compiled with an offline version of the Scratch++ editor.";
    }
    data.targets.forEach(target => {
        var commentId = genCharList("abcdefghijklmnopqrstuvwxyz1234567890_", 12);
        target.comments[commentId] = {
            "blockId": null,
            "x": 0,
            "y": -200,
            "width": 420,
            "height": 250,
            "minimized": false,
            "text": `▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱\nCompiled with ❤️ by Scratch++!\nMade by ZXMushroom63.${githubSection}${compiledSection}\n▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱`
        }
    });

    return JSON.stringify(data);
}

function injectBlockDefinitions(project, obj) {
    // Injects the custom block definitions.
    var data = JSON.parse(project);
    data.targets.forEach(target => {
        blockDefinitionsList.forEach((blockDefinition) => {
            var copy = Object.assign({}, blockDefinition);
            var keys = Object.keys(copy);
            keys.forEach(key => {
                var block = copy[key];
                if (typeof block.x === "number" || typeof block.y === "number") {
                    block.x = -1500;
                    block.y = -1500;
                }
            });
            Object.assign(target.blocks, copy);
        });
    });
    return JSON.stringify(data);
}

function applyFactories(project, obj) {
    var data = JSON.parse(project);
    data.targets.forEach(target => {
        var targetBlockKeys = Object.keys(target.blocks);
        factoryList.forEach(factory=>{
            targetBlockKeys.forEach(key=>{
                var block = target.blocks[key];
                if (block.opcode === factory.target_opcode) {
                    factory.script(block, target.blocks, key, target);
                }
            });
        });
    });
    return JSON.stringify(data);
}

/*/ 
var obj = {
    rt_null: "afafa",
    rt_large: "afafa",
}
/*/

function toSb3(project, obj) {
    var p = project;
    p = applyIfOperatorFix(p, obj);
    p = addIdPropertiesToBlocks(p, obj);
    p = injectCostumes(p, obj);
    p = injectRuntimeVariables(p, obj);
    p = applyReporterPatches(p, obj);
    p = applyStatementPatches(p, obj);
    p = applyFactories(p, obj);
    if (!skipInjectingBlockDefinitions) {
        p = injectBlockDefinitions(p, obj);
    }
    p = removeOrphanModdedBlocks(p, obj);
    p = addCredits(p, obj);
    p = removeIdPropertiesToBlocks(p, obj);
    return p;
}

function genCharList(charlist, len) {
    // Function used to generate a randomized UUID from a charlist (either an array of characters or a string) or length len.
    var str = "";
    for (let i = 0; i < len; i++) {
        str += charlist[Math.floor(charlist.length * Math.random())]
    }
    return str;
}

// Exporting the functions for use in virtual-machine.js
module.exports = {
    toSb3: toSb3,
    genCharList: genCharList
}