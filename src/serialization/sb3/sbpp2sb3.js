/**
 * @fileoverview
 * Convert's Scratch++'s custom blocks to normal scratch.
 */

var blockDefinitions = [
    {
        opcodes: [],
        force: true,
        definition: require("./definitions/fencing.json"),
    },
    {
        opcodes: ["operator_power"],
        force: false,
        definition: require("./definitions/power.json"),
    },
    {
        opcodes: ["looks_previouscostume", "looks_previousbackdrop"],
        force: false,
        definition: require("./definitions/previous.json"),
    },
    {
        opcodes: ["looks_forcesizeto"],
        force: true,
        definition: require("./definitions/forcesetsize.json"),
    },
    {
        opcodes: ["motion_pointtoxy"],
        force: false,
        definition: require("./definitions/pointtoxy.json"),
    },
    {
        opcodes: ["operator_min", "operator_max"],
        force: false,
        definition: require("./definitions/minmax.json"),
    },
    {
        opcodes: ["operator_if"],
        force: false,
        definition: require("./definitions/ifoperator.json"),
    },
    {
        opcodes: ["operator_replace"],
        force: false,
        definition: require("./definitions/replace.json"),
    },
    {
        opcodes: ["operator_newline"],
        force: false,
        definition: require("./definitions/newline.json"),
    },
    {
        opcodes: ["operator_hex"],
        force: false,
        definition: require("./definitions/hex.json"),
    },
    {
        opcodes: ["sensing_color"],
        force: false,
        definition: require("./definitions/color.json"),
    },
    {
        opcodes: ["operator_fastpower"],
        force: false,
        definition: require("./definitions/fastpower.json"),
    },
    {
        opcodes: [
            "network_messagereceived",
            "network_message",
            "network_start",
            "network_stop",
            "network_send",
            "network_broadcast",
        ],
        force: false,
        globalVariables: {
            rt_channel: ["☁ $rt.channel", 0, true],
            rt_network_active: ["$rt.network.active", 0],
            rt_network_cache: ["$rt.network.cache", 0],
            rt_network_message: ["$rt.network.message", ""],
        },
        broadcasts: {
            rt_network_message_received: "$rt.Network Message Received",
        },
        removeExtensions: ["network"],
        definition: require("./definitions/network.json"),
    },
    {
        opcodes: ["operator_substring"],
        force: false,
        definition: require("./definitions/substring.json"),
    },
    {
        opcodes: ["operator_startswith"],
        force: false,
        definition: require("./definitions/startswith.json"),
    },
    {
        opcodes: ["operator_endswith"],
        force: false,
        definition: require("./definitions/endswith.json"),
    },
    {
        opcodes: [
            "impulse_reset",
            "impulse_step",
            "impulse_setgravity",
            "impulse_xgravity",
            "impulse_ygravity",
            "impulse_settimestep",
            "impulse_timestep",
            "impulse_setquality",
            "impulse_quality",
            "impulse_setpenetrationcorrection",
            "impulse_penetrationcorrection",
            "impulse_objectcount",
            "impulse_addcircle",
            "impulse_addrectrangle",
            "impulse_objectids",
            "impulse_setxofobject",
            "impulse_changexofobject",
            "impulse_setyofobject",
            "impulse_changeyofobject",
            "impulse_setrotationofobject",
            "impulse_setvelocityofobject",
            "impulse_addvelocitytoobject",
            "impulse_addforcetoobject",
            "impulse_setangularvelocityofobject",
            "impulse_addangularvelocitytoobject",
            "impulse_setwidthofobject",
            "impulse_setheightofobject",
            "impulse_setdensityofobject",
            "impulse_setidofobject",
            "impulse_deleteobject",
            "impulse_objectexists",
            "impulse_getdatabyid",
            "impulse_retrievedbodytype",
            "impulse_retrievedbodyid",
            "impulse_retrievedbodyx",
            "impulse_retrievedbodyy",
            "impulse_retrievedbodyvx",
            "impulse_retrievedbodyvy",
            "impulse_retrievedbodywidth",
            "impulse_retrievedbodyheight",
            "impulse_retrievedbodyrotation",
            "impulse_retrievedbodyvr",
            "impulse_retrievedbodyradius",
            "impulse_retrievedbodymass",
            "impulse_retrievedbodydensity",
            "impulse_retrievedbodycollided",
            "impulse_retrievedbodylastcollidedid",
            "impulse_loadscenedata",
            "impulse_scenedata",
        ],
        force: false,
        globalLists: {
            rt_impulse_rigid_body: [
                "$rt.impulse.rigid_body",
                [
                    0, 1, 0, -1, -1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
            ],
            rt_impulse_manifolds: ["$rt.impulse.manifolds", []],
            rt_impulse_out: ["$rt.impulse.out", []],
        },
        globalVariables: {
            rt_impulse_rb: ["$rt.impulse.@RB", 34],
            rt_impulse_uniqueid: ["$rt.impulse.UniqueID", 0],

            rt_impulse_currentbody_id: ["$rt.impulse.currentbody.id", ""],
            rt_impulse_currentbody_width: ["$rt.impulse.currentbody.width", 0],
            rt_impulse_currentbody_height: [
                "$rt.impulse.currentbody.height",
                0,
            ],
            rt_impulse_currentbody_x: ["$rt.impulse.currentbody.x", 0],
            rt_impulse_currentbody_y: ["$rt.impulse.currentbody.y", 0],
            rt_impulse_currentbody_rotation: [
                "$rt.impulse.currentbody.rotation",
                0,
            ],
            rt_impulse_currentbody_type: ["$rt.impulse.currentbody.type", 0],
            rt_impulse_currentbody_mass: ["$rt.impulse.currentbody.mass", 0],
            rt_impulse_currentbody_collided: [
                "$rt.impulse.currentbody.collided",
                0,
            ],
            rt_impulse_currentbody_vx: ["$rt.impulse.currentbody.vx", 0],
            rt_impulse_currentbody_vy: ["$rt.impulse.currentbody.vy", 0],
            rt_impulse_currentbody_vr: ["$rt.impulse.currentbody.vr", 0],
            rt_impulse_currentbody_radius: [
                "$rt.impulse.currentbody.radius",
                0,
            ],
            rt_impulse_currentbody_density: [
                "$rt.impulse.currentbody.density",
                0,
            ],
            rt_impulse_currentbody_lastcollidedid: [
                "$rt.impulse.currentbody.lastCollidedId",
                "",
            ],
            rt_impulse_retrieved_id: ["$rt.impulse.retrieved.id", ""],
            rt_impulse_retrieved_width: ["$rt.impulse.retrieved.width", 0],
            rt_impulse_retrieved_height: ["$rt.impulse.retrieved.height", 0],
            rt_impulse_retrieved_x: ["$rt.impulse.retrieved.x", 0],
            rt_impulse_retrieved_y: ["$rt.impulse.retrieved.y", 0],
            rt_impulse_retrieved_rotation: [
                "$rt.impulse.retrieved.rotation",
                0,
            ],
            rt_impulse_retrieved_type: ["$rt.impulse.retrieved.type", 0],
            rt_impulse_retrieved_mass: ["$rt.impulse.retrieved.mass", 0],
            rt_impulse_retrieved_collided: [
                "$rt.impulse.retrieved.collided",
                0,
            ],
            rt_impulse_retrieved_vx: ["$rt.impulse.retrieved.vx", 0],
            rt_impulse_retrieved_vy: ["$rt.impulse.retrieved.vy", 0],
            rt_impulse_retrieved_vr: ["$rt.impulse.retrieved.vr", 0],
            rt_impulse_retrieved_radius: ["$rt.impulse.retrieved.radius", 0],
            rt_impulse_retrieved_density: ["$rt.impulse.retrieved.density", 0],
            rt_impulse_retrieved_lastcollidedid: [
                "$rt.impulse.retrieved.lastCollidedId",
                "",
            ],
            rt_impulse_retrieved_idx: ["$rt.impulse.retrieved.idx", 0],
            rt_impulse_evidx: ["$rt.impulse.evIdx", 0],
            rt_impulse_penetration_correction: [
                "$rt.impulse.penetration_correction",
                0.6,
            ],
            rt_impulse_iterations: ["$rt.impulse.iterations", 6],
            rt_impulse_gravity_x: ["$rt.impulse.gravity.x", 0],
            rt_impulse_gravity_y: ["$rt.impulse.gravity.y", -150],
            rt_impulse_body: ["$rt.impulse.body#", 0],
            rt_impulse_resting: ["$rt.impulse.@Resting", 50],
            rt_impulse_radtodeg: ["$rt.impulse.@RadToDeg", 57.295779513082316],
            rt_impulse_m: ["$rt.impulse.@M", 13],
            rt_impulse_tscale: ["$rt.impulse.tscale", 1],
            rt_impulse_pscale: ["$rt.impulse.pscale", 60],
            rt_impulse_mass: ["$rt.impulse.mass", 0],
            rt_impulse_rad: ["$rt.impulse.rad", 0],
            rt_impulse_ori: ["$rt.impulse.ori", 0],
            rt_impulse_bodyidx: ["$rt.impulse.bodyIdx", 0],
            rt_impulse_vx: ["$rt.impulse.vx", 0],
            rt_impulse_vy: ["$rt.impulse.vy", 0],
            rt_impulse_body2idx: ["$rt.impulse.body2Idx", 0],
            rt_impulse_t1: ["$rt.impulse.t1", 0],
            rt_impulse_t2: ["$rt.impulse.t2", 0],
            rt_impulse_nx: ["$rt.impulse.nx", 0],
            rt_impulse_ny: ["$rt.impulse.ny", 0],
            rt_impulse_d: ["$rt.impulse.d", 0],
            rt_impulse_r: ["$rt.impulse.r", 0],
            rt_impulse_midx: ["$rt.impulse.mIdx", 0],
            rt_impulse_rax: ["$rt.impulse.rax", 0],
            rt_impulse_ray: ["$rt.impulse.ray", 0],
            rt_impulse_rbx: ["$rt.impulse.rbx", 0],
            rt_impulse_rby: ["$rt.impulse.rby", 0],
            rt_impulse_rvx: ["$rt.impulse.rvx", 0],
            rt_impulse_rvy: ["$rt.impulse.rvy", 0],
            rt_impulse_j: ["$rt.impulse.j", 0],
            rt_impulse_dt: ["$rt.impulse.dt", 1 / 30],
            rt_impulse_m00: ["$rt.impulse.m00", 0],
            rt_impulse_m01: ["$rt.impulse.m01", 0],
            rt_impulse_m10: ["$rt.impulse.m10", 0],
            rt_impulse_m11: ["$rt.impulse.m11", 0],
            rt_impulse_ind: ["$rt.impulse.ind", 0],
            rt_impulse_incx: ["$rt.impulse.incx", 0],
            rt_impulse_incy: ["$rt.impulse.incy", 0],
            rt_impulse_pena: ["$rt.impulse.penA", 0],
            rt_impulse_refidx: ["$rt.impulse.refIdx", 0],
            rt_impulse_v1x: ["$rt.impulse.v1x", 0],
            rt_impulse_v1y: ["$rt.impulse.v1y", 0],
            rt_impulse_v2x: ["$rt.impulse.v2x", 0],
            rt_impulse_v2y: ["$rt.impulse.v2y", 0],
            rt_impulse_tokens: ["$rt.impulse.tokens", 0],
            rt_impulse_tokMax: ["$rt.impulse.tokMax", 0],
            rt_impulse_toki: ["$rt.impulse.toki", 0],
            rt_impulse_token: ["$rt.impulse.token", 0],
            rt_impulse_body_with_id_exists: [
                "$rt.impulse.body with id exists?",
                0,
            ],
        },
        definition: require("./definitions/impulse.json"),
        removeExtensions: ["impulse"],
    },
];

const statementPatches = require("./statementPatches.json");
const {
    reporterPatches,
    reporterPatchesBasic,
    reporterPatchesVariable,
} = require("./reporterPatches");
const { compress, hypercompress } = require("../optimiser");

//Used by removeOrphanModdedBlocks and removeInvalidMonitors to ensure that non-converted blocks are deleted.
var moddedBlocks = [
    "motion_fencing_enable",
    "motion_fencing_disable",
    "operator_true",
    "operator_false",
    "operator_power",
    "looks_previouscostume",
    "looks_previousbackdrop",
    "looks_forcesizeto",
    "motion_pointtoxy",
    "operator_min",
    "operator_max",
    "operator_if",
    "operator_replace",
    "operator_newline",
    "operator_hex",
    "sensing_color",
    "data_setlisttosplit",
    "operator_substring",
    "operator_startswith",
    "operator_endswith",
    "network_messagereceived",
    "network_message",
    "network_start",
    "network_stop",
    "network_send",
    "network_broadcast",
    "impulse_reset",
    "impulse_step",
    "impulse_setgravity",
    "impulse_xgravity",
    "impulse_ygravity",
    "impulse_settimestep",
    "impulse_timestep",
    "impulse_setquality",
    "impulse_quality",
    "impulse_setpenetrationcorrection",
    "impulse_penetrationcorrection",
    "impulse_objectcount",
    "impulse_addcircle",
    "impulse_addrectrangle",
    "impulse_objectids",
    "impulse_setxofobject",
    "impulse_changexofobject",
    "impulse_setyofobject",
    "impulse_changeyofobject",
    "impulse_setrotationofobject",
    "impulse_setvelocityofobject",
    "impulse_addvelocitytoobject",
    "impulse_addforcetoobject",
    "impulse_setangularvelocityofobject",
    "impulse_addangularvelocitytoobject",
    "impulse_setwidthofobject",
    "impulse_setheightofobject",
    "impulse_setdensityofobject",
    "impulse_setidofobject",
    "impulse_deleteobject",
    "impulse_objectexists",
    "impulse_getdatabyid",
    "impulse_retrievedbodytype",
    "impulse_retrievedbodyid",
    "impulse_retrievedbodyx",
    "impulse_retrievedbodyy",
    "impulse_retrievedbodyvx",
    "impulse_retrievedbodyvy",
    "impulse_retrievedbodywidth",
    "impulse_retrievedbodyheight",
    "impulse_retrievedbodyrotation",
    "impulse_retrievedbodyvr",
    "impulse_retrievedbodyradius",
    "impulse_retrievedbodymass",
    "impulse_retrievedbodydensity",
    "impulse_retrievedbodycollided",
    "impulse_retrievedbodylastcollidedid",
    "impulse_loadscenedata",
    "impulse_scenedata",
];

var skipInjectingBlockDefinitions = false;
var debug = false;
var debugPrintFinalJson = false;
var debugPrintFinalExtensions = false;
var githubUrl = "https://github.com/ZXMushroom63/scratch-gui";

var factoryList = [];
factoryList.push(require("./factories/split"));
factoryList.push(require("./factories/network"));

var localVariables = {
    rt_fencing: ["$rt.spriteFencingEnabled", 1],
    rt_fencing_oldSize: ["$rt.fencing.oldSize", ""],
    rt_fencing_oldCostume: ["$rt.fencing.oldCostume", ""],
    rt_glide_newX: ["$rt.glide.newX", 0],
    rt_glide_newY: ["$rt.glide.newY", 0],
    rt_glide_oldX: ["$rt.glide.oldX", 0],
    rt_glide_oldY: ["$rt.glide.oldY", 0],
    rt_replace_i: ["$rt.replace.i", 0],
    rt_replace_isMatch: ["$rt.replace.isMatch", 0],
    rt_replace_j: ["$rt.replace.j", 0],
    rt_hex: ["$rt.hex", 0],
    rt_hex_cdiv: ["$rt.hex.cdiv", 0],
    rt_color_r: ["$rt.color.r", 0],
    rt_color_g: ["$rt.color.g", 0],
    rt_color_b: ["$rt.color.b", 0],
    rt_color_cdiv: ["$rt.color.cdiv", 0],
    rt_color_oldCostume: ["$rt.color.oldCostume", 0],
    rt_color_oldSize: ["$rt.color.oldSize", 0],
    rt_color_hex: ["$rt.color.hex", 0],
    rt_split_i: ["$rt.split.i", 0],
    rt_split_isMatch: ["$rt.split.isMatch", 0],
    rt_split_j: ["$rt.split.j", 0],
    rt_split_tmp: ["$rt.split.tmp", 0],
    rt_network_charset: ["$rt.network.charset", ""],
    rt_network_enc_i: ["$rt.network.enc.i", 0],
    rt_network_enc_j: ["$rt.network.enc.j", 0],
    rt_network_encoded: ["$rt.network.encoded", ""],
    rt_network_decoded: ["$rt.network.decoded", ""],
    rt_network_dco_i: ["$rt.network.dco.i", 0],
    rt_network_dco: ["$rt.network.dco", ""],
    rt_substr: ["$rt.substr", ""],
    rt_substr_max: ["$rt.substr.max", ""],
    rt_substr_min: ["$rt.substr.min", ""],
    rt_substr_i: ["$rt.substr.i", 0],
    rt_startswith_i: ["$rt.startswith.i", 0],
    rt_startswith: ["$rt.startswith", 0],
    rt_endswith_i: ["$rt.endwith.i", 0],
    rt_endswith: ["$rt.endswith", 0],
};
var globalVariables = {
    rt_out: ["$rt.out", 0],
};
var localLists = {
    rt_stack: ["$rt.stack", []],
    rt_split_temp: ["$rt.split.temp", []],
    rt_replace: ["$rt.replace", []],
};
var globalLists = {};

/*/
Note to self: If it is blank in normal scratch, check the imports, and scan for typos EVERYWHERE.
If it loads but the inputs are blank make sure to check if the block definitions prototype has an invalid `inputs` object.
/*/

var blockDefinitionsList = {};
function makeBlockDefinitionsListForProject(project) {
    var data = JSON.parse(project);
    data.targets.forEach((target) => {
        blockDefinitionsList[target.name] = makeBlockDefinitionsListForSprite(target, data);
    });
    return JSON.stringify(data);
}

function makeBlockDefinitionsListForSprite(target, projectData) {
    var uBlockDefinitionsList = [];
    var blockDefinitionsClone = [...blockDefinitions];
    var keys = Object.keys(target.blocks);
    keys.forEach((k) => {
        var opcode = target.blocks[k].opcode;
        blockDefinitionsClone.forEach((bd, i) => {
            if (bd.force) {
                uBlockDefinitionsList.push(bd.definition);
                blockDefinitionsClone.splice(i, 1);
                if (bd.globalVariables) {
                    projectData.targets.forEach((t) => {
                        if (t.isStage) {
                            Object.assign(t.variables, bd.globalVariables);
                        }
                    });
                }
                if (bd.globalLists) {
                    projectData.targets.forEach((t) => {
                        if (t.isStage) {
                            Object.assign(t.lists, bd.globalLists);
                        }
                    });
                }
                if (bd.broadcasts) {
                    projectData.targets.forEach((t) => {
                        if (t.isStage) {
                            Object.assign(t.broadcasts, bd.broadcasts);
                        }
                    });
                }
                if (Array.isArray(bd.removeExtensions)) {
                    bd.removeExtensions.forEach((ex) => {
                        if (
                            projectData.extensions &&
                            projectData.extensions.includes(ex)
                        ) {
                            projectData.extensions.splice(
                                projectData.extensions.indexOf(ex),
                                1
                            );
                        }
                    });
                }
            } else if (bd.opcodes.includes(opcode)) {
                uBlockDefinitionsList.push(bd.definition);
                blockDefinitionsClone.splice(i, 1);
                if (bd.globalVariables) {
                    projectData.targets.forEach((t) => {
                        if (t.isStage) {
                            Object.assign(t.variables, bd.globalVariables);
                        }
                    });
                }
                if (bd.globalLists) {
                    projectData.targets.forEach((t) => {
                        if (t.isStage) {
                            Object.assign(t.lists, bd.globalLists);
                        }
                    });
                }
                if (bd.broadcasts) {
                    projectData.targets.forEach((t) => {
                        if (t.isStage) {
                            Object.assign(t.broadcasts, bd.broadcasts);
                        }
                    });
                }
                if (Array.isArray(bd.removeExtensions)) {
                    bd.removeExtensions.forEach((ex) => {
                        if (
                            projectData.extensions &&
                            projectData.extensions.includes(ex)
                        ) {
                            projectData.extensions.splice(
                                projectData.extensions.indexOf(ex),
                                1
                            );
                        }
                    });
                }
            }
        });
    });
    return uBlockDefinitionsList;
}

function injectCostumes(project, obj) {
    // Injects the costumes used by Scratch++ to simulate no fencing, etc.
    var data = JSON.parse(project);
    data.targets.forEach((target) => {
        if (!target.isStage) {
            let largeCostumeFound = false;
            let nullCostumeFound = false;
            let dotCostumeFound = false;
            target.costumes.forEach((costume) => {
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
                    name: "$rt.large",
                    bitmapResolution: 1,
                    dataFormat: "svg",
                    assetId: obj.rt_large,
                    md5ext: obj.rt_large + ".svg",
                    rotationCenterX: 240,
                    rotationCenterY: 180,
                });
            }
            if (!nullCostumeFound) {
                target.costumes.push({
                    name: "$rt.null",
                    bitmapResolution: 1,
                    dataFormat: "svg",
                    assetId: obj.rt_null,
                    md5ext: obj.rt_null + ".svg",
                    rotationCenterX: 0,
                    rotationCenterY: 0,
                });
            }
            if (!dotCostumeFound) {
                target.costumes.push({
                    name: "$rt.dot",
                    bitmapResolution: 1,
                    dataFormat: "svg",
                    assetId: obj.rt_dot,
                    md5ext: obj.rt_dot + ".svg",
                    rotationCenterX: 0.75,
                    rotationCenterY: 0.75,
                });
            }
        }
    });
    return JSON.stringify(data);
}

