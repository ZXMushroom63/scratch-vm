const formatMessage = require("format-message");
const BlockType = require("../../extension-support/block-type");
const ArgumentType = require("../../extension-support/argument-type");

var networkActive = false;
var channel = "";
var cache = "";
var receivedMessage = "";

class NetworkExtension {
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
            id: "network",
            name: formatMessage({
                id: "network.categoryName",
                default: "Network",
                description: "Name of the Network extension."
            }),
            // blockIconURI
            menuIconURI: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDQ2NS4wNTcgNDY1LjA1NyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNMTU2Ljc2NiwxNDMuMDAyaDM3LjM3N3YyNS45MzloLTEzLjk3Yy00LjE0MiwwLTcuNSwzLjM1Ny03LjUsNy41czMuMzU4LDcuNSw3LjUsNy41aDEwNC43MDljNC4xNDMsMCw3LjUtMy4zNTcsNy41LTcuNQ0KCQlzLTMuMzU3LTcuNS03LjUtNy41aC0xMy45N3YtMjUuOTM5aDM3LjM3N2MxNC43MjgsMCwyNi43MDktMTEuOTgxLDI2LjcwOS0yNi43MDlWMjYuNzM3YzAtMTQuNzI4LTExLjk4MS0yNi43MDktMjYuNzA5LTI2LjcwOQ0KCQlIMTU2Ljc2NmMtMTQuNzI4LDAtMjYuNzA5LDExLjk4MS0yNi43MDksMjYuNzA5djg5LjU1NkMxMzAuMDU3LDEzMS4wMjEsMTQyLjAzOSwxNDMuMDAyLDE1Ni43NjYsMTQzLjAwMnogTTI1NS45MTMsMTY4Ljk0MWgtNDYuNzcNCgkJdi0yNS45MzloNDYuNzdWMTY4Ljk0MXogTTE0NS4wNTcsMjYuNzM3YzAtNi40NTYsNS4yNTItMTEuNzA5LDExLjcwOS0xMS43MDlIMzA4LjI5YzYuNDU2LDAsMTEuNzA5LDUuMjUzLDExLjcwOSwxMS43MDl2ODkuNTU2DQoJCWMwLDYuNDU2LTUuMjUzLDExLjcwOS0xMS43MDksMTEuNzA5SDE1Ni43NjZjLTYuNDU3LDAtMTEuNzA5LTUuMjUzLTExLjcwOS0xMS43MDlWMjYuNzM3eiIvPg0KCTxwYXRoIGQ9Ik0xNzguMjMzLDI4MS4xMTVIMjYuNzA5QzExLjk4MSwyODEuMTE1LDAsMjkzLjA5NywwLDMwNy44MjR2ODkuNTU2YzAsMTQuNzI4LDExLjk4MSwyNi43MDksMjYuNzA5LDI2LjcwOWgzNy4zNzd2MjUuOTM5DQoJCWgtMTMuOTdjLTQuMTQyLDAtNy41LDMuMzU3LTcuNSw3LjVzMy4zNTgsNy41LDcuNSw3LjVoMTA0LjcwOGM0LjE0MiwwLDcuNS0zLjM1Nyw3LjUtNy41cy0zLjM1OC03LjUtNy41LTcuNWgtMTMuOTY5di0yNS45MzkNCgkJaDM3LjM3N2MxNC43MjgsMCwyNi43MDktMTEuOTgxLDI2LjcwOS0yNi43MDl2LTg5LjU1NkMyMDQuOTQyLDI5My4wOTcsMTkyLjk2LDI4MS4xMTUsMTc4LjIzMywyODEuMTE1eiBNMTI1Ljg1Niw0NTAuMDI4aC00Ni43Nw0KCQl2LTI1LjkzOWg0Ni43N1Y0NTAuMDI4eiBNMTg5Ljk0MiwzOTcuMzhjMCw2LjQ1Ni01LjI1MiwxMS43MDktMTEuNzA5LDExLjcwOUgyNi43MDljLTYuNDU3LDAtMTEuNzA5LTUuMjUzLTExLjcwOS0xMS43MDl2LTg5LjU1Ng0KCQljMC02LjQ1Niw1LjI1Mi0xMS43MDksMTEuNzA5LTExLjcwOWgxNTEuNTI0YzYuNDU3LDAsMTEuNzA5LDUuMjUzLDExLjcwOSwxMS43MDlWMzk3LjM4eiIvPg0KCTxwYXRoIGQ9Ik00MzguMzQ4LDI4MS4xMTVIMjg2LjgyM2MtMTQuNzI4LDAtMjYuNzA5LDExLjk4MS0yNi43MDksMjYuNzA5djg5LjU1NmMwLDE0LjcyOCwxMS45ODEsMjYuNzA5LDI2LjcwOSwyNi43MDlIMzI0LjINCgkJdjI1LjkzOWgtMTMuOTY5Yy00LjE0MywwLTcuNSwzLjM1Ny03LjUsNy41czMuMzU3LDcuNSw3LjUsNy41aDEwNC43MDhjNC4xNDMsMCw3LjUtMy4zNTcsNy41LTcuNXMtMy4zNTctNy41LTcuNS03LjVoLTEzLjk2OQ0KCQl2LTI1LjkzOWgzNy4zNzdjMTQuNzI4LDAsMjYuNzA5LTExLjk4MSwyNi43MDktMjYuNzA5di04OS41NTZDNDY1LjA1NywyOTMuMDk3LDQ1My4wNzUsMjgxLjExNSw0MzguMzQ4LDI4MS4xMTV6IE0zODUuOTcxLDQ1MC4wMjgNCgkJSDMzOS4ydi0yNS45MzloNDYuNzcxVjQ1MC4wMjh6IE00NTAuMDU3LDM5Ny4zOGMwLDYuNDU2LTUuMjUzLDExLjcwOS0xMS43MDksMTEuNzA5SDI4Ni44MjNjLTYuNDU2LDAtMTEuNzA5LTUuMjUzLTExLjcwOS0xMS43MDkNCgkJdi04OS41NTZjMC02LjQ1Niw1LjI1My0xMS43MDksMTEuNzA5LTExLjcwOWgxNTEuNTI0YzYuNDU2LDAsMTEuNzA5LDUuMjUzLDExLjcwOSwxMS43MDlWMzk3LjM4eiIvPg0KCTxwYXRoIGQ9Ik0zNTUuMDg2LDI1OC42MTVjMCw0LjE0MywzLjM1Nyw3LjUsNy41LDcuNXM3LjUtMy4zNTcsNy41LTcuNXYtMjYuMDg3YzAtNC4xNDMtMy4zNTctNy41LTcuNS03LjVIMjQwLjAyOHYtMTguNTg3DQoJCWMwLTQuMTQzLTMuMzU3LTcuNS03LjUtNy41Yy00LjE0MiwwLTcuNSwzLjM1Ny03LjUsNy41djE4LjU4N0gxMDIuNDcxYy00LjE0MiwwLTcuNSwzLjM1Ny03LjUsNy41djI2LjA4Nw0KCQljMCw0LjE0MywzLjM1OCw3LjUsNy41LDcuNXM3LjUtMy4zNTcsNy41LTcuNXYtMTguNTg3aDI0NS4xMTVWMjU4LjYxNXoiLz4NCjwvZz4NCjwvc3ZnPg==",
            blocks: [
                {
                    opcode: "start",
                    text: formatMessage({
                        id: "network.startBlock",
                        default: "start listening for messages",
                        description: "Starts listening for network messages."
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {}
                },
                {
                    opcode: "stop",
                    text: formatMessage({
                        id: "network.stopBlock",
                        default: "stop listening for messages",
                        description: "Stops listening for network messages."
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {}
                },
                {
                    opcode: "messagereceived",
                    isEdgeActivated: false,
                    text: formatMessage({
                        id: "network.messagereceived",
                        default: "When message received",
                        description: "Event block for when a message is received."
                    }),
                    blockType: BlockType.EVENT,
                    arguments: {
                    }
                },
                {
                    opcode: "message",
                    text: formatMessage({
                        id: "network.message",
                        default: "received message",
                        description: "The received message"
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                    }
                },
                {
                    opcode: "send",
                    text: formatMessage({
                        id: "network.send",
                        default: "send to all: [MESSAGE]",
                        description: "Sends a network message to all clients."
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MESSAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "network.hello",
                                default: "Hello!",
                                description: "Example text for send blocks."
                            })
                        }
                    }
                },
                {
                    opcode: "broadcast",
                    text: formatMessage({
                        id: "network.broadcast",
                        default: "broadcast to others: [MESSAGE]",
                        description: "Sends a network message to all other clients."
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MESSAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: "network.hello",
                                default: "Hello!",
                                description: "Example text for send blocks."
                            })
                        }
                    }
                }
            ]
        };
    }

    start(args, util) {
        networkActive = true;
        setTimeout(() => {
            this.checkReceived();
        }, 100);
    }

    stop(args, util) {
        networkActive = false;
        setTimeout(() => {
            this.checkReceived();
        }, 100);
    }

    send(args, util) {
        channel = args.MESSAGE;
        setTimeout(() => {
            this.checkReceived();
        }, 100);
    }

    broadcast(args, util) {
        cache = args.MESSAGE;
        channel = args.MESSAGE;
        setTimeout(() => {
            this.checkReceived();
        }, 100);
    }

    checkReceived() {
        if ((cache !== channel) && networkActive) {
            cache = channel;
            receivedMessage = cache;
            this.runtime.startHats("network_messagereceived");
        }
    }

    message(args, util) {
        return receivedMessage;
    }
}

module.exports = NetworkExtension;