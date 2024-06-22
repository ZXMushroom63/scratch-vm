const formatMessage = require("format-message");
const BlockType = require("../../extension-support/block-type");
const ArgumentType = require("../../extension-support/argument-type");
const Cast = require("../../util/cast");

var tempvarMap = {};

class TempvarsExtension {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: "tempvars",
            name: formatMessage({
                id: "tempvars.categoryName",
                default: "Temporary Variables",
                description: "Name of the Temporary Variables extension."
            }),
            // blockIconURI
            menuIconURI: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iNDQwIiBoZWlnaHQ9IjE5MCIgc3R5bGU9InN0cm9rZTogcmdiKDAsIDAsIDApOyBzdHJva2UtbGluZWpvaW46IHJvdW5kOyBzdHJva2UtbGluZWNhcDogcm91bmQ7IGZpbGw6IHJnYmEoMjE2LCAyMTYsIDIxNiwgMCk7IHN0cm9rZS13aWR0aDogMTBweDsiIHJ4PSIxMC45NzYiIHJ5PSIxMC45NzYiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTk5OTk5OTk5OTk5OSwgMCwgMCwgMC45OTk5OTk5OTk5OTk5OTk5LCAwLCAtMS40MjEwODU0NzE1MjAyMDA0ZS0xNCkiLz4KICA8cmVjdCB4PSIzMCIgeT0iMjgwIiB3aWR0aD0iNDQwIiBoZWlnaHQ9IjE5MCIgc3R5bGU9InN0cm9rZTogcmdiKDAsIDAsIDApOyBzdHJva2UtbGluZWpvaW46IHJvdW5kOyBzdHJva2UtbGluZWNhcDogcm91bmQ7IGZpbGw6IHJnYmEoMjE2LCAyMTYsIDIxNiwgMCk7IHN0cm9rZS13aWR0aDogMTBweDsiIHJ4PSIxMC45NzYiIHJ5PSIxMC45NzYiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTk5OTk5OTk5OTk5OTk5OSwgMCwgMCwgMC45OTk5OTk5OTk5OTk5OTk5LCAwLCAtMS40MjEwODU0NzE1MjAyMDA0ZS0xNCkiLz4KICA8ZWxsaXBzZSBzdHlsZT0ic3Ryb2tlLXdpZHRoOiAxMHB4OyBzdHJva2U6IHJnYigwLCAwLCAwKTsgZmlsbDogcmdiYSgyMTYsIDIxNiwgMjE2LCAwKTsiIGN4PSIxMjUiIHJ4PSIzNy41IiByeT0iMzcuNSIgY3k9IjEyNSIgdHJhbnNmb3JtPSJtYXRyaXgoMC45OTk5OTk5OTk5OTk5OTk5LCAwLCAwLCAwLjk5OTk5OTk5OTk5OTk5OTksIDAsIC0xLjQyMTA4NTQ3MTUyMDIwMDRlLTE0KSIvPgogIDxlbGxpcHNlIHN0eWxlPSJzdHJva2Utd2lkdGg6IDEwcHg7IHN0cm9rZTogcmdiKDAsIDAsIDApOyBmaWxsOiByZ2JhKDIxNiwgMjE2LCAyMTYsIDApOyIgY3g9IjEyNSIgcng9IjM3LjUiIHJ5PSIzNy41IiBjeT0iMzc1IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk5OTk5OTk5OTk5OTk5OTksIDAsIDAsIDAuOTk5OTk5OTk5OTk5OTk5OSwgMCwgLTEuNDIxMDg1NDcxNTIwMjAwNGUtMTQpIi8+Cjwvc3ZnPg==",
            blocks: [
                {
                    opcode: "clear",
                    text: formatMessage({
                        id: "tempvars.clearBlock",
                        default: "clear temporary variables",
                        description: "Clears temporary variables"
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {}
                },
                {
                    opcode: "get",
                    text: formatMessage({
                        id: "tempvars.getBlock",
                        default: "get variable [VAR]",
                        description: "Gets specified tempvar"
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        VAR: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.variable",
                                default: "x",
                                description: "Example variable name for tempvars extension."
                            })
                        }
                    }
                },
                {
                    opcode: "set",
                    text: formatMessage({
                        id: "tempvars.setBlock",
                        default: "set variable [VAR] to [VAL]",
                        description: "Sets specified tempvar to value."
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        VAR: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.variable",
                                default: "x",
                                description: "Example variable name for tempvars extension."
                            })
                        },
                        VAL: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.value",
                                default: "3",
                                description: "Example variable value for tempvars extension."
                            })
                        }
                    }
                },
                {
                    opcode: "change",
                    text: formatMessage({
                        id: "tempvars.setBlock",
                        default: "change variable [VAR] by [VAL]",
                        description: "Changes specified tempvar by value."
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        VAR: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.variable",
                                default: "x",
                                description: "Example variable name for tempvars extension."
                            })
                        },
                        VAL: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.value",
                                default: "3",
                                description: "Example variable value for tempvars extension."
                            })
                        }
                    }
                },
                {
                    opcode: "delete",
                    text: formatMessage({
                        id: "tempvars.deleteBlock",
                        default: "delete variable [VAR]",
                        description: "Deletes specified tempvar."
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        VAR: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.variable",
                                default: "x",
                                description: "Example variable name for tempvars extension."
                            })
                        }
                    }
                },
                {
                    opcode: "exists",
                    text: formatMessage({
                        id: "tempvars.existsBlock",
                        default: "variable [VAR] exists?",
                        description: "does variable specified exist?"
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        VAR: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.variable",
                                default: "x",
                                description: "Example variable name for tempvars extension."
                            })
                        }
                    }
                },
                {
                    opcode: "keys",
                    text: formatMessage({
                        id: "tempvars.keysBlock",
                        default: "names of variables [DELIM]",
                        description: "returns a string containing a list of tempvar names"
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        DELIM: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "tempvars.delimiter",
                                default: ",",
                                description: "Example delimiter for tempvars extension."
                            })
                        }
                    }
                }
            ]
        };
    }

    clear(args, util) {
        tempvarMap = {}
    }

    delete(args, util) {
        delete tempvarMap[args.VAR];
    }

    set(args, util) {
        tempvarMap[args.VAR] = args.VAL;
    }

    change(args, util) {
        tempvarMap[args.VAR] = Cast.toNumber(args.VAL) + Cast.toNumber(tempvarMap[args.VAR]);
    }

    get(args, util) {
        return tempvarMap[args.VAR] || '';
    }

    keys(args, util) {
        return Object.keys(tempvarMap).join(args.DELIM || '');
    }

    exists(args, util) {
        return args.VAR in tempvarMap;
    }
}

module.exports = TempvarsExtension;