function injectRuntimeVariables(project, obj) {
    // Injects variables and lists used by the runtime. eg: $rt.out, $rt.stack, $rt.spriteFencingEnabled
    var data = JSON.parse(project);
    data.targets.forEach((target) => {
        if (target.isStage) {
            Object.assign(target.variables, globalVariables);
            Object.assign(target.lists, globalLists);
        } else {
            Object.assign(target.variables, localVariables);
            Object.assign(target.lists, localLists);
        }
    });
    return JSON.stringify(data);
}

function applyIfOperatorFix(project, obj) {
    // Scratch serialises boolean inputs weirdly, so this is a hacky fix to make sure that the if operator is ready for compilation.
    var data = JSON.parse(project);
    data.targets.forEach((target) => {
        var blockKeys = Object.keys(target.blocks);
        blockKeys.forEach((key) => {
            if (target.blocks[key].opcode === "operator_if") {
                var newInputObject = {};
                newInputObject["OPERAND"] =
                    target.blocks[key].inputs["OPERAND"];
                newInputObject["STRING1"] =
                    target.blocks[key].inputs["STRING1"];
                newInputObject["STRING2"] =
                    target.blocks[key].inputs["STRING2"];
                target.blocks[key].inputs = newInputObject;
            }
        });
    });
    return JSON.stringify(data);
}

function applyStatementPatches(project, obj) {
    // Converts Scratch++'s new blocks in to Scratch's custom blocks.
    var targetInputKeys = [];
    function patchBlock(patch, theBlock, blocks, blockDefsList) {
        var newPatch = Object.assign({}, patch);
        var newBlock = Object.assign({}, theBlock);
        for (let K = 0; K < blockDefsList.length; K++) {
            const blockmod = blockDefsList[K];
            var blockKeys = Object.keys(blockmod);
            for (let i = 0; i < blockKeys.length; i++) {
                const key = blockKeys[i];
                var block = blockmod[key];
                if (
                    block.opcode === "procedures_prototype" &&
                    block.mutation.proccode === patch.mutation.proccode
                ) {
                    newPatch.mutation.argumentids = block.mutation.argumentids;
                    targetInputKeys = Object.keys(block.inputs);
                } else if (block.opcode === "procedures_prototype" && debug) {
                    console.log(
                        "Failed to match statement patch: " +
                            block.mutation.proccode +
                            " != " +
                            patch.mutation.proccode
                    );
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
    data.targets.forEach((target) => {
        var keys = Object.keys(target.blocks);
        keys.forEach((key) => {
            var block = target.blocks[key];
            if (modKeys.includes(block.opcode)) {
                var dPatch = Object.assign({}, statementPatches[block.opcode]);
                if (dPatch.mutation) {
                    dPatch.mutation.tagName = "mutation";
                    dPatch.mutation.children = [];
                }
                target.blocks[key] = patchBlock(
                    dPatch,
                    target.blocks[key],
                    target.blocks,
                    blockDefinitionsList[target.name]
                );
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
        function updatePatchWithInputs(patch, theBlock, blocks, blockDefsList) {
            var newPatch = Object.assign({}, patch);
            var newBlock = Object.assign({}, theBlock);
            for (let K = 0; K < blockDefsList.length; K++) {
                const blockmod = blockDefsList[K];
                var blockKeys = Object.keys(blockmod);
                for (let i = 0; i < blockKeys.length; i++) {
                    const key = blockKeys[i];
                    var block = blockmod[key];

                    if (
                        block.opcode === "procedures_prototype" &&
                        block.mutation.proccode === patch.mutation.proccode
                    ) {
                        newPatch.mutation.argumentids =
                            block.mutation.argumentids;
                        targetInputKeys = Object.keys(block.inputs);
                    } else if (
                        block.opcode === "procedures_prototype" &&
                        debug
                    ) {
                        console.log(
                            "Failed to match reporter patch: " +
                                block.mutation.proccode +
                                " != " +
                                patch.mutation.proccode
                        );
                    }
                }
            }
            var inputsObj = {};
            var oldInputKeys = Object.keys(newBlock.inputs);
            for (let i = 0; i < oldInputKeys.length; i++) {
                inputsObj[targetInputKeys[i]] =
                    newBlock.inputs[oldInputKeys[i]];
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
        data.targets.forEach((target) => {
            var statementBlocks = getStatementBlocks(target.blocks);
            if (debug) {
                console.log("Statement blocks: ");
                console.log(statementBlocks);
            }
            var substackBlocks = {};
            statementBlocks.forEach((block) => {
                var substackFixNeeded = false;
                var iKeys = Object.keys(block.inputs);
                var foundSubstackKeys = [];
                for (let q = 0; q < iKeys.length; q++) {
                    if (iKeys[q].startsWith("SUBSTACK")) {
                        substackFixNeeded = true;
                        foundSubstackKeys.push(iKeys[q]);
                    }
                }
                if (block.opcode === "control_repeat_until") {
                    substackFixNeeded = true;
                }
                if (substackFixNeeded) {
                    substackBlocks[block.id] = {
                        stackKeys: foundSubstackKeys,
                        patches: [],
                        isImportantRP:
                            block.opcode === "control_repeat_until" &&
                            foundSubstackKeys.length === 0,
                    };
                }
                var results = searchInputStackForOpcodes(
                    targetOpcodes,
                    block.id,
                    target.blocks
                );
                if (results.length > 0) {
                    if (debug) {
                        console.log("Reporter stack for block " + block.opcode);
                        console.log(results);
                    }
                    results = sortInputStack(results);
                    insertBeforeBlockId(target.blocks, block.id, {
                        opcode: "data_deletealloflist",
                        inputs: {},
                        fields: { LIST: ["$rt.stack", "rt_stack"] },
                        shadow: false,
                    });
                    for (let i = 0; i < results.length; i++) {
                        var result = results[i];
                        var isBool = Array.isArray(
                            reporterPatches[
                                target.blocks[result.reporterId].opcode
                            ]
                        );
                        var proccode = isBool
                            ? reporterPatches[
                                  target.blocks[result.reporterId].opcode
                              ][0]
                            : reporterPatches[
                                  target.blocks[result.reporterId].opcode
                              ];
                        var tempPatch = {
                            opcode: "procedures_call",
                            fields: {},
                            shadow: false,
                            inputs: {},
                            mutation: {
                                tagName: "mutation",
                                children: [],
                                proccode: proccode,
                                warp: "true",
                            },
                        };
                        var newPatch = updatePatchWithInputs(
                            tempPatch,
                            target.blocks[result.reporterId],
                            target.blocks,
                            blockDefinitionsList[target.name]
                        );
                        insertBeforeBlockId(target.blocks, block.id, newPatch);

                        if (substackFixNeeded) {
                            substackBlocks[block.id].patches.push(
                                Object.assign({}, newPatch)
                            );
                        }
                        if (isBool) {
                            if (debug) {
                                console.log(
                                    "Patching boolean reporter: " +
                                        target.blocks[result.reporterId].opcode
                                );
                            }
                            var itemListId = genCharList(
                                "abcdefghijklmnopqrstuvwxyz0123456789/",
                                16
                            );
                            Object.assign(target.blocks[result.reporterId], {
                                opcode: "operator_equals",
                                inputs: {
                                    OPERAND1: [3, itemListId, [10, ""]],
                                    OPERAND2: [1, [10, "1"]],
                                },
                                fields: {},
                                shadow: false,
                            });
                            target.blocks[itemListId] = {
                                opcode: "data_itemoflist",
                                next: null,
                                parent: result.reporterId,
                                inputs: { INDEX: [1, [7, "" + (i + 1) + ""]] },
                                fields: { LIST: ["$rt.stack", "rt_stack"] },
                                shadow: false,
                                topLevel: false,
                            };
                        } else {
                            if (debug) {
                                console.log(
                                    "Patching normal reporter: " +
                                        target.blocks[result.reporterId].opcode
                                );
                            }
                            Object.assign(target.blocks[result.reporterId], {
                                opcode: "data_itemoflist",
                                inputs: { INDEX: [1, [7, "" + (i + 1) + ""]] },
                                fields: { LIST: ["$rt.stack", "rt_stack"] },
                                shadow: false,
                            });
                        }
                    }
                }
            });
            var stackBlockKeys = Object.keys(substackBlocks);
            for (let q = 0; q < stackBlockKeys.length; q++) {
                var blockId = stackBlockKeys[q];
                var dataCapsule = substackBlocks[blockId];
                if (
                    dataCapsule.isImportantRP &&
                    dataCapsule.patches.length > 0
                ) {
                    var newLastId = genCharList(
                        "abcdefghijklmnopqrstuvwxyz0123456789_",
                        16
                    );
                    target.blocks[newLastId] = {
                        opcode: "data_deletealloflist",
                        inputs: {},
                        fields: { LIST: ["$rt.stack", "rt_stack"] },
                        shadow: false,
                        next: null,
                        parent: blockId,
                        topLevel: false,
                    };
                    target.blocks[blockId].inputs["SUBSTACK"] = [2, newLastId];
                    for (let n = 0; n < dataCapsule.patches.length; n++) {
                        newLastId = insertAfterBlockId(
                            target.blocks,
                            newLastId,
                            dataCapsule.patches[n]
                        );
                    }
                } else {
                    for (let l = 0; l < dataCapsule.stackKeys.length; l++) {
                        if (dataCapsule.patches.length > 0) {
                            const stackKey = dataCapsule.stackKeys[l];
                            var newLastId = insertAfterBlockId(
                                target.blocks,
                                getLastBlockInSubstack(
                                    target.blocks,
                                    blockId,
                                    stackKey
                                ),
                                {
                                    opcode: "data_deletealloflist",
                                    inputs: {},
                                    fields: { LIST: ["$rt.stack", "rt_stack"] },
                                    shadow: false,
                                }
                            );
                            for (
                                let n = 0;
                                n < dataCapsule.patches.length;
                                n++
                            ) {
                                newLastId = insertAfterBlockId(
                                    target.blocks,
                                    newLastId,
                                    dataCapsule.patches[n]
                                );
                            }
                        }
                    }
                }
            }
        });
        return JSON.stringify(data);
    }
    var data = JSON.parse(project);
    var basicPatchesKeys = Object.keys(reporterPatchesBasic);
    data.targets.forEach((target) => {
        var keys = Object.keys(target.blocks);
        keys.forEach((key) => {
            var block = target.blocks[key];
            if (basicPatchesKeys.includes(block.opcode)) {
                if (debug) {
                    console.log(
                        "Patching opcode " +
                            block.opcode +
                            " to " +
                            reporterPatchesBasic[block.opcode]
                    );
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
    if (
        blocks[blockId].next &&
        blocks[blocks[blockId].next].parent === blockId
    ) {
        blocks[blocks[blockId].next].parent = newBlockId;
    }
    data.id = newBlockId;
    blocks[blockId].next = newBlockId;
    data.parent = blockId;
    data.topLevel = false;
    blocks[newBlockId] = data;
    return newBlockId;
}

function removeBlockId(blocks, blockId) {
    // Utility function to remove a block.
    if (
        blocks[blockId].parent &&
        blocks[blocks[blockId].parent].next === blockId
    ) {
        blocks[blocks[blockId].parent].next = blocks[blockId].next;
    }
    if (
        blocks[blockId].next &&
        blocks[blocks[blockId].next].parent === blockId
    ) {
        blocks[blocks[blockId].next].parent = blocks[blockId].parent;
    }
    delete blocks[blockId];
}

function insertBeforeBlockId(blocks, blockId, data) {
    // Utility function to insert a block before another block.
    var newBlockId = genCharList("abcdefghijklmnopqrstuvwxyz1234567890", 14);
    data.id = newBlockId;
    if (debug) {
        console.log(
            `Inserted content${
                data.opcode ? " with opcode " + data.opcode : ""
            } before: `
        );
        console.log(blocks[blockId].opcode);
    }
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
                if (
                    key.startsWith("SUBSTACK") &&
                    blocks[blocks[blockId].parent].inputs[key][1] === blockId
                ) {
                    substackDetected = true;
                    substackKey = key;
                }
            }
            if (substackDetected) {
                console.log("SUBSTACK DETECTED: " + substackKey);
                blocks[blocks[blockId].parent].inputs[substackKey][1] =
                    newBlockId;
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
    if (debug) {
        console.log(data);
    }
    return newBlockId;
}

function removeOrphanModdedBlocks(project, obj) {
    // Removes orphan modded blocks that were not compiled.
    var data = JSON.parse(project);

    data.targets.forEach((target) => {
        var blockKeys = Object.keys(target.blocks);
        blockKeys.forEach((key) => {
            if (
                target.blocks[key].topLevel &&
                !target.blocks[key].next &&
                !target.blocks[key].parent &&
                moddedBlocks.includes(target.blocks[key].opcode)
            ) {
                removeBlockId(target.blocks, key);
            }
        });
    });

    return JSON.stringify(data);
}

function removeInvalidMonitors(project, obj) {
    var data = JSON.parse(project);

    for (let i = 0; i < data.monitors.length; i++) {
        const monitor = data.monitors[i];
        if (moddedBlocks.includes(monitor.opcode)) {
            data.monitors.splice(i, 1);
        }
    }

    return JSON.stringify(data);
}

function getLastBlockInSubstack(blocks, blockId, substackKey) {
    var block = blocks[blockId];
    var substack = block.inputs[substackKey];
    var fBlockId = substack[1];
    var fBlock = blocks[fBlockId];
    while (fBlock.next) {
        fBlockId = fBlock.next;
        fBlock = blocks[fBlockId];
    }
    return fBlockId;
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
function searchInputStackForOpcodes(
    opcodes,
    blockId,
    blocks,
    arr = [],
    parentBlockId = null,
    inputKey = null,
    depth = 0
) {
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
                    inputs: blocks[parentBlockId].inputs,
                },
                opcode: blocks[blockId].opcode,
                depth: depth,
            });
        }
    }
    var inputKeys = Object.keys(blocks[blockId].inputs);
    for (let i = 0; i < inputKeys.length; i++) {
        const ik = inputKeys[i];
        if (
            !ik.startsWith("SUBSTACK") &&
            (blocks[blockId].inputs[ik][0] === 3 ||
                blocks[blockId].inputs[ik][0] === 2) &&
            !Array.isArray(blocks[blockId].inputs[ik][1])
        ) {
            arr = searchInputStackForOpcodes(
                opcodes,
                blocks[blockId].inputs[ik][1],
                blocks,
                arr,
                blockId,
                ik,
                depth + 1
            );
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
    tmpKeys.sort(function (a, b) {
        return parseInt(b) - parseInt(a);
    });

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
                if (
                    iKey.startsWith("SUBSTACK") &&
                    Array.isArray(parentBlock.inputs[iKey]) &&
                    parentBlock.inputs[iKey][0] === 2 &&
                    parentBlock.inputs[iKey][1] === key
                ) {
                    if (debug) {
                        console.log("Bypassed for " + blocks[key].opcode);
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
    data.targets.forEach((target) => {
        var blockIds = Object.keys(target.blocks);
        blockIds.forEach((blockId) => {
            target.blocks[blockId].id = blockId;
        });
    });
    return JSON.stringify(data);
}

function removeIdPropertiesFromBlocks(project, obj) {
    // Removes the utility ID properties once done to save storage.
    var data = JSON.parse(project);
    data.targets.forEach((target) => {
        var blockIds = Object.keys(target.blocks);
        blockIds.forEach((blockId) => {
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
    data.meta.readme =
        "Compiled from the Scratch++ editor! Made by ZXMushroom63";
    if (
        window.location.protocol.startsWith("http") &&
        window.location.hostname != "localhost"
    ) {
        data.meta.editorUrl = window.location.href;
    } else {
        data.meta.editorUrl =
            "This sb3 was compiled from either the offline version of the editor or a development version.";
    }
    if (githubUrl != "") {
        data.meta.githubUrl = githubUrl;
    }
    var githubSection = "";
    if (githubUrl != "") {
        githubSection = "\n\nCheck us out on GitHub:\n" + githubUrl;
    }
    var compiledSection = "";
    if (
        window.location.protocol.startsWith("http") &&
        window.location.hostname != "localhost"
    ) {
        compiledSection =
            "\n\nThis project was compiled with this Scratch++ editor:\n" +
            window.location.href;
    } else {
        compiledSection =
            "\n\nThis project was compiled with an offline version of the Scratch++ editor.";
    }
    data.targets.forEach((target) => {
        var commentId = genCharList(
            "abcdefghijklmnopqrstuvwxyz1234567890_",
            12
        );
        target.comments[commentId] = {
            blockId: null,
            x: 0,
            y: -200,
            width: 420,
            height: 255,
            minimized: false,
            text: `▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱\nCompiled with ❤️ by Scratch++!\nMade by ZXMushroom63.${githubSection}${compiledSection}\n▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱`,
        };
    });

    return JSON.stringify(data);
}

function injectBlockDefinitions(project, obj) {
    // Injects the custom block definitions.
    var data = JSON.parse(project);
    data.targets.forEach((target) => {
        blockDefinitionsList[target.name].forEach((blockDefinition) => {
            var copy = Object.assign({}, blockDefinition);
            var keys = Object.keys(copy);
            keys.forEach((key) => {
                var block = copy[key];
                if (
                    typeof block.x === "number" ||
                    typeof block.y === "number"
                ) {
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
    data.targets.forEach((target) => {
        var targetBlockKeys = Object.keys(target.blocks);
        factoryList.forEach((factory) => {
            targetBlockKeys.forEach((key) => {
                var block = target.blocks[key];
                if (block.opcode === factory.target_opcode) {
                    factory.script(block, target.blocks, key, target, data);
                }
            });
        });
    });
    return JSON.stringify(data);
}

function applyReporterExVariableOps(project, obj) {
    function getVariableNameById(project, target, id) {
        var stage = null;
        for (let i = 0; i < project.targets.length; i++) {
            if (project.targets[i].isStage) {
                stage = project.targets[i];
            }
        }
        if (stage && stage.variables[id]) {
            return stage.variables[id][0];
        }

        if (target && target.variables[id]) {
            return target.variables[id][0];
        }

        return "";
    }
    var data = JSON.parse(project);
    var targetOpcodes = Object.keys(reporterPatchesVariable);
    data.targets.forEach((target) => {
        var statementBlocks = getStatementBlocks(target.blocks);
        statementBlocks.forEach((block) => {
            var results = searchInputStackForOpcodes(
                targetOpcodes,
                block.id,
                target.blocks
            );
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    var result = results[i];
                    var isBool = Array.isArray(
                        reporterPatchesVariable[
                            target.blocks[result.reporterId].opcode
                        ]
                    );
                    var variableId = isBool
                        ? reporterPatchesVariable[
                              target.blocks[result.reporterId].opcode
                          ][0]
                        : reporterPatchesVariable[
                              target.blocks[result.reporterId].opcode
                          ];
                    if (isBool) {
                        Object.assign(target.blocks[result.reporterId], {
                            opcode: "operator_equals",
                            inputs: {
                                OPERAND1: [
                                    3,
                                    [
                                        12,
                                        getVariableNameById(
                                            data,
                                            target,
                                            variableId
                                        ),
                                        variableId,
                                    ],
                                    [10, ""],
                                ],
                                OPERAND2: [1, [10, "1"]],
                            },
                            fields: {},
                        });
                    } else {
                        target.blocks[result.foundIn].inputs[
                            result.inputsEntry.inputKey
                        ] = [
                            3,
                            [
                                12,
                                getVariableNameById(data, target, variableId),
                                variableId,
                            ],
                            [10, ""],
                        ];

                        if (debug) {
                            console.log(target.blocks[result.foundIn].inputs);
                        }

                        delete target.blocks[result.reporterId];
                    }
                }
            }
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
function applyWaitUntilFix(p, obj) {
    var targetOpcodes = Object.keys(reporterPatches);
    var data = JSON.parse(p);
    data.targets.forEach((t) => {
        var blockKeys = Object.keys(t.blocks);
        blockKeys.forEach((k) => {
            if (t.blocks[k].opcode === "control_wait_until") {
                var results = searchInputStackForOpcodes(
                    targetOpcodes,
                    t.blocks[k].id,
                    t.blocks
                );
                if (results.length > 0) {
                    t.blocks[k].opcode = "control_repeat_until";
                }
            }
        });
    });
    return JSON.stringify(data);
}

function toSb3(project, obj) {
    var p = project;
    p = makeBlockDefinitionsListForProject(p);
    p = applyIfOperatorFix(p, obj);
    p = addIdPropertiesToBlocks(p, obj);
    p = injectCostumes(p, obj);
    p = injectRuntimeVariables(p, obj);
    p = applyReporterExVariableOps(p, obj);
    p = applyWaitUntilFix(p, obj);
    p = applyReporterPatches(p, obj);
    p = applyStatementPatches(p, obj);
    p = applyFactories(p, obj);
    if (!skipInjectingBlockDefinitions) {
        p = injectBlockDefinitions(p, obj);
    }
    p = removeOrphanModdedBlocks(p, obj);
    p = removeInvalidMonitors(p, obj);
    p = addCredits(p, obj);
    p = removeIdPropertiesFromBlocks(p, obj);
    var data = JSON.parse(p);

    //Shrink block and comment ids.
    compress(data);

    //Shrink custom block proccodes and empty blank text.
    hypercompress(data);

    p = JSON.stringify(data);
    if (debugPrintFinalJson) {
        console.log(JSON.parse(p));
    }
    if (debugPrintFinalExtensions) {
        console.log(JSON.parse(p).extensions);
    }
    return p;
}

function genCharList(charlist, len) {
    // Function used to generate a randomized UUID from a charlist (either an array of characters or a string) of length len.
    var str = "";
    for (let i = 0; i < len; i++) {
        str += charlist[Math.floor(charlist.length * Math.random())];
    }
    return str;
}

// Exporting the functions for use in virtual-machine.js
module.exports = {
    toSb3: toSb3,
    genCharList: genCharList,
};
