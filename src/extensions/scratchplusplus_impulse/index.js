const formatMessage = require("format-message");
const BlockType = require("../../extension-support/block-type");
const ArgumentType = require("../../extension-support/argument-type");

class ImpulseExtension {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        window.impulseExtension = this;
        this.vars = {};
        this.vars.RtSceneDataOut =
            "0 1 0 -1 -1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
        this.vars.RtImpulseRb = 34;
        this.vars.RtImpulseUniqueid = 0;
        this.vars.RtImpulseCurrentBodyId = 0;
        this.vars.RtImpulseCurrentBodyWidth = 0;
        this.vars.RtImpulseCurrentBodyHeight = 0;
        this.vars.RtImpulseCurrentBodyRotation = 0;
        this.vars.RtImpulseCurrentBodyType = 0;
        this.vars.RtImpulseCurrentBodyX = 0;
        this.vars.RtImpulseCurrentBodyY = 0;
        this.vars.RtImpulseCurrentBodyMass = 0;
        this.vars.RtImpulseEvidx = 0;
        this.vars.RtImpulseCurrentBodyCollided = 0;
        this.vars.RtImpulseCurrentBodyLastcollidedid = "";
        this.vars.RtImpulseRetrievedX = "";
        this.vars.RtImpulseRetrievedY = "";
        this.vars.RtImpulseRetrievedId = "";
        this.vars.RtImpulseRetrievedLastcollidedid = "";
        this.vars.RtImpulseRetrievedMass = "";
        this.vars.RtImpulseRetrievedRotation = "";
        this.vars.RtImpulseRetrievedVx = "";
        this.vars.RtImpulseRetrievedVy = "";
        this.vars.RtImpulseRetrievedVr = "";
        this.vars.RtImpulseRetrievedWidth = "";
        this.vars.RtImpulseRetrievedHeight = "";
        this.vars.RtImpulseRetrievedCollided = "";
        this.vars.RtImpulseCurrentBodyVx = 0;
        this.vars.RtImpulseCurrentBodyVy = 0;
        this.vars.RtImpulseCurrentBodyVr = 0;
        this.vars.RtImpulseRetrievedIdx = "";
        this.vars.RtImpulseRetrievedType = "";
        this.vars.RtImpulseRetrievedRadius = "";
        this.vars.RtImpulseCurrentBodyRadius = 0;
        this.vars.RtOut = 0;
        this.vars.RtImpulseCurrentBodyDensity = 0;
        this.vars.RtImpulseRetrievedDensity = "";
        this.vars.RtImpulsePenetrationCorrection = 0.6;
        this.vars.RtImpulseIterations = 6;
        this.vars.RtImpulseGravityX = 0;
        this.vars.RtImpulseGravityY = -150;
        this.vars.RtImpulseBody = 0;
        this.vars.RtImpulseResting = 50;
        this.vars.RtImpulseRadtodeg = 57.295779513082316;
        this.vars.RtImpulseM = 0;
        this.vars.RtImpulseMass = 0;
        this.vars.RtImpulseRad = 0;
        this.vars.RtImpulseOri = 0;
        this.vars.RtImpulseBodyidx = 0;
        this.vars.RtImpulseVx = 0;
        this.vars.RtImpulseVy = 0;
        this.vars.RtImpulseBody2idx = 0;
        this.vars.RtImpulseT1 = 0;
        this.vars.RtImpulseT2 = 0;
        this.vars.RtImpulseNx = 0;
        this.vars.RtImpulseNy = 0;
        this.vars.RtImpulseD = 0;
        this.vars.RtImpulseR = 0;
        this.vars.RtImpulseMidx = 0;
        this.vars.RtImpulseRax = 0;
        this.vars.RtImpulseRay = 0;
        this.vars.RtImpulseRbx = 0;
        this.vars.RtImpulseRby = 0;
        this.vars.RtImpulseRvx = 0;
        this.vars.RtImpulseRvy = 0;
        this.vars.RtImpulseJ = 0;
        this.vars.RtImpulseDt = 1 / 30;
        this.vars.RtImpulseM00 = 0;
        this.vars.RtImpulseM01 = 0;
        this.vars.RtImpulseM10 = 0;
        this.vars.RtImpulseM11 = 0;
        this.vars.RtImpulseInd = 0;
        this.vars.RtImpulseIncx = 0;
        this.vars.RtImpulseIncy = 0;
        this.vars.RtImpulsePena = 0;
        this.vars.RtImpulseRefidx = 0;
        this.vars.RtImpulseV1x = 0;
        this.vars.RtImpulseV1y = 0;
        this.vars.RtImpulseV2x = 0;
        this.vars.RtImpulseV2y = 0;
        this.vars.RtImpulseTokens = 0;
        this.vars.RtImpulseTokmax = 0;
        this.vars.RtImpulseToki = 0;
        this.vars.RtImpulseToken = 0;
        this.vars.RtImpulseBodyWithIdExists = 0;
        this.vars.RtImpulseRigidBody = [
            0, 1, 0, -1, -1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ];
        this.vars.RtStack = [];
        this.vars.RtImpulseManifolds = [];
        this.vars.RtImpulseOut = [];
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: "impulse",
            color1: "#990073",
            color2: "#66004d",
            name: formatMessage({
                id: "impulse.categoryName",
                default: "Impulse",
                description: "Name of the Impulse physics extension.",
            }),
            // blockIconURI
            menuIconURI:
                "data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIFRyYW5zZm9ybWVkIGJ5OiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyBmaWxsPSIjMDAwMDAwIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9Ii0yLjQgLTIuNCAyOC44MCAyOC44MCIgaWQ9InJhZGl1cyIgZGF0YS1uYW1lPSJMaW5lIENvbG9yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGxpbmUtY29sb3IiIHRyYW5zZm9ybT0icm90YXRlKC00NSltYXRyaXgoMSwgMCwgMCwgMSwgMCwgMCkiPgoNPGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiLz4KDTxnIGlkPSJTVkdSZXBvX3RyYWNlckNhcnJpZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlPSIjQ0NDQ0NDIiBzdHJva2Utd2lkdGg9IjEuNDg4Ii8+Cg08ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+Cg08bGluZSBpZD0ic2Vjb25kYXJ5LXVwc3Ryb2tlIiB4MT0iMTIuMDUiIHkxPSIxMiIgeDI9IjExLjk1IiB5Mj0iMTIiIHN0eWxlPSJmaWxsOiBub25lOyBzdHJva2U6ICMwMDAwMDA7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiAyOyIvPgoNPGxpbmUgaWQ9InNlY29uZGFyeSIgeDE9IjIxIiB5MT0iMTIiIHgyPSIxMiIgeTI9IjEyIiBzdHlsZT0iZmlsbDogbm9uZTsgc3Ryb2tlOiAjMDAwMDAwOyBzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHN0cm9rZS13aWR0aDogMjsiLz4KDTxjaXJjbGUgaWQ9InByaW1hcnkiIGN4PSIxMiIgY3k9IjEyIiByPSI5IiBzdHlsZT0iZmlsbDogbm9uZTsgc3Ryb2tlOiAjMDAwMDAwOyBzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHN0cm9rZS13aWR0aDogMjsiLz4KDTwvZz4KDTwvc3ZnPg==",
            blocks: [
                {
                    opcode: "reset",
                    text: formatMessage({
                        id: "impulse.block.reset",
                        default: "reset physics engine",
                        description: "Resets the physics engine and scene.",
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {},
                },
                {
                    opcode: "step",
                    text: formatMessage({
                        id: "impulse.block.step",
                        default: "step simulation",
                        description: "Steps the physics simulation.",
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {},
                },
                {
                    opcode: "setgravity",
                    text: "set gravity to x: [GX] y: [GY]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        GX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        GY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: -150,
                        },
                    },
                },
                {
                    opcode: "xgravity",
                    text: "x gravity",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "ygravity",
                    text: "y gravity",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "settimestep",
                    text: "set timestep scale to [S]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        S: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        },
                    },
                },
                {
                    opcode: "timestep",
                    text: "timestep scale",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "setquality",
                    text: "set quality to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 6,
                        },
                    },
                },
                {
                    opcode: "quality",
                    text: "quality",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "setpenetrationcorrection",
                    text: "set penetration correction to [N]%",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 60,
                        },
                    },
                },
                {
                    opcode: "penetrationcorrection",
                    text: "penetration correction %",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "objectcount",
                    text: "# of objects",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "addcircle",
                    text: "(type=1) add circle x: [X] y: [Y] radius: [RADIUS] density: [DENSITY] friction: [FRICTION] id: [ID] rotate only (0/1) [ONLYROT]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        RADIUS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 15,
                        },
                        DENSITY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        },
                        FRICTION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        },
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        ONLYROT: {
                            type: ArgumentType.STRING,
                            defaultValue: "0",
                        },
                    },
                },
                {
                    opcode: "addrectangle",
                    text: "(type=2) add rectangle x: [X] y: [Y] width: [WIDTH] height: [HEIGHT] density: [DENSITY] rotation: [ROTATION] friction: [FRICTION] id: [ID] rotate only (0/1) [ONLYROT]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30,
                        },
                        HEIGHT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30,
                        },
                        DENSITY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        },
                        ROTATION: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 0,
                        },
                        FRICTION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        },
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        ONLYROT: {
                            type: ArgumentType.STRING,
                            defaultValue: "0",
                        },
                    },
                },
                {
                    opcode: "objectids",
                    text: "object ids",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "setxofobject",
                    text: "set x position of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "changexofobject",
                    text: "change x position of object with id [ID] by [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setyofobject",
                    text: "set y position of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "changeyofobject",
                    text: "change y position of object with id [ID] by [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setrotationofobject",
                    text: "set rotation of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setvelocityofobject",
                    text: "set velocity of object with id [ID] to x: [X] y: [Y]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "addvelocitytoobject",
                    text: "add velocity to object with id [ID], x: [X] y: [Y]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "addforcetoobject",
                    text: "add force to object with id [ID], x: [X] y: [Y]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setangularvelocityofobject",
                    text: "set angular velocity of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "addangularvelocitytoobject",
                    text: "add angular velocity to object with id [ID], velocity: [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setwidthofobject",
                    text: "set width of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setheightofobject",
                    text: "set height of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setdensityofobject",
                    text: "set density of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "setidofobject",
                    text: "change id of object with id [ID] to [N]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                        N: {
                            type: ArgumentType.STRING,
                            defaultValue: "myNewId",
                        },
                    },
                },
                {
                    opcode: "deleteobject",
                    text: "delete object with id [ID]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                    },
                },
                {
                    opcode: "objectexists",
                    text: "object with id [ID] exists?",
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                    },
                },
                {
                    opcode: "getdatabyid",
                    text: "get data of object with id [ID]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: {
                            type: ArgumentType.STRING,
                            defaultValue: "myObject",
                        },
                    },
                },
                {
                    opcode: "retrievedbodytype",
                    text: "object type",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyid",
                    text: "object id",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyx",
                    text: "object x position",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyy",
                    text: "object y position",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyvx",
                    text: "object x velocity",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyvy",
                    text: "object y velocity",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodywidth",
                    text: "object width",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyheight",
                    text: "object height",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyrotation",
                    text: "object rotation",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyvr",
                    text: "object rotational velocity",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodyradius",
                    text: "object radius",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodymass",
                    text: "object mass",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodydensity",
                    text: "object density",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodycollided",
                    text: "object collided?",
                    blockType: BlockType.BOOLEAN,
                    arguments: {},
                },
                {
                    opcode: "retrievedbodylastcollidedid",
                    text: "object last collided id",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },

                {
                    opcode: "loadscenedata",
                    text: "load scene data [STR]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        STR: {
                            type: ArgumentType.STRING,
                            defaultValue: "<scene data here>",
                        },
                    },
                },
                {
                    opcode: "scenedata",
                    text: "scene data",
                    blockType: BlockType.REPORTER,
                    arguments: {},
                },
            ],
        };
    }

    loadscenedata(args) {
        this.warp(this.RtImpulseLoadSceneData)(args.STR);
    }

    objectexists(args) {
        this.warp(this.RtImpulseObjectWithIdExists)(args.ID);
        return this.vars.RtImpulseBodyWithIdExists === 1;
    }

    scenedata() {
        this.warp(this.RtImpulseSceneData)();
        return this.vars.RtSceneDataOut;
    }

    objectids() {
        this.warp(this.RtImpulseObjectIds)();
        return this.vars.RtOut;
    }

    setxofobject(args) {
        this.warp(this.RtImpulseSetXPositionOfObjectWithIdTo)(args.ID, this.toNumber(args.N));
    }

    changexofobject(args) {
        this.warp(this.RtImpulseChangeXPositionOfObjectWithIdBy)(
            args.ID,
            this.toNumber(args.N)
        );
    }

    setyofobject(args) {
        this.warp(this.RtImpulseSetYPositionOfObjectWithIdTo)(args.ID, this.toNumber(args.N));
    }

    changeyofobject(args) {
        this.warp(this.RtImpulseChangeYPositionOfObjectWithIdBy)(
            args.ID,
            this.toNumber(args.N)
        );
    }

    setrotationofobject(args) {
        this.warp(this.RtImpulseSetRotationOfObjectWithIdTo)(args.ID, this.toNumber(args.N));
    }

    setvelocityofobject(args) {
        this.warp(this.RtImpulseSetVelocityForObjectWithIdVelocityXVelocityY)(
            args.ID,
            this.toNumber(args.X),
            this.toNumber(args.Y)
        );
    }

    addvelocitytoobject(args) {
        this.warp(this.RtImpulseAddVelocityToObjectWithIdVelocityXVelocityY)(
            args.ID,
            this.toNumber(args.X),
            this.toNumber(args.Y)
        );
    }

    addforcetoobject(args) {
        this.warp(this.RtImpulseAddForceToObjectWithIdForceXForceY)(
            args.ID,
            this.toNumber(args.X),
            this.toNumber(args.Y)
        );
    }

    setangularvelocityofobject(args) {
        this.warp(this.RtImpulseSetAngularVelocityOfObjectWithIdVelocity)(
            args.ID,
            this.toNumber(args.N)
        );
    }

    addangularvelocitytoobject(args) {
        this.warp(this.RtImpulseAddAngularVelocityToObjectWithIdVelocity)(
            args.ID,
            this.toNumber(args.N)
        );
    }

    setheightofobject(args) {
        this.warp(this.RtImpulseSetHeightOfObjectWithIdTo)(args.ID, this.toNumber(args.N));
    }

    setwidthofobject(args) {
        this.warp(this.RtImpulseSetWidthOfObjectWithIdTo)(args.ID, this.toNumber(args.N));
    }

    setdensityofobject(args) {
        this.warp(this.RtImpulseSetDensityOfObjectWithIdTo)(args.ID, this.toNumber(args.N));
    }

    setidofobject(args) {
        this.warp(this.RtImpulseSetIdOfObjectWithIdTo)(args.ID, args.NEWID);
    }

    deleteobject(args) {
        this.warp(this.RtImpulseDeleteObjectWithId)(args.ID);
        this.RtImpulseSceneData;
    }

    isNumeric(str) {
        if (typeof str != "string") return false; // we only process strings!
        return (
            !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str))
        ); // ...and ensure strings of whitespace fail
    }

    reset() {
        this.warp(this.RtImpulseReset)();
    }

    step(args, util) {
        this.vars.RtImpulseEvidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseEvidx)
                    )
                ) === 0
            ) {
                return;
            }
            this.vars.RtImpulseCurrentBodyId = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 27
            );
            this.vars.RtImpulseCurrentBodyWidth =
                2 *
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseEvidx) + 5
                    )
                );
            this.vars.RtImpulseCurrentBodyHeight =
                2 *
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseEvidx) + 6
                    )
                );
            this.vars.RtImpulseCurrentBodyRotation = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 15
            );
            this.vars.RtImpulseCurrentBodyType = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx)
            );
            this.vars.RtImpulseCurrentBodyX = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 7
            );
            this.vars.RtImpulseCurrentBodyY = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 8
            );
            this.vars.RtImpulseCurrentBodyMass = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 16
            );
            this.vars.RtImpulseCurrentBodyCollided = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 28
            );
            this.vars.RtImpulseCurrentBodyLastcollidedid = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 29
            );
            this.vars.RtImpulseCurrentBodyVx = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 9
            );
            this.vars.RtImpulseCurrentBodyVy = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 10
            );
            this.vars.RtImpulseCurrentBodyVr = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 13
            );
            this.vars.RtImpulseCurrentBodyRadius = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 1
            );
            this.vars.RtImpulseCurrentBodyDensity = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(this.vars.RtImpulseEvidx) + 2
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(this.vars.RtImpulseEvidx) + 28,
                1,
                0
            );
            this.vars.RtImpulseEvidx += this.toNumber(this.vars.RtImpulseRb);
        }
        this.warp(this.RtImpulseUpdate)();
    }

    objectcount() {
        this.warp(this.RtImpulseUpdateBody)();
        return this.vars.RtImpulseBody;
    }

    setgravity(args) {
        this.warp(this.RtImpulseSetGravityToXY)(args.GX, args.GY);
    }

    xgravity() {
        return this.vars.RtImpulseGravityX;
    }

    ygravity() {
        return this.vars.RtImpulseGravityY;
    }

    settimestep(args) {
        this.warp(this.RtImpulseSetTimeStepScaleTo)(args.S);
    }

    timestep() {
        return this.vars.RtImpulseDt / (1 / 30);
    }

    setquality(args) {
        this.warp(this.RtImpulseSetQualityTo)(args.N);
    }

    quality() {
        return this.vars.RtImpulseIterations;
    }

    setpenetrationcorrection(args) {
        this.warp(this.RtImpulseSetPenetrationCorrectionTo)(args.N);
    }

    penetrationcorrection() {
        return this.vars.RtImpulsePenetrationCorrection * 100;
    }

    getdatabyid(args) {
        this.warp(this.RtImpulseGetDataOfObjectWithId)(args.ID);
    }

    retrievedbodyx() {
        return this.vars.RtImpulseRetrievedX;
    }
    retrievedbodyy() {
        return this.vars.RtImpulseRetrievedY;
    }
    retrievedbodyvx() {
        return this.vars.RtImpulseRetrievedVx;
    }
    retrievedbodyvy() {
        return this.vars.RtImpulseRetrievedVy;
    }
    retrievedbodywidth() {
        return this.vars.RtImpulseRetrievedWidth;
    }
    retrievedbodyheight() {
        return this.vars.RtImpulseRetrievedHeight;
    }
    retrievedbodyvr() {
        return this.vars.RtImpulseRetrievedVr;
    }
    retrievedbodyrotation() {
        return this.vars.RtImpulseRetrievedRotation;
    }
    retrievedbodyradius() {
        return this.vars.RtImpulseRetrievedRadius;
    }
    retrievedbodymass() {
        return this.vars.RtImpulseRetrievedMass;
    }
    retrievedbodydensity() {
        return this.vars.RtImpulseRetrievedDensity;
    }
    retrievedbodyid() {
        return this.vars.RtImpulseRetrievedId;
    }
    retrievedbodycollided() {
        return this.vars.RtImpulseRetrievedCollided === 1;
    }
    retrievedbodylastcollidedid() {
        return this.vars.RtImpulseRetrievedLastcollidedid;
    }
    retrievedbodytype() {
        return this.vars.RtImpulseRetrievedType;
    }
    addrectangle(args) {
        this.warp(this.RtImpulseAddRectangleDensityAngFrictionIdOnlyRotate)(
            args.X,
            args.Y,
            args.WIDTH,
            args.HEIGHT,
            args.DENSITY,
            args.ROTATION,
            args.FRICTION,
            args.ID,
            args.ONLYROT
        );
    }
    addcircle(args) {
        this.warp(this.RtImpulseAddCircleDensityFrictionIdOnlyRotate)(
            args.X,
            args.Y,
            args.RADIUS,
            args.DENSITY,
            args.FRICTION,
            args.ID,
            args.ONLYROT
        );
    }

    toNumber(t) {
        if ("number" == typeof t) return isNaN(t) ? 0 : t;
        const e = Number(t);
        return Number.isNaN(e) ? 0 : e;
    }
    toBoolean(t) {
        return "boolean" == typeof t
            ? t
            : "string" == typeof t
            ? "" !== t && "0" !== t && "false" !== t.toLowerCase()
            : Boolean(t);
    }
    toString(t) {
        return String(t);
    }
    letterOf(t, e) {
        return e < 0 || e >= t.length ? "" : t[e];
    }
    itemOf(t, e) {
        return e < 0 || e >= t.length ? "" : t[e];
    }
    degToRad(t) {
        return (t * Math.PI) / 180;
    }
    radToDeg(t) {
        return (180 * t) / Math.PI;
    }
    degToScratch(t) {
        return 90 - t;
    }
    scratchToDeg(t) {
        return 90 - t;
    }
    radToScratch(t) {
        return this.degToScratch(this.radToDeg(t));
    }
    scratchToRad(t) {
        return this.degToRad(this.scratchToDeg(t));
    }
    scratchTan(t) {
        switch ((t %= 360)) {
            case -270:
            case 90:
                return 1 / 0;
            case -90:
            case 270:
                return -1 / 0;
            default:
                return parseFloat(Math.tan((Math.PI * t) / 180).toFixed(10));
        }
    }
    normalizeDeg(t) {
        return ((((t + 180) % 360) + 360) % 360) - 180;
    }
    wrapClamp(t, e, i) {
        const s = i - e + 1;
        return t - Math.floor((t - e) / s) * s;
    }
    warp(t) {
        const e = t.bind(this);
        return (...t) => {
            const i = e(...t);
            for (; !i.next().done; );
        };
    }
    random(t, e) {
        const i = Math.min(t, e),
            s = Math.max(t, e);
        return i % 1 == 0 && s % 1 == 0
            ? Math.floor(Math.random() * (s - i + 1)) + i
            : Math.random() * (s - i) + i;
    }
    compare(t, e) {
        if (t === e) return 0;
        let i = Number(t),
            s = Number(e);
        if ((i === 1 / 0 && s === 1 / 0) || (i === -1 / 0 && s === -1 / 0))
            return 0;
        if (
            (0 === i &&
            (null === t || ("string" == typeof t && 0 === t.trim().length))
                ? (i = NaN)
                : 0 === s &&
                  (null === e ||
                      ("string" == typeof e && 0 === e.trim().length)) &&
                  (s = NaN),
            !isNaN(i) && !isNaN(s))
        )
            return i - s;
        const n = String(t).toLowerCase(),
            r = String(e).toLowerCase();
        return n === r ? 0 : n < r ? -1 : 1;
    }

    *RtImpulseApplyImpulseForce(ai, ix, iy, cx, cy) {
        this.vars.RtImpulseRigidBody.splice(
            this.toNumber(ai) + 9,
            1,
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 9)
            ) +
                this.toNumber(ix) *
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 17
                        )
                    )
        );
        this.vars.RtImpulseRigidBody.splice(
            this.toNumber(ai) + 10,
            1,
            this.toNumber(
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 10
                )
            ) +
                this.toNumber(iy) *
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 17
                        )
                    )
        );
        this.vars.RtImpulseRad =
            this.toNumber(
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 19
                )
            ) *
            (this.toNumber(cx) * this.toNumber(iy) -
                this.toNumber(cy) * this.toNumber(ix));
        this.vars.RtImpulseRigidBody.splice(
            this.toNumber(ai) + 13,
            1,
            this.toNumber(
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 13
                )
            ) + this.toNumber(this.vars.RtImpulseRad)
        );
    }

    *RtImpulseCorrectPositions(mi, ai, bi) {
        this.vars.RtImpulseJ =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseManifolds, this.toNumber(mi) + 2)
            ) - 0.05;
        if (this.compare(this.vars.RtImpulseJ, 0) > 0) {
            this.vars.RtImpulseT1 = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(ai) + 17
            );
            this.vars.RtImpulseT2 = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(bi) + 17
            );
            this.vars.RtImpulseJ =
                (this.toNumber(this.vars.RtImpulseJ) /
                    (this.toNumber(this.vars.RtImpulseT1) +
                        this.toNumber(this.vars.RtImpulseT2))) *
                this.toNumber(this.vars.RtImpulsePenetrationCorrection);
            this.vars.RtImpulseNx =
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseManifolds,
                        this.toNumber(mi) + 3
                    )
                ) * this.toNumber(this.vars.RtImpulseJ);
            this.vars.RtImpulseNy =
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseManifolds,
                        this.toNumber(mi) + 4
                    )
                ) * this.toNumber(this.vars.RtImpulseJ);
            if (
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 30
                    )
                ) === 1
            ) {
                null;
            } else {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(ai) + 7,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 7
                        )
                    ) -
                        this.toNumber(this.vars.RtImpulseT1) *
                            this.toNumber(this.vars.RtImpulseNx)
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(ai) + 8,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 8
                        )
                    ) -
                        this.toNumber(this.vars.RtImpulseT1) *
                            this.toNumber(this.vars.RtImpulseNy)
                );
            }
            if (
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bi) + 30
                    )
                ) === 1
            ) {
                null;
            } else {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(bi) + 7,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bi) + 7
                        )
                    ) +
                        this.toNumber(this.vars.RtImpulseT2) *
                            this.toNumber(this.vars.RtImpulseNx)
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(bi) + 8,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bi) + 8
                        )
                    ) +
                        this.toNumber(this.vars.RtImpulseT2) *
                            this.toNumber(this.vars.RtImpulseNy)
                );
            }
        }
    }

    *RtImpulseInitializeManifold(midx, ai, bi) {
        this.vars.RtImpulseT1 = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(ai) + 22
        );
        this.vars.RtImpulseT2 = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(bi) + 22
        );
        if (this.compare(this.vars.RtImpulseT1, this.vars.RtImpulseT2) > 0) {
            this.vars.RtImpulseManifolds.splice(
                this.toNumber(midx) + 5,
                1,
                this.vars.RtImpulseT1
            );
        } else {
            this.vars.RtImpulseManifolds.splice(
                this.toNumber(midx) + 5,
                1,
                this.vars.RtImpulseT2
            );
        }
        this.vars.RtImpulseManifolds.splice(
            this.toNumber(midx) + 7,
            1,
            Math.sqrt(
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 20
                    )
                ) *
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bi) + 20
                        )
                    )
            )
        );
        this.vars.RtImpulseManifolds.splice(
            this.toNumber(midx) + 6,
            1,
            Math.sqrt(
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 21
                    )
                ) *
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bi) + 21
                        )
                    )
            )
        );
        this.warp(this.RtImpulseCalcRadii)(
            ai,
            bi,
            midx,
            this.toNumber(midx) + 10
        );
        if (
            this.compare(
                this.toNumber(this.vars.RtImpulseRvx) *
                    this.toNumber(this.vars.RtImpulseRvx) +
                    this.toNumber(this.vars.RtImpulseRvy) *
                        this.toNumber(this.vars.RtImpulseRvy),
                this.vars.RtImpulseResting
            ) < 0
        ) {
            this.vars.RtImpulseManifolds.splice(this.toNumber(midx) + 5, 1, 0);
        } else {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseManifolds,
                        this.toNumber(midx) + 8
                    ),
                    1
                ) > 0
            ) {
                this.warp(this.RtImpulseCalcRadii)(
                    ai,
                    bi,
                    midx,
                    this.toNumber(midx) + 12
                );
                if (
                    this.compare(
                        this.toNumber(this.vars.RtImpulseRvx) *
                            this.toNumber(this.vars.RtImpulseRvx) +
                            this.toNumber(this.vars.RtImpulseRvy) *
                                this.toNumber(this.vars.RtImpulseRvy),
                        this.vars.RtImpulseResting
                    ) < 0
                ) {
                    this.vars.RtImpulseManifolds.splice(
                        this.toNumber(midx) + 5,
                        1,
                        0
                    );
                }
            }
        }
    }

    *RtImpulseCalcRadii(ai, bi, midx, cidx) {
        this.vars.RtImpulseRax =
            this.toNumber(this.itemOf(this.vars.RtImpulseManifolds, cidx - 1)) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 7)
            );
        this.vars.RtImpulseRay =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseManifolds, this.toNumber(cidx))
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 8)
            );
        this.vars.RtImpulseRbx =
            this.toNumber(this.itemOf(this.vars.RtImpulseManifolds, cidx - 1)) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 7)
            );
        this.vars.RtImpulseRby =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseManifolds, this.toNumber(cidx))
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 8)
            );
        this.vars.RtImpulseT1 = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(ai) + 13
        );
        this.vars.RtImpulseT2 = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(bi) + 13
        );
        this.vars.RtImpulseRvx =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 9)
            ) +
            (0 - this.toNumber(this.vars.RtImpulseT2)) *
                this.toNumber(this.vars.RtImpulseRby) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 9)
            ) -
            (0 - this.toNumber(this.vars.RtImpulseT1)) *
                this.toNumber(this.vars.RtImpulseRay);
        this.vars.RtImpulseRvy =
            this.toNumber(
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(bi) + 10
                )
            ) +
            this.toNumber(this.vars.RtImpulseT2) *
                this.toNumber(this.vars.RtImpulseRbx) -
            this.toNumber(
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 10
                )
            ) -
            this.toNumber(this.vars.RtImpulseT1) *
                this.toNumber(this.vars.RtImpulseRax);
    }

    *RtImpulseApplyImpulse(midx, ai, bi) {
        this.vars.RtImpulseNx = this.itemOf(
            this.vars.RtImpulseManifolds,
            this.toNumber(midx) + 3
        );
        this.vars.RtImpulseNy = this.itemOf(
            this.vars.RtImpulseManifolds,
            this.toNumber(midx) + 4
        );
        this.warp(this.RtImpulseSolveFor)(
            ai,
            bi,
            midx,
            this.toNumber(midx) + 10,
            this.itemOf(this.vars.RtImpulseManifolds, this.toNumber(midx) + 5),
            this.itemOf(this.vars.RtImpulseManifolds, this.toNumber(midx) + 6),
            this.itemOf(this.vars.RtImpulseManifolds, this.toNumber(midx) + 7)
        );
        if (
            this.compare(
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(midx) + 8
                ),
                1
            ) > 0
        ) {
            this.warp(this.RtImpulseSolveFor)(
                ai,
                bi,
                midx,
                this.toNumber(midx) + 12,
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(midx) + 5
                ),
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(midx) + 6
                ),
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(midx) + 7
                )
            );
        }
    }

    *RtImpulseSolveFor(ai, bi, midx, cidx, e, df, sf) {
        this.warp(this.RtImpulseCalcRadii)(ai, bi, midx, cidx);
        this.vars.RtImpulseR =
            this.toNumber(this.vars.RtImpulseRvx) *
                this.toNumber(this.vars.RtImpulseNx) +
            this.toNumber(this.vars.RtImpulseRvy) *
                this.toNumber(this.vars.RtImpulseNy);
        if (this.compare(this.vars.RtImpulseR, 0) > 0) {
            null;
        } else {
            this.vars.RtImpulseT1 =
                this.toNumber(this.vars.RtImpulseRax) *
                    this.toNumber(this.vars.RtImpulseNy) -
                this.toNumber(this.vars.RtImpulseRay) *
                    this.toNumber(this.vars.RtImpulseNx);
            this.vars.RtImpulseT2 =
                this.toNumber(this.vars.RtImpulseRbx) *
                    this.toNumber(this.vars.RtImpulseNy) -
                this.toNumber(this.vars.RtImpulseRby) *
                    this.toNumber(this.vars.RtImpulseNx);
            this.vars.RtImpulseMass =
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 17
                    )
                ) +
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bi) + 17
                    )
                );
            this.vars.RtImpulseMass +=
                this.toNumber(this.vars.RtImpulseT1) *
                this.toNumber(this.vars.RtImpulseT1) *
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 19
                    )
                );
            this.vars.RtImpulseMass +=
                this.toNumber(this.vars.RtImpulseT2) *
                this.toNumber(this.vars.RtImpulseT2) *
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bi) + 19
                    )
                );
            this.vars.RtImpulseJ =
                ((-1 - this.toNumber(e)) *
                    this.toNumber(this.vars.RtImpulseR)) /
                this.toNumber(this.vars.RtImpulseMass) /
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseManifolds,
                        this.toNumber(midx) + 8
                    )
                );
            this.vars.RtImpulseT1 =
                this.toNumber(this.vars.RtImpulseNx) *
                this.toNumber(this.vars.RtImpulseJ);
            this.vars.RtImpulseT2 =
                this.toNumber(this.vars.RtImpulseNy) *
                this.toNumber(this.vars.RtImpulseJ);
            this.warp(this.RtImpulseApplyImpulseForce)(
                ai,
                0 - this.toNumber(this.vars.RtImpulseT1),
                0 - this.toNumber(this.vars.RtImpulseT2),
                this.vars.RtImpulseRax,
                this.vars.RtImpulseRay
            );
            this.warp(this.RtImpulseApplyImpulseForce)(
                bi,
                this.vars.RtImpulseT1,
                this.vars.RtImpulseT2,
                this.vars.RtImpulseRbx,
                this.vars.RtImpulseRby
            );
            this.warp(this.RtImpulseCalcRadii)(ai, bi, midx, cidx);
            this.vars.RtImpulseR =
                this.toNumber(this.vars.RtImpulseRvx) *
                    this.toNumber(this.vars.RtImpulseNx) +
                this.toNumber(this.vars.RtImpulseRvy) *
                    this.toNumber(this.vars.RtImpulseNy);
            this.vars.RtImpulseT1 =
                this.toNumber(this.vars.RtImpulseRvx) -
                this.toNumber(this.vars.RtImpulseR) *
                    this.toNumber(this.vars.RtImpulseNx);
            this.vars.RtImpulseT2 =
                this.toNumber(this.vars.RtImpulseRvy) -
                this.toNumber(this.vars.RtImpulseR) *
                    this.toNumber(this.vars.RtImpulseNy);
            this.vars.RtImpulseD =
                this.toNumber(this.vars.RtImpulseT1) *
                    this.toNumber(this.vars.RtImpulseT1) +
                this.toNumber(this.vars.RtImpulseT2) *
                    this.toNumber(this.vars.RtImpulseT2);
            if (this.compare(this.vars.RtImpulseD, 0.000001) > 0) {
                this.vars.RtImpulseD = Math.sqrt(
                    this.toNumber(this.vars.RtImpulseD)
                );
                this.vars.RtImpulseT1 =
                    this.toNumber(this.vars.RtImpulseT1) /
                    this.toNumber(this.vars.RtImpulseD);
                this.vars.RtImpulseT2 =
                    this.toNumber(this.vars.RtImpulseT2) /
                    this.toNumber(this.vars.RtImpulseD);
            }
            this.vars.RtImpulseR =
                (0 -
                    (this.toNumber(this.vars.RtImpulseRvx) *
                        this.toNumber(this.vars.RtImpulseT1) +
                        this.toNumber(this.vars.RtImpulseRvy) *
                            this.toNumber(this.vars.RtImpulseT2))) /
                this.toNumber(this.vars.RtImpulseMass) /
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseManifolds,
                        this.toNumber(midx) + 8
                    )
                );
            if (
                this.compare(
                    Math.abs(this.toNumber(this.vars.RtImpulseR)),
                    0.001
                ) > 0
            ) {
                if (
                    this.compare(
                        Math.abs(this.toNumber(this.vars.RtImpulseR)),
                        this.toNumber(this.vars.RtImpulseJ) * this.toNumber(sf)
                    ) < 0
                ) {
                    this.vars.RtImpulseT1 =
                        this.toNumber(this.vars.RtImpulseT1) *
                        this.toNumber(this.vars.RtImpulseR);
                    this.vars.RtImpulseT2 =
                        this.toNumber(this.vars.RtImpulseT2) *
                        this.toNumber(this.vars.RtImpulseR);
                    this.warp(this.RtImpulseApplyImpulseForce)(
                        ai,
                        0 - this.toNumber(this.vars.RtImpulseT1),
                        0 - this.toNumber(this.vars.RtImpulseT2),
                        this.vars.RtImpulseRax,
                        this.vars.RtImpulseRay
                    );
                    this.warp(this.RtImpulseApplyImpulseForce)(
                        bi,
                        this.vars.RtImpulseT1,
                        this.vars.RtImpulseT2,
                        this.vars.RtImpulseRbx,
                        this.vars.RtImpulseRby
                    );
                } else {
                    this.vars.RtImpulseT1 =
                        this.toNumber(this.vars.RtImpulseT1) *
                        this.toNumber(this.vars.RtImpulseJ) *
                        this.toNumber(df);
                    this.vars.RtImpulseT2 =
                        this.toNumber(this.vars.RtImpulseT2) *
                        this.toNumber(this.vars.RtImpulseJ) *
                        this.toNumber(df);
                    this.warp(this.RtImpulseApplyImpulseForce)(
                        ai,
                        this.vars.RtImpulseT1,
                        this.vars.RtImpulseT2,
                        this.vars.RtImpulseRax,
                        this.vars.RtImpulseRay
                    );
                    this.warp(this.RtImpulseApplyImpulseForce)(
                        bi,
                        0 - this.toNumber(this.vars.RtImpulseT1),
                        0 - this.toNumber(this.vars.RtImpulseT2),
                        this.vars.RtImpulseRbx,
                        this.vars.RtImpulseRby
                    );
                }
            }
        }
    }

    *RtImpulseIntegrateForcesHalfDt(bodyidx, hdt) {
        this.vars.RtImpulseMass = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(bodyidx) + 17
        );
        if (this.compare(this.vars.RtImpulseMass, 0) > 0) {
            this.vars.RtImpulseVx = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(bodyidx) + 9
            );
            this.vars.RtImpulseVy = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(bodyidx) + 10
            );
            this.vars.RtImpulseVx +=
                ((this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bodyidx) + 11
                    )
                ) +
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bodyidx) + 31
                        )
                    )) *
                    this.toNumber(this.vars.RtImpulseMass) +
                    this.toNumber(this.vars.RtImpulseGravityX)) *
                this.toNumber(hdt);
            this.vars.RtImpulseVy +=
                ((this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bodyidx) + 12
                    )
                ) +
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bodyidx) + 32
                        )
                    )) *
                    this.toNumber(this.vars.RtImpulseMass) +
                    this.toNumber(this.vars.RtImpulseGravityY)) *
                this.toNumber(hdt);
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(bodyidx) + 9,
                1,
                this.vars.RtImpulseVx
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(bodyidx) + 10,
                1,
                this.vars.RtImpulseVy
            );
            this.vars.RtImpulseOri = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(bodyidx) + 13
            );
            this.vars.RtImpulseOri +=
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bodyidx) + 14
                    )
                ) *
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bodyidx) + 19
                    )
                ) *
                this.toNumber(hdt);
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(bodyidx) + 13,
                1,
                this.vars.RtImpulseOri
            );
        }
    }

    *RtImpulseAddEndSfDfRtIdOnlyrotate(sf, df, rt, id, rotonly) {
        this.vars.RtImpulseRigidBody.push(sf);
        this.vars.RtImpulseRigidBody.push(df);
        this.vars.RtImpulseRigidBody.push(rt);
        this.vars.RtImpulseRigidBody.push(0);
        this.vars.RtImpulseRigidBody.push(0);
        this.vars.RtImpulseRigidBody.push(0);
        this.vars.RtImpulseRigidBody.push(0);
        this.vars.RtImpulseRigidBody.push(id);
        this.vars.RtImpulseRigidBody.push(0);
        this.vars.RtImpulseRigidBody.push("");
        this.vars.RtImpulseRigidBody.push(rotonly);
        this.vars.RtImpulseRigidBody.push(0);
        this.vars.RtImpulseRigidBody.push(0);
        this.vars.RtImpulseRigidBody.push("----------");
    }

    *RtImpulseRectanglesCollidedM0003IwIhRwRh(
        refi,
        inci,
        flip,
        m00,
        m01,
        m10,
        m11,
        iw,
        ih,
        rw,
        rh
    ) {
        this.vars.RtImpulseNx = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.vars.RtImpulseRefidx - 1
        );
        this.vars.RtImpulseNy = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(this.vars.RtImpulseRefidx) + 3
        );
        this.vars.RtImpulseT1 =
            this.toNumber(m00) * this.toNumber(this.vars.RtImpulseNx) -
            this.toNumber(m01) * this.toNumber(this.vars.RtImpulseNy);
        this.vars.RtImpulseT2 =
            this.toNumber(m00) * this.toNumber(this.vars.RtImpulseNy) +
            this.toNumber(m01) * this.toNumber(this.vars.RtImpulseNx);
        this.vars.RtImpulseNx =
            this.toNumber(m10) * this.toNumber(this.vars.RtImpulseT1) +
            this.toNumber(m11) * this.toNumber(this.vars.RtImpulseT2);
        this.vars.RtImpulseNy =
            this.toNumber(m10) * this.toNumber(this.vars.RtImpulseT2) -
            this.toNumber(m11) * this.toNumber(this.vars.RtImpulseT1);
        if (
            this.compare(
                Math.abs(this.toNumber(this.vars.RtImpulseNx)),
                Math.abs(this.toNumber(this.vars.RtImpulseNy))
            ) > 0
        ) {
            if (this.compare(this.vars.RtImpulseNx, 0) < 0) {
                this.warp(this.RtImpulseFoundIncidentFaceIxy)(
                    m10,
                    m11,
                    iw,
                    0 - this.toNumber(ih),
                    iw,
                    ih,
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 8
                    )
                );
            } else {
                this.warp(this.RtImpulseFoundIncidentFaceIxy)(
                    m10,
                    m11,
                    0 - this.toNumber(iw),
                    ih,
                    0 - this.toNumber(iw),
                    0 - this.toNumber(ih),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 8
                    )
                );
            }
        } else {
            if (this.compare(this.vars.RtImpulseNy, 0) < 0) {
                this.warp(this.RtImpulseFoundIncidentFaceIxy)(
                    m10,
                    m11,
                    iw,
                    ih,
                    0 - this.toNumber(iw),
                    ih,
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 8
                    )
                );
            } else {
                this.warp(this.RtImpulseFoundIncidentFaceIxy)(
                    m10,
                    m11,
                    0 - this.toNumber(iw),
                    0 - this.toNumber(ih),
                    iw,
                    0 - this.toNumber(ih),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(inci) + 8
                    )
                );
            }
        }
        if (this.compare(this.vars.RtImpulseRefidx, 3) < 0) {
            if (this.toNumber(this.vars.RtImpulseRefidx) === 1) {
                this.warp(this.RtImpulseSetupReferenceFaceIxy)(
                    m00,
                    m01,
                    0 - this.toNumber(rw),
                    0 - this.toNumber(rh),
                    rw,
                    0 - this.toNumber(rh),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 8
                    )
                );
            } else {
                this.warp(this.RtImpulseSetupReferenceFaceIxy)(
                    m00,
                    m01,
                    rw,
                    0 - this.toNumber(rh),
                    rw,
                    rh,
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 8
                    )
                );
            }
        } else {
            if (this.toNumber(this.vars.RtImpulseRefidx) === 3) {
                this.warp(this.RtImpulseSetupReferenceFaceIxy)(
                    m00,
                    m01,
                    rw,
                    rh,
                    0 - this.toNumber(rw),
                    rh,
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 8
                    )
                );
            } else {
                this.warp(this.RtImpulseSetupReferenceFaceIxy)(
                    m00,
                    m01,
                    0 - this.toNumber(rw),
                    rh,
                    0 - this.toNumber(rw),
                    0 - this.toNumber(rh),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 7
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(refi) + 8
                    )
                );
            }
        }
        this.vars.RtImpulseNx =
            this.toNumber(this.vars.RtImpulseV2x) -
            this.toNumber(this.vars.RtImpulseV1x);
        this.vars.RtImpulseNy =
            this.toNumber(this.vars.RtImpulseV2y) -
            this.toNumber(this.vars.RtImpulseV1y);
        this.vars.RtImpulseD = Math.sqrt(
            this.toNumber(this.vars.RtImpulseNx) *
                this.toNumber(this.vars.RtImpulseNx) +
                this.toNumber(this.vars.RtImpulseNy) *
                    this.toNumber(this.vars.RtImpulseNy)
        );
        this.vars.RtImpulseNx =
            this.toNumber(this.vars.RtImpulseNx) /
            this.toNumber(this.vars.RtImpulseD);
        this.vars.RtImpulseNy =
            this.toNumber(this.vars.RtImpulseNy) /
            this.toNumber(this.vars.RtImpulseD);
        this.vars.RtImpulseRvx = this.vars.RtImpulseNy;
        this.vars.RtImpulseRvy = 0 - this.toNumber(this.vars.RtImpulseNx);
        this.warp(this.RtImpulseClipNormC)(
            0 - this.toNumber(this.vars.RtImpulseNx),
            0 - this.toNumber(this.vars.RtImpulseNy),
            0 -
                (this.toNumber(this.vars.RtImpulseNx) *
                    this.toNumber(this.vars.RtImpulseV1x) +
                    this.toNumber(this.vars.RtImpulseNy) *
                        this.toNumber(this.vars.RtImpulseV1y))
        );
        if (this.compare(this.vars.RtImpulseOut.length, 3) > 0) {
            this.warp(this.RtImpulseClipNormC)(
                this.vars.RtImpulseNx,
                this.vars.RtImpulseNy,
                this.toNumber(this.vars.RtImpulseNx) *
                    this.toNumber(this.vars.RtImpulseV2x) +
                    this.toNumber(this.vars.RtImpulseNy) *
                        this.toNumber(this.vars.RtImpulseV2y)
            );
            if (this.compare(this.vars.RtImpulseOut.length, 3) > 0) {
                if (flip) {
                    this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                        inci,
                        refi,
                        0,
                        0 - this.toNumber(this.vars.RtImpulseRvx),
                        0 - this.toNumber(this.vars.RtImpulseRvy),
                        0
                    );
                } else {
                    this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                        refi,
                        inci,
                        0,
                        this.vars.RtImpulseRvx,
                        this.vars.RtImpulseRvy,
                        0
                    );
                }
                this.vars.RtImpulseManifolds.push(0);
                this.vars.RtImpulseOri = 0;
                this.vars.RtImpulseT1 = 0;
                this.vars.RtImpulseR =
                    this.toNumber(this.vars.RtImpulseRvx) *
                        this.toNumber(this.vars.RtImpulseV1x) +
                    this.toNumber(this.vars.RtImpulseRvy) *
                        this.toNumber(this.vars.RtImpulseV1y);
                this.vars.RtImpulseD =
                    this.toNumber(this.vars.RtImpulseRvx) *
                        this.toNumber(this.vars.RtImpulseRax) +
                    this.toNumber(this.vars.RtImpulseRvy) *
                        this.toNumber(this.vars.RtImpulseRay) -
                    this.toNumber(this.vars.RtImpulseR);
                if (this.compare(this.vars.RtImpulseD, 0) > 0) {
                    null;
                } else {
                    this.vars.RtImpulseOri++;
                    this.vars.RtImpulseManifolds.push(this.vars.RtImpulseRax);
                    this.vars.RtImpulseManifolds.push(this.vars.RtImpulseRay);
                    this.vars.RtImpulseT1 =
                        0 - this.toNumber(this.vars.RtImpulseD);
                }
                this.vars.RtImpulseD =
                    this.toNumber(this.vars.RtImpulseRvx) *
                        this.toNumber(this.vars.RtImpulseRbx) +
                    this.toNumber(this.vars.RtImpulseRvy) *
                        this.toNumber(this.vars.RtImpulseRby) -
                    this.toNumber(this.vars.RtImpulseR);
                if (this.compare(this.vars.RtImpulseD, 0) > 0) {
                    null;
                } else {
                    this.vars.RtImpulseOri++;
                    this.vars.RtImpulseManifolds.push(this.vars.RtImpulseRbx);
                    this.vars.RtImpulseManifolds.push(this.vars.RtImpulseRby);
                    this.vars.RtImpulseT1 =
                        (this.toNumber(this.vars.RtImpulseT1) -
                            this.toNumber(this.vars.RtImpulseD)) /
                        this.toNumber(this.vars.RtImpulseOri);
                }
                var t = 4 - this.toNumber(this.vars.RtImpulseOri) * 2;
                for (let i = 0; i < t; i++) {
                    this.vars.RtImpulseManifolds.push("");
                }
                this.vars.RtImpulseManifolds.splice(
                    this.vars.RtImpulseManifolds.length -
                        this.toNumber(this.vars.RtImpulseM) +
                        2,
                    1,
                    this.vars.RtImpulseT1
                );
                this.vars.RtImpulseManifolds.splice(
                    this.vars.RtImpulseManifolds.length -
                        this.toNumber(this.vars.RtImpulseM) +
                        8,
                    1,
                    this.vars.RtImpulseOri
                );
            }
        }
    }

    *RtImpulseClipNormC(nx, ny, c) {
        this.vars.RtImpulseOut = [];
        this.vars.RtImpulseT1 =
            this.toNumber(nx) * this.toNumber(this.vars.RtImpulseRax) +
            this.toNumber(ny) * this.toNumber(this.vars.RtImpulseRay) -
            this.toNumber(c);
        this.vars.RtImpulseT2 =
            this.toNumber(nx) * this.toNumber(this.vars.RtImpulseRbx) +
            this.toNumber(ny) * this.toNumber(this.vars.RtImpulseRby) -
            this.toNumber(c);
        if (this.compare(this.vars.RtImpulseT1, 0) > 0) {
            null;
        } else {
            this.vars.RtImpulseOut.push(this.vars.RtImpulseRax);
            this.vars.RtImpulseOut.push(this.vars.RtImpulseRay);
        }
        if (this.compare(this.vars.RtImpulseT2, 0) > 0) {
            null;
        } else {
            this.vars.RtImpulseOut.push(this.vars.RtImpulseRbx);
            this.vars.RtImpulseOut.push(this.vars.RtImpulseRby);
        }
        if (
            this.compare(
                this.toNumber(this.vars.RtImpulseT1) *
                    this.toNumber(this.vars.RtImpulseT2),
                0
            ) < 0
        ) {
            this.vars.RtImpulseT1 =
                this.toNumber(this.vars.RtImpulseT1) /
                (this.toNumber(this.vars.RtImpulseT1) -
                    this.toNumber(this.vars.RtImpulseT2));
            this.vars.RtImpulseOut.push(
                (this.toNumber(this.vars.RtImpulseRbx) -
                    this.toNumber(this.vars.RtImpulseRax)) *
                    this.toNumber(this.vars.RtImpulseT1) +
                    this.toNumber(this.vars.RtImpulseRax)
            );
            this.vars.RtImpulseOut.push(
                (this.toNumber(this.vars.RtImpulseRby) -
                    this.toNumber(this.vars.RtImpulseRay)) *
                    this.toNumber(this.vars.RtImpulseT1) +
                    this.toNumber(this.vars.RtImpulseRay)
            );
        }
        if (this.compare(this.vars.RtImpulseOut.length, 1) > 0) {
            this.vars.RtImpulseRax = this.itemOf(this.vars.RtImpulseOut, 0);
            this.vars.RtImpulseRay = this.itemOf(this.vars.RtImpulseOut, 1);
            if (this.compare(this.vars.RtImpulseOut.length, 3) > 0) {
                this.vars.RtImpulseRbx = this.itemOf(this.vars.RtImpulseOut, 2);
                this.vars.RtImpulseRby = this.itemOf(this.vars.RtImpulseOut, 3);
            }
        }
    }

    *RtImpulseReset() {
        this.vars.RtImpulseRb = 34;
        this.vars.RtImpulseM = 13;
        this.vars.RtImpulsePenetrationCorrection = 0.6;
        this.vars.RtImpulseGravityX = 0;
        this.vars.RtImpulseGravityY = -150;
        this.vars.RtImpulseIterations = 10;
        this.vars.RtImpulseDt = 1 / 30;
        this.vars.RtImpulseResting =
            this.toNumber(this.vars.RtImpulseGravityY) *
                this.toNumber(this.vars.RtImpulseGravityY) *
                this.toNumber(this.vars.RtImpulseDt) *
                this.toNumber(this.vars.RtImpulseDt) +
            25;
        this.vars.RtImpulseRadtodeg = 180 / 3.1415926535897936;
        this.vars.RtImpulseUniqueid = 0;
        this.vars.RtImpulseRigidBody = [];
        this.vars.RtImpulseRigidBody.push(0 + 0);
        this.vars.RtImpulseRigidBody.push(1 + 0);
        this.vars.RtImpulseRigidBody.push(0 + 0);
        this.vars.RtImpulseRigidBody.push(-1 + 0);
        this.vars.RtImpulseRigidBody.push(-1 + 0);
        this.vars.RtImpulseRigidBody.push(0 + 0);
        this.vars.RtImpulseRigidBody.push(1 + 0);
        this.vars.RtImpulseRigidBody.push(0 + 0);
        var t =
            this.toNumber(this.vars.RtImpulseRb) -
            this.vars.RtImpulseRigidBody.length;
        for (let i = 0; i < t; i++) {
            this.vars.RtImpulseRigidBody.push("0");
        }
        this.warp(this.RtImpulseGetfirstuniqueid)();
    }

    *RtImpulseManifoldRToRAwAhBwBh(ai, bi, w, h, bw, bh) {
        this.vars.RtImpulseRax =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 7)
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 7)
            );
        this.vars.RtImpulseRay =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 8)
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 8)
            );
        this.warp(this.RtImpulseFindaxisleastpenetrationAwAhBwBhPosAB)(
            ai,
            bi,
            w,
            h,
            bw,
            bh,
            this.vars.RtImpulseRax,
            this.vars.RtImpulseRay
        );
        if (this.compare(this.vars.RtImpulseR, 0) < 0) {
            this.vars.RtImpulseRigidBody.splice(this.toNumber(ai) + 28, 1, 1);
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(ai) + 29,
                1,
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(bi) + 27
                )
            );
            this.vars.RtImpulseRigidBody.splice(this.toNumber(bi) + 28, 1, 1);
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(bi) + 29,
                1,
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 27
                )
            );
            this.vars.RtImpulsePena = this.vars.RtImpulseR;
            this.vars.RtImpulseRefidx = this.vars.RtImpulseInd;
            this.warp(this.RtImpulseFindaxisleastpenetrationAwAhBwBhPosAB)(
                bi,
                ai,
                bw,
                bh,
                w,
                h,
                0 - this.toNumber(this.vars.RtImpulseRax),
                0 - this.toNumber(this.vars.RtImpulseRay)
            );
            if (this.compare(this.vars.RtImpulseR, 0) < 0) {
                if (
                    this.compare(
                        this.toNumber(this.vars.RtImpulsePena) * 0.99,
                        this.toNumber(this.vars.RtImpulseR) * 0.95
                    ) > 0
                ) {
                    this.warp(this.RtImpulseRectanglesCollidedM0003IwIhRwRh)(
                        ai,
                        bi,
                        0,
                        this.vars.RtImpulseM10,
                        this.vars.RtImpulseM11,
                        this.vars.RtImpulseM00,
                        this.vars.RtImpulseM01,
                        bw,
                        bh,
                        w,
                        h
                    );
                } else {
                    this.vars.RtImpulseRefidx = this.vars.RtImpulseInd;
                    this.warp(this.RtImpulseRectanglesCollidedM0003IwIhRwRh)(
                        bi,
                        ai,
                        !null,
                        this.vars.RtImpulseM00,
                        this.vars.RtImpulseM01,
                        this.vars.RtImpulseM10,
                        this.vars.RtImpulseM11,
                        w,
                        h,
                        bw,
                        bh
                    );
                }
            }
        } else {
            null;
        }
    }

    *RtImpulseFindaxisleastpenetrationAwAhBwBhPosAB(
        ai,
        bi,
        aw,
        ah,
        bw,
        bh,
        dvx,
        dvy
    ) {
        this.vars.RtImpulseM01 = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(ai) + 15
        );
        this.vars.RtImpulseM00 = Math.cos(
            this.degToRad(this.toNumber(this.vars.RtImpulseM01))
        );
        this.vars.RtImpulseM01 = Math.sin(
            this.degToRad(this.toNumber(this.vars.RtImpulseM01))
        );
        this.vars.RtImpulseM11 = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(bi) + 15
        );
        this.vars.RtImpulseM10 = Math.cos(
            this.degToRad(this.toNumber(this.vars.RtImpulseM11))
        );
        this.vars.RtImpulseM11 = Math.sin(
            this.degToRad(this.toNumber(this.vars.RtImpulseM11))
        );
        this.vars.RtImpulseNx =
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM00) -
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM01);
        this.vars.RtImpulseNy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM00) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM01);
        this.warp(this.RtImpulseGetSupportAiNxNyWH)(
            bi,
            this.vars.RtImpulseNx,
            this.vars.RtImpulseNy,
            bw,
            bh
        );
        this.vars.RtImpulseRbx =
            this.toNumber(dvx) +
            (this.toNumber(this.vars.RtImpulseM01) * this.toNumber(ah) -
                this.toNumber(this.vars.RtImpulseM00) * this.toNumber(aw));
        this.vars.RtImpulseRby =
            this.toNumber(dvy) -
            (this.toNumber(this.vars.RtImpulseM00) * this.toNumber(ah) +
                this.toNumber(this.vars.RtImpulseM01) * this.toNumber(aw));
        this.vars.RtImpulseRvx =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRbx) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRby);
        this.vars.RtImpulseRvy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRby) -
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRbx);
        this.vars.RtImpulseR =
            this.toNumber(this.vars.RtImpulseNx) *
                (this.toNumber(this.vars.RtImpulseRvx) -
                    this.toNumber(this.vars.RtImpulseIncx)) +
            this.toNumber(this.vars.RtImpulseNy) *
                (this.toNumber(this.vars.RtImpulseRvy) -
                    this.toNumber(this.vars.RtImpulseIncy));
        this.vars.RtImpulseInd = 1;
        this.vars.RtImpulseNx =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM00) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM01);
        this.vars.RtImpulseNy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM01) -
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM00);
        this.warp(this.RtImpulseGetSupportAiNxNyWH)(
            bi,
            0 - this.toNumber(this.vars.RtImpulseNx),
            0 - this.toNumber(this.vars.RtImpulseNy),
            bw,
            bh
        );
        this.vars.RtImpulseRbx =
            this.toNumber(dvx) +
            (this.toNumber(this.vars.RtImpulseM01) * this.toNumber(ah) +
                this.toNumber(this.vars.RtImpulseM00) * this.toNumber(aw));
        this.vars.RtImpulseRby =
            this.toNumber(dvy) -
            (this.toNumber(this.vars.RtImpulseM00) * this.toNumber(ah) -
                this.toNumber(this.vars.RtImpulseM01) * this.toNumber(aw));
        this.vars.RtImpulseRvx =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRbx) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRby);
        this.vars.RtImpulseRvy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRby) -
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRbx);
        this.vars.RtImpulseD =
            this.toNumber(this.vars.RtImpulseNx) *
                (this.toNumber(this.vars.RtImpulseIncx) -
                    this.toNumber(this.vars.RtImpulseRvx)) +
            this.toNumber(this.vars.RtImpulseNy) *
                (this.toNumber(this.vars.RtImpulseIncy) -
                    this.toNumber(this.vars.RtImpulseRvy));
        if (this.compare(this.vars.RtImpulseD, this.vars.RtImpulseR) > 0) {
            this.vars.RtImpulseInd = 2;
            this.vars.RtImpulseR = this.vars.RtImpulseD;
        }
        this.vars.RtImpulseNx =
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM00) -
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM01);
        this.vars.RtImpulseNy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM00) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM01);
        this.warp(this.RtImpulseGetSupportAiNxNyWH)(
            bi,
            0 - this.toNumber(this.vars.RtImpulseNx),
            0 - this.toNumber(this.vars.RtImpulseNy),
            bw,
            bh
        );
        this.vars.RtImpulseRbx =
            this.toNumber(dvx) +
            (this.toNumber(this.vars.RtImpulseM00) * this.toNumber(aw) -
                this.toNumber(this.vars.RtImpulseM01) * this.toNumber(ah));
        this.vars.RtImpulseRby =
            this.toNumber(dvy) +
            (this.toNumber(this.vars.RtImpulseM00) * this.toNumber(ah) +
                this.toNumber(this.vars.RtImpulseM01) * this.toNumber(aw));
        this.vars.RtImpulseRvx =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRbx) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRby);
        this.vars.RtImpulseRvy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRby) -
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRbx);
        this.vars.RtImpulseD =
            this.toNumber(this.vars.RtImpulseNx) *
                (this.toNumber(this.vars.RtImpulseIncx) -
                    this.toNumber(this.vars.RtImpulseRvx)) +
            this.toNumber(this.vars.RtImpulseNy) *
                (this.toNumber(this.vars.RtImpulseIncy) -
                    this.toNumber(this.vars.RtImpulseRvy));
        if (this.compare(this.vars.RtImpulseD, this.vars.RtImpulseR) > 0) {
            this.vars.RtImpulseInd = 3;
            this.vars.RtImpulseR = this.vars.RtImpulseD;
        }
        this.vars.RtImpulseNx =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM00) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM01);
        this.vars.RtImpulseNy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseM01) -
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseM00);
        this.warp(this.RtImpulseGetSupportAiNxNyWH)(
            bi,
            this.vars.RtImpulseNx,
            this.vars.RtImpulseNy,
            bw,
            bh
        );
        this.vars.RtImpulseRbx =
            this.toNumber(dvx) -
            (this.toNumber(this.vars.RtImpulseM00) * this.toNumber(aw) +
                this.toNumber(this.vars.RtImpulseM01) * this.toNumber(ah));
        this.vars.RtImpulseRby =
            this.toNumber(dvy) +
            (this.toNumber(this.vars.RtImpulseM00) * this.toNumber(ah) -
                this.toNumber(this.vars.RtImpulseM01) * this.toNumber(aw));
        this.vars.RtImpulseRvx =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRbx) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRby);
        this.vars.RtImpulseRvy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseRby) -
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseRbx);
        this.vars.RtImpulseD =
            this.toNumber(this.vars.RtImpulseNx) *
                (this.toNumber(this.vars.RtImpulseRvx) -
                    this.toNumber(this.vars.RtImpulseIncx)) +
            this.toNumber(this.vars.RtImpulseNy) *
                (this.toNumber(this.vars.RtImpulseRvy) -
                    this.toNumber(this.vars.RtImpulseIncy));
        if (this.compare(this.vars.RtImpulseD, this.vars.RtImpulseR) > 0) {
            this.vars.RtImpulseInd = 4;
            this.vars.RtImpulseR = this.vars.RtImpulseD;
        }
    }

    *RtImpulseManifoldCToRWH(ai, bi, w, h) {
        this.vars.RtImpulseRad = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(ai) + 1
        );
        this.vars.RtImpulseOri = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(bi) + 15
        );
        this.vars.RtImpulseM00 = Math.cos(
            this.degToRad(this.toNumber(this.vars.RtImpulseOri))
        );
        this.vars.RtImpulseM01 = Math.sin(
            this.degToRad(this.toNumber(this.vars.RtImpulseOri))
        );
        this.vars.RtImpulseM10 = 0 - this.toNumber(this.vars.RtImpulseM01);
        this.vars.RtImpulseM11 = this.vars.RtImpulseM00;
        this.vars.RtImpulseNx =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 7)
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 7)
            );
        this.vars.RtImpulseNy =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 8)
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 8)
            );
        this.vars.RtImpulseVx =
            this.toNumber(this.vars.RtImpulseM00) *
                this.toNumber(this.vars.RtImpulseNx) +
            this.toNumber(this.vars.RtImpulseM01) *
                this.toNumber(this.vars.RtImpulseNy);
        this.vars.RtImpulseVy =
            this.toNumber(this.vars.RtImpulseM10) *
                this.toNumber(this.vars.RtImpulseNx) +
            this.toNumber(this.vars.RtImpulseM11) *
                this.toNumber(this.vars.RtImpulseNy);
        this.vars.RtImpulseD =
            0 - (this.toNumber(this.vars.RtImpulseVy) + this.toNumber(h));
        if (this.compare(this.vars.RtImpulseD, this.vars.RtImpulseRad) > 0) {
            null;
        } else {
            this.vars.RtImpulseT1 = 0;
            this.vars.RtImpulseR =
                this.toNumber(this.vars.RtImpulseVx) - this.toNumber(w);
            if (
                this.compare(this.vars.RtImpulseR, this.vars.RtImpulseRad) > 0
            ) {
                null;
            } else {
                if (
                    this.compare(this.vars.RtImpulseR, this.vars.RtImpulseD) > 0
                ) {
                    this.vars.RtImpulseD = this.vars.RtImpulseR;
                    this.vars.RtImpulseT1 = 1;
                }
                this.vars.RtImpulseR =
                    this.toNumber(this.vars.RtImpulseVy) - this.toNumber(h);
                if (
                    this.compare(this.vars.RtImpulseR, this.vars.RtImpulseRad) >
                    0
                ) {
                    null;
                } else {
                    if (
                        this.compare(
                            this.vars.RtImpulseR,
                            this.vars.RtImpulseD
                        ) > 0
                    ) {
                        this.vars.RtImpulseD = this.vars.RtImpulseR;
                        this.vars.RtImpulseT1 = 2;
                    }
                    this.vars.RtImpulseR =
                        0 -
                        (this.toNumber(this.vars.RtImpulseVx) +
                            this.toNumber(w));
                    if (
                        this.compare(
                            this.vars.RtImpulseR,
                            this.vars.RtImpulseRad
                        ) > 0
                    ) {
                        null;
                    } else {
                        if (
                            this.compare(
                                this.vars.RtImpulseR,
                                this.vars.RtImpulseD
                            ) > 0
                        ) {
                            this.vars.RtImpulseD = this.vars.RtImpulseR;
                            this.vars.RtImpulseT1 = 3;
                        }
                        if (this.toNumber(this.vars.RtImpulseT1) === 0) {
                            this.warp(this.RtImpulseManifoldCToR2NPaPbCent)(
                                ai,
                                bi,
                                0,
                                -1,
                                0 - this.toNumber(w),
                                0 - this.toNumber(h),
                                w,
                                0 - this.toNumber(h),
                                this.vars.RtImpulseVx,
                                this.vars.RtImpulseVy
                            );
                        } else {
                            if (this.toNumber(this.vars.RtImpulseT1) === 1) {
                                this.warp(this.RtImpulseManifoldCToR2NPaPbCent)(
                                    ai,
                                    bi,
                                    1,
                                    0,
                                    w,
                                    0 - this.toNumber(h),
                                    w,
                                    h,
                                    this.vars.RtImpulseVx,
                                    this.vars.RtImpulseVy
                                );
                            } else {
                                if (
                                    this.toNumber(this.vars.RtImpulseT1) === 2
                                ) {
                                    this.warp(
                                        this.RtImpulseManifoldCToR2NPaPbCent
                                    )(
                                        ai,
                                        bi,
                                        0,
                                        1,
                                        w,
                                        h,
                                        0 - this.toNumber(w),
                                        h,
                                        this.vars.RtImpulseVx,
                                        this.vars.RtImpulseVy
                                    );
                                } else {
                                    this.warp(
                                        this.RtImpulseManifoldCToR2NPaPbCent
                                    )(
                                        ai,
                                        bi,
                                        -1,
                                        0,
                                        0 - this.toNumber(w),
                                        h,
                                        0 - this.toNumber(w),
                                        0 - this.toNumber(h),
                                        this.vars.RtImpulseVx,
                                        this.vars.RtImpulseVy
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    *RtImpulseManifoldCToR2NPaPbCent(
        ai,
        bi,
        nx,
        ny,
        v1x,
        v1y,
        v2x,
        v2y,
        cx,
        cy
    ) {
        this.vars.RtImpulseM01 = this.vars.RtImpulseM10;
        this.vars.RtImpulseM10 = Math.sin(
            this.degToRad(this.toNumber(this.vars.RtImpulseOri))
        );
        if (this.compare(this.vars.RtImpulseD, 0.0001) < 0) {
            this.vars.RtImpulseVx =
                0 -
                (this.toNumber(this.vars.RtImpulseM00) * this.toNumber(nx) +
                    this.toNumber(this.vars.RtImpulseM01) * this.toNumber(ny));
            this.vars.RtImpulseVy =
                0 -
                (this.toNumber(this.vars.RtImpulseM10) * this.toNumber(nx) +
                    this.toNumber(this.vars.RtImpulseM11) * this.toNumber(ny));
            this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                ai,
                bi,
                this.vars.RtImpulseRad,
                this.vars.RtImpulseVx,
                this.vars.RtImpulseVy,
                0
            );
            this.vars.RtImpulseManifolds.push(1);
            this.vars.RtImpulseManifolds.push(
                this.toNumber(this.vars.RtImpulseVx) *
                    this.toNumber(this.vars.RtImpulseRad) +
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 7
                        )
                    )
            );
            this.vars.RtImpulseManifolds.push(
                this.toNumber(this.vars.RtImpulseVy) *
                    this.toNumber(this.vars.RtImpulseRad) +
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 8
                        )
                    )
            );
            this.vars.RtImpulseManifolds.push("");
            this.vars.RtImpulseManifolds.push("");
        } else {
            this.vars.RtImpulseT1 =
                (this.toNumber(cx) - this.toNumber(v1x)) *
                    (this.toNumber(v2x) - this.toNumber(v1x)) +
                (this.toNumber(cy) - this.toNumber(v1y)) *
                    (this.toNumber(v2y) - this.toNumber(v1y));
            if (!(this.compare(this.vars.RtImpulseT1, 0) > 0)) {
                this.vars.RtImpulseD =
                    (this.toNumber(cx) - this.toNumber(v1x)) *
                        (this.toNumber(cx) - this.toNumber(v1x)) +
                    (this.toNumber(cy) - this.toNumber(v1y)) *
                        (this.toNumber(cy) - this.toNumber(v1y));
                if (
                    this.compare(
                        this.vars.RtImpulseD,
                        this.toNumber(this.vars.RtImpulseRad) *
                            this.toNumber(this.vars.RtImpulseRad)
                    ) > 0
                ) {
                    null;
                } else {
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(ai) + 28,
                        1,
                        1
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(ai) + 29,
                        1,
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bi) + 27
                        )
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(bi) + 28,
                        1,
                        1
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(bi) + 29,
                        1,
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 27
                        )
                    );
                    this.warp(this.RtImpulseMatrixMul)(
                        this.toNumber(v1x) - this.toNumber(cx),
                        this.toNumber(v1y) - this.toNumber(cy)
                    );
                    this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                        ai,
                        bi,
                        this.toNumber(this.vars.RtImpulseRad) -
                            Math.sqrt(this.toNumber(this.vars.RtImpulseD)),
                        this.vars.RtImpulseVx,
                        this.vars.RtImpulseVy,
                        !null
                    );
                    this.vars.RtImpulseManifolds.push(1);
                    this.vars.RtImpulseVx =
                        this.toNumber(this.vars.RtImpulseM00) *
                            this.toNumber(v1x) +
                        this.toNumber(this.vars.RtImpulseM01) *
                            this.toNumber(v1y);
                    this.vars.RtImpulseVy =
                        this.toNumber(this.vars.RtImpulseM10) *
                            this.toNumber(v1x) +
                        this.toNumber(this.vars.RtImpulseM11) *
                            this.toNumber(v1y);
                    this.vars.RtImpulseManifolds.push(
                        this.toNumber(this.vars.RtImpulseVx) +
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(bi) + 7
                                )
                            )
                    );
                    this.vars.RtImpulseManifolds.push(
                        this.toNumber(this.vars.RtImpulseVy) +
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(bi) + 8
                                )
                            )
                    );
                    this.vars.RtImpulseManifolds.push("");
                    this.vars.RtImpulseManifolds.push("");
                }
            } else {
                this.vars.RtImpulseT2 =
                    (this.toNumber(cx) - this.toNumber(v2x)) *
                        (this.toNumber(v1x) - this.toNumber(v2x)) +
                    (this.toNumber(cy) - this.toNumber(v2y)) *
                        (this.toNumber(v1y) - this.toNumber(v2y));
                if (!(this.compare(this.vars.RtImpulseT2, 0) > 0)) {
                    this.vars.RtImpulseD =
                        (this.toNumber(cx) - this.toNumber(v2x)) *
                            (this.toNumber(cx) - this.toNumber(v2x)) +
                        (this.toNumber(cy) - this.toNumber(v2y)) *
                            (this.toNumber(cy) - this.toNumber(v2y));
                    if (
                        this.compare(
                            this.vars.RtImpulseD,
                            this.toNumber(this.vars.RtImpulseRad) *
                                this.toNumber(this.vars.RtImpulseRad)
                        ) > 0
                    ) {
                        null;
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(ai) + 28,
                            1,
                            1
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(ai) + 29,
                            1,
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(bi) + 27
                            )
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(bi) + 28,
                            1,
                            1
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(bi) + 29,
                            1,
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(ai) + 27
                            )
                        );
                        this.warp(this.RtImpulseMatrixMul)(
                            this.toNumber(v2x) - this.toNumber(cx),
                            this.toNumber(v2y) - this.toNumber(cy)
                        );
                        this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                            ai,
                            bi,
                            this.toNumber(this.vars.RtImpulseRad) -
                                Math.sqrt(this.toNumber(this.vars.RtImpulseD)),
                            this.vars.RtImpulseVx,
                            this.vars.RtImpulseVy,
                            !null
                        );
                        this.vars.RtImpulseManifolds.push(1);
                        this.vars.RtImpulseVx =
                            this.toNumber(this.vars.RtImpulseM00) *
                                this.toNumber(v2x) +
                            this.toNumber(this.vars.RtImpulseM01) *
                                this.toNumber(v2y);
                        this.vars.RtImpulseVy =
                            this.toNumber(this.vars.RtImpulseM10) *
                                this.toNumber(v2x) +
                            this.toNumber(this.vars.RtImpulseM11) *
                                this.toNumber(v2y);
                        this.vars.RtImpulseManifolds.push(
                            this.toNumber(this.vars.RtImpulseVx) +
                                this.toNumber(
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi) + 7
                                    )
                                )
                        );
                        this.vars.RtImpulseManifolds.push(
                            this.toNumber(this.vars.RtImpulseVy) +
                                this.toNumber(
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi) + 8
                                    )
                                )
                        );
                        this.vars.RtImpulseManifolds.push("");
                        this.vars.RtImpulseManifolds.push("");
                    }
                } else {
                    if (
                        this.compare(
                            (this.toNumber(cx) - this.toNumber(v1x)) *
                                this.toNumber(nx) +
                                (this.toNumber(cy) - this.toNumber(v1y)) *
                                    this.toNumber(ny),
                            this.vars.RtImpulseRad
                        ) > 0
                    ) {
                        null;
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(ai) + 28,
                            1,
                            1
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(ai) + 29,
                            1,
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(bi) + 27
                            )
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(bi) + 28,
                            1,
                            1
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(bi) + 29,
                            1,
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(ai) + 27
                            )
                        );
                        this.vars.RtImpulseVx =
                            0 -
                            (this.toNumber(this.vars.RtImpulseM00) *
                                this.toNumber(nx) +
                                this.toNumber(this.vars.RtImpulseM01) *
                                    this.toNumber(ny));
                        this.vars.RtImpulseVy =
                            0 -
                            (this.toNumber(this.vars.RtImpulseM10) *
                                this.toNumber(nx) +
                                this.toNumber(this.vars.RtImpulseM11) *
                                    this.toNumber(ny));
                        this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                            ai,
                            bi,
                            this.toNumber(this.vars.RtImpulseRad) -
                                this.toNumber(this.vars.RtImpulseD),
                            this.vars.RtImpulseVx,
                            this.vars.RtImpulseVy,
                            0
                        );
                        this.vars.RtImpulseManifolds.push(1);
                        this.vars.RtImpulseManifolds.push(
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(ai) + 7
                                )
                            ) +
                                this.toNumber(this.vars.RtImpulseVx) *
                                    this.toNumber(this.vars.RtImpulseRad)
                        );
                        this.vars.RtImpulseManifolds.push(
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(ai) + 8
                                )
                            ) +
                                this.toNumber(this.vars.RtImpulseVy) *
                                    this.toNumber(this.vars.RtImpulseRad)
                        );
                        this.vars.RtImpulseManifolds.push("");
                        this.vars.RtImpulseManifolds.push("");
                    }
                }
            }
        }
    }

    *RtImpulseAddCircleDensityFrictionIdOnlyRotate(
        x,
        y,
        rad,
        d,
        df,
        id,
        onlyrot
    ) {
        this.vars.RtImpulseRigidBody.push(1);
        this.vars.RtImpulseRigidBody.push(rad);
        this.vars.RtImpulseRigidBody.push(d);
        this.vars.RtImpulseUniqueid++;
        this.vars.RtImpulseRigidBody.push(this.vars.RtImpulseUniqueid);
        this.vars.RtImpulseRigidBody.push("");
        this.vars.RtImpulseRigidBody.push(rad);
        this.vars.RtImpulseRigidBody.push(rad);
        this.vars.RtImpulseRigidBody.push(x);
        this.vars.RtImpulseRigidBody.push(y);
        for (let i = 0; i < 6; i++) {
            this.vars.RtImpulseRigidBody.push(0);
        }
        this.vars.RtImpulseRigidBody.push(0);
        if (this.compare(d, 0) > 0) {
            this.vars.RtImpulseMass =
                3.14159 *
                (this.toNumber(rad) * this.toNumber(rad)) *
                this.toNumber(d);
            this.vars.RtImpulseRigidBody.push(this.vars.RtImpulseMass);
            this.vars.RtImpulseRigidBody.push(
                1 / this.toNumber(this.vars.RtImpulseMass)
            );
            this.vars.RtImpulseMass =
                this.toNumber(this.vars.RtImpulseMass) *
                (this.toNumber(rad) * this.toNumber(rad));
            this.vars.RtImpulseRigidBody.push(this.vars.RtImpulseMass);
            this.vars.RtImpulseRigidBody.push(
                1 / this.toNumber(this.vars.RtImpulseMass)
            );
        } else {
            for (let i = 0; i < 4; i++) {
                this.vars.RtImpulseRigidBody.push(0);
            }
        }
        this.warp(this.RtImpulseAddEndSfDfRtIdOnlyrotate)(
            0.4 * this.toNumber(df),
            0.3 * this.toNumber(df),
            0.3,
            id,
            onlyrot
        );
    }

    *RtImpulseGetfirstuniqueid() {
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        while (
            !(
                this.compare(
                    this.vars.RtImpulseBodyidx,
                    this.vars.RtImpulseRigidBody.length
                ) === 0
            )
        ) {
            break;
            if (
                this.compare(
                    this.vars.RtImpulseUniqueid,
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 3
                    )
                ) < 0
            ) {
                this.vars.RtImpulseUniqueid = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseBodyidx) + 3
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseUpdate() {
        this.vars.RtImpulseBody =
            this.vars.RtImpulseRigidBody.length /
                this.toNumber(this.vars.RtImpulseRb) -
            1;
        this.vars.RtImpulseManifolds = [];
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            this.vars.RtImpulseBody2idx =
                this.toNumber(this.vars.RtImpulseBodyidx) +
                this.toNumber(this.vars.RtImpulseRb);
            var t =
                (this.vars.RtImpulseRigidBody.length -
                    this.toNumber(this.vars.RtImpulseBody2idx)) /
                this.toNumber(this.vars.RtImpulseRb);
            for (let i = 0; i < t; i++) {
                if (
                    this.compare(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16
                        ),
                        0
                    ) > 0 ||
                    this.compare(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBody2idx) + 16
                        ),
                        0
                    ) > 0
                ) {
                    this.warp(this.RtImpulsePrepareForNewManifold)(
                        this.vars.RtImpulseBodyidx
                    );
                    this.warp(this.RtImpulsePrepareForNewManifold)(
                        this.vars.RtImpulseBody2idx
                    );
                    this.warp(this.RtImpulseNewManifold)(
                        this.vars.RtImpulseBodyidx,
                        this.vars.RtImpulseBody2idx
                    );
                }
                this.vars.RtImpulseBody2idx += this.toNumber(
                    this.vars.RtImpulseRb
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            this.warp(this.RtImpulseIntegrateForcesHalfDt)(
                this.vars.RtImpulseBodyidx,
                this.toNumber(this.vars.RtImpulseDt) / 2
            );
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
        this.vars.RtImpulseMidx = 0;
        var t =
            this.vars.RtImpulseManifolds.length /
            this.toNumber(this.vars.RtImpulseM);
        for (let i = 0; i < t; i++) {
            this.warp(this.RtImpulseInitializeManifold)(
                this.vars.RtImpulseMidx,
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(this.vars.RtImpulseMidx)
                ),
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(this.vars.RtImpulseMidx) + 1
                )
            );
            this.vars.RtImpulseMidx += this.toNumber(this.vars.RtImpulseM);
        }
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseIterations); i++) {
            this.vars.RtImpulseMidx = 0;
            var t =
                this.vars.RtImpulseManifolds.length /
                this.toNumber(this.vars.RtImpulseM);
            for (let i = 0; i < t; i++) {
                this.warp(this.RtImpulseApplyImpulse)(
                    this.vars.RtImpulseMidx,
                    this.itemOf(
                        this.vars.RtImpulseManifolds,
                        this.toNumber(this.vars.RtImpulseMidx)
                    ),
                    this.itemOf(
                        this.vars.RtImpulseManifolds,
                        this.toNumber(this.vars.RtImpulseMidx) + 1
                    )
                );
                this.vars.RtImpulseMidx += this.toNumber(this.vars.RtImpulseM);
            }
        }
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            this.warp(this.RtImpulseIntegrateVelocityDt)(
                this.vars.RtImpulseBodyidx,
                this.vars.RtImpulseDt
            );
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
        this.vars.RtImpulseMidx = 0;
        var t =
            this.vars.RtImpulseManifolds.length /
            this.toNumber(this.vars.RtImpulseM);
        for (let i = 0; i < t; i++) {
            this.warp(this.RtImpulseCorrectPositions)(
                this.vars.RtImpulseMidx,
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(this.vars.RtImpulseMidx)
                ),
                this.itemOf(
                    this.vars.RtImpulseManifolds,
                    this.toNumber(this.vars.RtImpulseMidx) + 1
                )
            );
            this.vars.RtImpulseMidx += this.toNumber(this.vars.RtImpulseM);
        }
        this.warp(this.RtImpulseClearForces)();
    }

    *RtImpulseSetupReferenceFaceIxy(m10, m11, vax, vay, vbx, vby, ix, iy) {
        this.vars.RtImpulseV1x =
            this.toNumber(m10) * this.toNumber(vax) -
            this.toNumber(m11) * this.toNumber(vay) +
            this.toNumber(ix);
        this.vars.RtImpulseV1y =
            this.toNumber(m10) * this.toNumber(vay) +
            this.toNumber(m11) * this.toNumber(vax) +
            this.toNumber(iy);
        this.vars.RtImpulseV2x =
            this.toNumber(m10) * this.toNumber(vbx) -
            this.toNumber(m11) * this.toNumber(vby) +
            this.toNumber(ix);
        this.vars.RtImpulseV2y =
            this.toNumber(m10) * this.toNumber(vby) +
            this.toNumber(m11) * this.toNumber(vbx) +
            this.toNumber(iy);
    }

    *RtImpulseFoundIncidentFaceIxy(m10, m11, vax, vay, vbx, vby, ix, iy) {
        this.vars.RtImpulseRax =
            this.toNumber(m10) * this.toNumber(vax) -
            this.toNumber(m11) * this.toNumber(vay) +
            this.toNumber(ix);
        this.vars.RtImpulseRay =
            this.toNumber(m10) * this.toNumber(vay) +
            this.toNumber(m11) * this.toNumber(vax) +
            this.toNumber(iy);
        this.vars.RtImpulseRbx =
            this.toNumber(m10) * this.toNumber(vbx) -
            this.toNumber(m11) * this.toNumber(vby) +
            this.toNumber(ix);
        this.vars.RtImpulseRby =
            this.toNumber(m10) * this.toNumber(vby) +
            this.toNumber(m11) * this.toNumber(vbx) +
            this.toNumber(iy);
    }

    *RtImpulseGetSupportAiNxNyWH(ai, nx, ny, w, h) {
        this.vars.RtImpulseIncx =
            this.toNumber(w) * this.toNumber(nx) +
            this.toNumber(h) * this.toNumber(ny);
        this.vars.RtImpulseIncy =
            this.toNumber(w) * this.toNumber(nx) -
            this.toNumber(h) * this.toNumber(ny);
        if (
            this.compare(
                Math.abs(this.toNumber(this.vars.RtImpulseIncx)),
                Math.abs(this.toNumber(this.vars.RtImpulseIncy))
            ) > 0
        ) {
            if (this.compare(this.vars.RtImpulseIncx, 0) > 0) {
                this.vars.RtImpulseIncx = w;
                this.vars.RtImpulseIncy = h;
            } else {
                this.vars.RtImpulseIncx = 0 - this.toNumber(w);
                this.vars.RtImpulseIncy = 0 - this.toNumber(h);
            }
        } else {
            if (this.compare(this.vars.RtImpulseIncy, 0) > 0) {
                this.vars.RtImpulseIncx = w;
                this.vars.RtImpulseIncy = 0 - this.toNumber(h);
            } else {
                this.vars.RtImpulseIncx = 0 - this.toNumber(w);
                this.vars.RtImpulseIncy = h;
            }
        }
    }

    *RtImpulseManifoldCToC(ai, bi) {
        this.vars.RtImpulseNx =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 7)
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 7)
            );
        this.vars.RtImpulseNy =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 8)
            ) -
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 8)
            );
        this.vars.RtImpulseD =
            this.toNumber(this.vars.RtImpulseNx) *
                this.toNumber(this.vars.RtImpulseNx) +
            this.toNumber(this.vars.RtImpulseNy) *
                this.toNumber(this.vars.RtImpulseNy);
        this.vars.RtImpulseR =
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(bi) + 1)
            ) +
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(ai) + 1)
            );
        if (
            this.compare(
                this.vars.RtImpulseD,
                this.toNumber(this.vars.RtImpulseR) *
                    this.toNumber(this.vars.RtImpulseR)
            ) < 0
        ) {
            this.vars.RtImpulseRigidBody.splice(this.toNumber(ai) + 28, 1, 1);
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(ai) + 29,
                1,
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(bi) + 27
                )
            );
            this.vars.RtImpulseRigidBody.splice(this.toNumber(bi) + 28, 1, 1);
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(bi) + 29,
                1,
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 27
                )
            );
            this.vars.RtImpulseD = Math.sqrt(
                this.toNumber(this.vars.RtImpulseD)
            );
            if (this.compare(this.vars.RtImpulseD, 0) > 0) {
                this.vars.RtImpulseNx =
                    this.toNumber(this.vars.RtImpulseNx) /
                    this.toNumber(this.vars.RtImpulseD);
                this.vars.RtImpulseNy =
                    this.toNumber(this.vars.RtImpulseNy) /
                    this.toNumber(this.vars.RtImpulseD);
                this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                    ai,
                    bi,
                    this.toNumber(this.vars.RtImpulseR) -
                        this.toNumber(this.vars.RtImpulseD),
                    this.vars.RtImpulseNx,
                    this.vars.RtImpulseNy,
                    0
                );
                this.vars.RtImpulseR = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 1
                );
                this.vars.RtImpulseManifolds.push(1);
                this.vars.RtImpulseManifolds.push(
                    this.toNumber(this.vars.RtImpulseNx) *
                        this.toNumber(this.vars.RtImpulseR) +
                        this.toNumber(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(ai) + 7
                            )
                        )
                );
                this.vars.RtImpulseManifolds.push(
                    this.toNumber(this.vars.RtImpulseNy) *
                        this.toNumber(this.vars.RtImpulseR) +
                        this.toNumber(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(ai) + 8
                            )
                        )
                );
            } else {
                this.warp(this.RtImpulseNewManifoldAiBiPenNorm)(
                    ai,
                    bi,
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 7
                    ),
                    1,
                    0,
                    0
                );
                this.vars.RtImpulseManifolds.push(1);
                this.vars.RtImpulseManifolds.push(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 7
                    )
                );
                this.vars.RtImpulseManifolds.push(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 8
                    )
                );
            }
            this.vars.RtImpulseManifolds.push("");
            this.vars.RtImpulseManifolds.push("");
        }
    }

    *RtImpulseNewManifoldAiBiPenNorm(ai, bi, pen, nx, ny, normalise) {
        this.vars.RtImpulseManifolds.push(ai);
        this.vars.RtImpulseManifolds.push(bi);
        this.vars.RtImpulseManifolds.push(pen);
        if (normalise) {
            this.vars.RtImpulseD = Math.sqrt(
                this.toNumber(nx) * this.toNumber(nx) +
                    this.toNumber(ny) * this.toNumber(ny)
            );
            if (this.compare(this.vars.RtImpulseD, 0.00001) > 0) {
                this.vars.RtImpulseManifolds.push(
                    this.toNumber(nx) / this.toNumber(this.vars.RtImpulseD)
                );
                this.vars.RtImpulseManifolds.push(
                    this.toNumber(ny) / this.toNumber(this.vars.RtImpulseD)
                );
            } else {
                this.vars.RtImpulseManifolds.push(nx);
                this.vars.RtImpulseManifolds.push(ny);
            }
        } else {
            this.vars.RtImpulseManifolds.push(nx);
            this.vars.RtImpulseManifolds.push(ny);
        }
        this.vars.RtImpulseManifolds.push(0);
        this.vars.RtImpulseManifolds.push(0);
        this.vars.RtImpulseManifolds.push(0);
    }

    *RtImpulseMatrixMul(x, y) {
        this.vars.RtImpulseVx =
            this.toNumber(this.vars.RtImpulseM00) * this.toNumber(x) +
            this.toNumber(this.vars.RtImpulseM01) * this.toNumber(y);
        this.vars.RtImpulseVy =
            this.toNumber(this.vars.RtImpulseM10) * this.toNumber(x) +
            this.toNumber(this.vars.RtImpulseM11) * this.toNumber(y);
    }

    *RtImpulseNewManifold(ai, bi) {
        if (
            this.compare(
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(ai) + 23
                ),
                this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(bi) + 25
                )
            ) > 0
        ) {
            null;
        } else {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bi) + 23
                    ),
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(ai) + 25
                    )
                ) > 0
            ) {
                null;
            } else {
                if (
                    this.compare(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(ai) + 24
                        ),
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bi) + 26
                        )
                    ) > 0
                ) {
                    null;
                } else {
                    if (
                        this.compare(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(bi) + 24
                            ),
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(ai) + 26
                            )
                        ) > 0
                    ) {
                        null;
                    } else {
                        if (
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(ai)
                                )
                            ) === 1
                        ) {
                            if (
                                this.toNumber(
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi)
                                    )
                                ) === 1
                            ) {
                                this.warp(this.RtImpulseManifoldCToC)(ai, bi);
                            } else {
                                this.warp(this.RtImpulseManifoldCToRWH)(
                                    ai,
                                    bi,
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi) + 5
                                    ),
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi) + 6
                                    )
                                );
                            }
                        } else {
                            if (
                                this.toNumber(
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi)
                                    )
                                ) === 1
                            ) {
                                this.warp(this.RtImpulseManifoldCToRWH)(
                                    bi,
                                    ai,
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(ai) + 5
                                    ),
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(ai) + 6
                                    )
                                );
                            } else {
                                this.vars.RtImpulseNx = this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(ai) + 5
                                );
                                this.vars.RtImpulseNy = this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(ai) + 6
                                );
                                this.warp(this.RtImpulseManifoldRToRAwAhBwBh)(
                                    ai,
                                    bi,
                                    this.vars.RtImpulseNx,
                                    this.vars.RtImpulseNy,
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi) + 5
                                    ),
                                    this.itemOf(
                                        this.vars.RtImpulseRigidBody,
                                        this.toNumber(bi) + 6
                                    )
                                );
                            }
                        }
                    }
                }
            }
        }
    }

    *RtImpulseLoadSceneData(data) {
        this.vars.RtImpulseTokens = data;
        this.vars.RtImpulseTokmax = this.toString(
            this.vars.RtImpulseTokens
        ).length;
        this.vars.RtImpulseToki = 0;
        this.vars.RtImpulseRigidBody = [];
        while (!(this.vars.RtImpulseToki > this.vars.RtImpulseTokmax)) {
            this.warp(this.RtImpulseReadToken)();
            this.vars.RtImpulseRigidBody.push(this.vars.RtImpulseToken);
        }
        this.warp(this.RtImpulsePrepScene)();
    }

    *RtImpulseReadToken() {
        this.vars.RtImpulseToken = "";
        while (
            !(
                this.vars.RtImpulseToki > this.vars.RtImpulseTokmax ||
                this.letterOf(
                    this.vars.RtImpulseTokens,
                    this.vars.RtImpulseToki - 1
                ) === " "
            )
        ) {
            this.vars.RtImpulseToken =
                this.toString(this.vars.RtImpulseToken) +
                this.letterOf(
                    this.vars.RtImpulseTokens,
                    this.vars.RtImpulseToki - 1
                );
            this.vars.RtImpulseToki++;
        }
        this.vars.RtImpulseToki++;
    }

    *RtImpulsePrepScene() {
        this.vars.RtImpulseToki = this.vars.RtImpulseRb;
        while (
            !(this.vars.RtImpulseToki === this.vars.RtImpulseRigidBody.length)
        ) {
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(this.vars.RtImpulseToki) + 3,
                1,
                this.vars.RtImpulseToki
            );
            this.vars.RtImpulseToki += this.toNumber(this.vars.RtImpulseRb);
        }
        for (let i = 0; i < this.vars.RtImpulseRigidBody.length; i++) {
            if (this.isNumeric(this.itemOf(this.vars.RtImpulseRigidBody, i))) {
                this.vars.RtImpulseRigidBody.splice(
                    i,
                    1,
                    this.toNumber(this.itemOf(this.vars.RtImpulseRigidBody, i))
                );
            }
        }
        if (this.itemOf(this.vars.RtImpulseRigidBody, 9) === " ") {
            this.vars.RtImpulseRigidBody.splice(9, 1, 1);
            this.vars.RtImpulseRigidBody.splice(10, 1, 1);
            this.vars.RtImpulseRigidBody.splice(11, 1, 2);
        }
        yield* this.RtImpulseGetfirstuniqueid();
    }

    *RtImpulseSceneData() {
        this.vars.RtSceneDataOut = this.vars.RtImpulseRigidBody.join(" ");
    }

    *RtImpulseAddVelocityToObjectWithIdVelocityXVelocityY(id, fx, fy) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 9,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 9
                        )
                    ) + this.toNumber(fx)
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 10,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 10
                        )
                    ) + this.toNumber(fy)
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetPenetrationCorrectionTo(n) {
        this.vars.RtImpulsePenetrationCorrection = this.toNumber(n) / 100;
    }

    *RtImpulseSetGravityToXY(gx, gy) {
        this.vars.RtImpulseGravityX = gx;
        this.vars.RtImpulseGravityY = gy;
        this.vars.RtImpulseResting =
            this.toNumber(this.vars.RtImpulseGravityY) *
                this.toNumber(this.vars.RtImpulseGravityY) *
                this.toNumber(this.vars.RtImpulseDt) *
                this.toNumber(this.vars.RtImpulseDt) +
            25;
    }

    *RtImpulseSetQualityTo(n) {
        this.vars.RtImpulseIterations = n;
    }

    *RtImpulseSetTimeStepScaleTo(n) {
        this.vars.RtImpulseDt = (1 / 30) * this.toNumber(n);
        this.vars.RtImpulseResting =
            this.toNumber(this.vars.RtImpulseGravityY) *
                this.toNumber(this.vars.RtImpulseGravityY) *
                this.toNumber(this.vars.RtImpulseDt) *
                this.toNumber(this.vars.RtImpulseDt) +
            2;
    }

    *RtImpulseStep() {
        yield* this.RtImpulseUpdate();
    }

    *RtImpulseDeleteObjectWithId(id) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                for (let i = 0; i < this.toNumber(this.vars.RtImpulseRb); i++) {
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx),
                        1
                    );
                }
            } else {
                this.vars.RtImpulseBodyidx += this.toNumber(
                    this.vars.RtImpulseRb
                );
            }
        }
    }

    *RtImpulseAddAngularVelocityToObjectWithIdVelocity(id, v) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 13,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 13
                        )
                    ) + this.toNumber(v)
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseGetDataOfObjectWithId(id) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseRetrievedIdx = "";
        this.vars.RtImpulseRetrievedId = "";
        this.vars.RtImpulseRetrievedWidth = "";
        this.vars.RtImpulseRetrievedHeight = "";
        this.vars.RtImpulseRetrievedRotation = "";
        this.vars.RtImpulseRetrievedType = "";
        this.vars.RtImpulseRetrievedX = "";
        this.vars.RtImpulseRetrievedY = "";
        this.vars.RtImpulseRetrievedMass = "";
        this.vars.RtImpulseRetrievedCollided = "";
        this.vars.RtImpulseRetrievedLastcollidedid = "";
        this.vars.RtImpulseRetrievedVx = "";
        this.vars.RtImpulseRetrievedVy = "";
        this.vars.RtImpulseRetrievedVr = "";
        this.vars.RtImpulseRetrievedRadius = "";
        this.vars.RtImpulseRetrievedDensity = "";
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRetrievedIdx = this.vars.RtImpulseBodyidx;
                this.vars.RtImpulseRetrievedId = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 27
                );
                this.vars.RtImpulseRetrievedWidth =
                    2 *
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseRetrievedIdx) + 5
                        )
                    );
                this.vars.RtImpulseRetrievedHeight =
                    2 *
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseRetrievedIdx) + 6
                        )
                    );
                this.vars.RtImpulseRetrievedRotation = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 15
                );
                this.vars.RtImpulseRetrievedType = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx)
                );
                this.vars.RtImpulseRetrievedX = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 7
                );
                this.vars.RtImpulseRetrievedY = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 8
                );
                this.vars.RtImpulseRetrievedMass = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 16
                );
                this.vars.RtImpulseRetrievedCollided = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 28
                );
                this.vars.RtImpulseRetrievedLastcollidedid = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 29
                );
                this.vars.RtImpulseRetrievedVx = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 9
                );
                this.vars.RtImpulseRetrievedVy = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 10
                );
                this.vars.RtImpulseRetrievedVr = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 13
                );
                this.vars.RtImpulseRetrievedRadius = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 1
                );
                this.vars.RtImpulseRetrievedDensity = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseRetrievedIdx) + 2
                );
                return;
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetPositionOfObjectWithIdToXY(id, x, y) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 7,
                    1,
                    x
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 8,
                    1,
                    y
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetYPositionOfObjectWithIdTo(id, y) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 8,
                    1,
                    y
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseChangeYPositionOfObjectWithIdBy(id, y) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 8,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 8
                        )
                    ) + this.toNumber(y)
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseUpdateBody() {
        this.vars.RtImpulseBody =
            this.vars.RtImpulseRigidBody.length /
                this.toNumber(this.vars.RtImpulseRb) -
            1;
    }

    *RtImpulseClearForces() {
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(this.vars.RtImpulseBodyidx) + 11,
                1,
                0
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(this.vars.RtImpulseBodyidx) + 12,
                1,
                0
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(this.vars.RtImpulseBodyidx) + 14,
                1,
                0
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(this.vars.RtImpulseBodyidx) + 31,
                1,
                0
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(this.vars.RtImpulseBodyidx) + 32,
                1,
                0
            );
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseOfObjects() {
        this.vars.RtImpulseBody =
            this.vars.RtImpulseRigidBody.length /
                this.toNumber(this.vars.RtImpulseRb) -
            1;
    }

    *RtImpulseSetRotationOfObjectWithIdTo(id, rot) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 15,
                    1,
                    rot
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetXPositionOfObjectWithIdTo(id, x) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 7,
                    1,
                    x
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulsePrepareForNewManifold(idx) {
        if (
            this.toNumber(
                this.itemOf(this.vars.RtImpulseRigidBody, this.toNumber(idx))
            ) === 1
        ) {
            this.vars.RtImpulseNx = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 7
            );
            this.vars.RtImpulseNy = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 8
            );
            this.vars.RtImpulseRad = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 1
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 23,
                1,
                this.toNumber(this.vars.RtImpulseNx) -
                    this.toNumber(this.vars.RtImpulseRad)
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 24,
                1,
                this.toNumber(this.vars.RtImpulseNy) -
                    this.toNumber(this.vars.RtImpulseRad)
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 25,
                1,
                this.toNumber(this.vars.RtImpulseNx) +
                    this.toNumber(this.vars.RtImpulseRad)
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 26,
                1,
                this.toNumber(this.vars.RtImpulseNy) +
                    this.toNumber(this.vars.RtImpulseRad)
            );
        } else {
            this.vars.RtImpulseNx = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 7
            );
            this.vars.RtImpulseNy = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 8
            );
            this.vars.RtImpulseRax = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 5
            );
            this.vars.RtImpulseRay = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 6
            );
            this.vars.RtImpulseOri = this.itemOf(
                this.vars.RtImpulseRigidBody,
                this.toNumber(idx) + 15
            );
            this.vars.RtImpulseT1 = Math.cos(
                this.degToRad(this.toNumber(this.vars.RtImpulseOri))
            );
            this.vars.RtImpulseT2 = Math.sin(
                this.degToRad(this.toNumber(this.vars.RtImpulseOri))
            );
            this.vars.RtImpulseRbx =
                Math.abs(
                    this.toNumber(this.vars.RtImpulseRax) *
                        this.toNumber(this.vars.RtImpulseT1)
                ) +
                Math.abs(
                    this.toNumber(this.vars.RtImpulseRay) *
                        this.toNumber(this.vars.RtImpulseT2)
                );
            this.vars.RtImpulseRby =
                Math.abs(
                    this.toNumber(this.vars.RtImpulseRax) *
                        this.toNumber(this.vars.RtImpulseT2)
                ) +
                Math.abs(
                    this.toNumber(this.vars.RtImpulseRay) *
                        this.toNumber(this.vars.RtImpulseT1)
                );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 23,
                1,
                this.toNumber(this.vars.RtImpulseNx) -
                    this.toNumber(this.vars.RtImpulseRbx)
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 24,
                1,
                this.toNumber(this.vars.RtImpulseNy) -
                    this.toNumber(this.vars.RtImpulseRby)
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 25,
                1,
                this.toNumber(this.vars.RtImpulseNx) +
                    this.toNumber(this.vars.RtImpulseRbx)
            );
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(idx) + 26,
                1,
                this.toNumber(this.vars.RtImpulseNy) +
                    this.toNumber(this.vars.RtImpulseRby)
            );
        }
    }

    *RtImpulseAddRectangleDensityAngFrictionIdOnlyRotate(
        x,
        y,
        sx,
        sy,
        d,
        ang,
        df,
        id,
        onlyrot
    ) {
        this.vars.RtImpulseRigidBody.push(2);
        this.vars.RtImpulseRigidBody.push(
            Math.sqrt(
                (this.toNumber(sx) / 2) * (this.toNumber(sx) / 2) +
                    (this.toNumber(sy) / 2) * (this.toNumber(sy) / 2)
            )
        );
        this.vars.RtImpulseRigidBody.push(d);
        this.vars.RtImpulseUniqueid++;
        this.vars.RtImpulseRigidBody.push(this.vars.RtImpulseUniqueid);
        this.vars.RtImpulseRigidBody.push("");
        this.vars.RtImpulseRigidBody.push(this.toNumber(sx) / 2);
        this.vars.RtImpulseRigidBody.push(this.toNumber(sy) / 2);
        this.vars.RtImpulseRigidBody.push(x);
        this.vars.RtImpulseRigidBody.push(y);
        for (let i = 0; i < 6; i++) {
            this.vars.RtImpulseRigidBody.push(0);
        }
        this.vars.RtImpulseRigidBody.push(ang);
        if (this.compare(d, 0) > 0) {
            this.vars.RtImpulseMass =
                (this.toNumber(sx) / 2) *
                (this.toNumber(sy) / 2) *
                4 *
                this.toNumber(d);
            this.vars.RtImpulseRigidBody.push(this.vars.RtImpulseMass);
            this.vars.RtImpulseRigidBody.push(
                1 / this.toNumber(this.vars.RtImpulseMass)
            );
            this.vars.RtImpulseMass =
                this.toNumber(this.vars.RtImpulseMass) *
                ((this.toNumber(sx) / 2) * (this.toNumber(sy) / 2));
            this.vars.RtImpulseRigidBody.push(this.vars.RtImpulseMass);
            this.vars.RtImpulseRigidBody.push(
                1 / this.toNumber(this.vars.RtImpulseMass)
            );
        } else {
            for (let i = 0; i < 4; i++) {
                this.vars.RtImpulseRigidBody.push(0);
            }
        }
        this.warp(this.RtImpulseAddEndSfDfRtIdOnlyrotate)(
            0.4 * this.toNumber(df),
            0.3 * this.toNumber(df),
            0.2,
            id,
            onlyrot
        );
    }

    *RtImpulseSetVelocityForObjectWithIdVelocityXVelocityY(id, vx, vy) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 9,
                    1,
                    vx
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 10,
                    1,
                    vy
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseIntegrateVelocityDt(bodyidx, dt) {
        this.vars.RtImpulseMass = this.itemOf(
            this.vars.RtImpulseRigidBody,
            this.toNumber(bodyidx) + 17
        );
        if (this.compare(this.vars.RtImpulseMass, 0) > 0) {
            if (
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bodyidx) + 30
                    )
                ) === 1
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(bodyidx) + 9,
                    1,
                    0
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(bodyidx) + 10,
                    1,
                    0
                );
            } else {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(bodyidx) + 7,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bodyidx) + 7
                        )
                    ) +
                        this.toNumber(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(bodyidx) + 9
                            )
                        ) *
                            this.toNumber(dt)
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(bodyidx) + 8,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(bodyidx) + 8
                        )
                    ) +
                        this.toNumber(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(bodyidx) + 10
                            )
                        ) *
                            this.toNumber(dt)
                );
            }
            this.vars.RtImpulseRigidBody.splice(
                this.toNumber(bodyidx) + 15,
                1,
                this.toNumber(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(bodyidx) + 15
                    )
                ) +
                    this.toNumber(this.vars.RtImpulseRadtodeg) *
                        (this.toNumber(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(bodyidx) + 13
                            )
                        ) *
                            this.toNumber(dt))
            );
            this.warp(this.RtImpulseIntegrateForcesHalfDt)(
                bodyidx,
                this.toNumber(dt) / 2
            );
        }
    }

    *RtImpulseSetAngularVelocityOfObjectWithIdVelocity(id, v) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 13,
                    1,
                    v
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetIdOfObjectWithIdTo(od, id) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    od
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 27,
                    1,
                    id
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseChangeXPositionOfObjectWithIdBy(id, x) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 7,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 7
                        )
                    ) + this.toNumber(x)
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseObjectWithIdExists(id) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyWithIdExists = 0;
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseBodyWithIdExists = 1;
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseObjectIds() {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtOut = "";
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (this.vars.RtOut === "") {
                this.vars.RtOut = this.itemOf(
                    this.vars.RtImpulseRigidBody,
                    this.toNumber(this.vars.RtImpulseBodyidx) + 27
                );
            } else {
                this.vars.RtOut =
                    this.toString(this.vars.RtOut) +
                    ("," +
                        this.toString(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(this.vars.RtImpulseBodyidx) + 27
                            )
                        ));
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetWidthOfObjectWithIdTo(id, w) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                if (
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx)
                        )
                    ) === 1
                ) {
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 1,
                        1,
                        this.toNumber(w) / 2
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 5,
                        1,
                        this.toNumber(w) / 2
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 6,
                        1,
                        this.toNumber(w) / 2
                    );
                    if (
                        this.compare(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(this.vars.RtImpulseBodyidx) + 2
                            ),
                            0
                        ) > 0
                    ) {
                        this.vars.RtImpulseMass =
                            3.14159 *
                            ((this.toNumber(w) / 2) * (this.toNumber(w) / 2)) *
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(this.vars.RtImpulseBodyidx) +
                                        2
                                )
                            );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                        this.vars.RtImpulseMass =
                            this.toNumber(this.vars.RtImpulseMass) *
                            ((this.toNumber(w) / 2) * (this.toNumber(w) / 2));
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            0
                        );
                    }
                } else {
                    this.vars.RtImpulseNy = this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 6
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 1,
                        1,
                        Math.sqrt(
                            (this.toNumber(w) / 2) * (this.toNumber(w) / 2) +
                                this.toNumber(this.vars.RtImpulseNy) *
                                    this.toNumber(this.vars.RtImpulseNy)
                        )
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 5,
                        1,
                        this.toNumber(w) / 2
                    );
                    if (
                        this.compare(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(this.vars.RtImpulseBodyidx) + 2
                            ),
                            0
                        ) > 0
                    ) {
                        this.vars.RtImpulseMass =
                            3.14159 *
                            ((this.toNumber(w) / 2) *
                                this.toNumber(this.vars.RtImpulseNy)) *
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(this.vars.RtImpulseBodyidx) +
                                        2
                                )
                            );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                        this.vars.RtImpulseMass =
                            this.toNumber(this.vars.RtImpulseMass) *
                            ((this.toNumber(w) / 2) *
                                this.toNumber(this.vars.RtImpulseNy));
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            0
                        );
                    }
                }
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetHeightOfObjectWithIdTo(id, w) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                if (
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx)
                        )
                    ) === 1
                ) {
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 1,
                        1,
                        this.toNumber(w) / 2
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 5,
                        1,
                        this.toNumber(w) / 2
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 6,
                        1,
                        this.toNumber(w) / 2
                    );
                    if (
                        this.compare(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(this.vars.RtImpulseBodyidx) + 2
                            ),
                            0
                        ) > 0
                    ) {
                        this.vars.RtImpulseMass =
                            3.14159 *
                            ((this.toNumber(w) / 2) * (this.toNumber(w) / 2)) *
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(this.vars.RtImpulseBodyidx) +
                                        2
                                )
                            );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                        this.vars.RtImpulseMass =
                            this.toNumber(this.vars.RtImpulseMass) *
                            ((this.toNumber(w) / 2) * (this.toNumber(w) / 2));
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            0
                        );
                    }
                } else {
                    this.vars.RtImpulseNx = this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 5
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 1,
                        1,
                        Math.sqrt(
                            (this.toNumber(w) / 2) * (this.toNumber(w) / 2) +
                                this.toNumber(this.vars.RtImpulseNx) *
                                    this.toNumber(this.vars.RtImpulseNx)
                        )
                    );
                    this.vars.RtImpulseRigidBody.splice(
                        this.toNumber(this.vars.RtImpulseBodyidx) + 6,
                        1,
                        this.toNumber(w) / 2
                    );
                    if (
                        this.compare(
                            this.itemOf(
                                this.vars.RtImpulseRigidBody,
                                this.toNumber(this.vars.RtImpulseBodyidx) + 2
                            ),
                            0
                        ) > 0
                    ) {
                        this.vars.RtImpulseMass =
                            3.14159 *
                            ((this.toNumber(w) / 2) *
                                this.toNumber(this.vars.RtImpulseNx)) *
                            this.toNumber(
                                this.itemOf(
                                    this.vars.RtImpulseRigidBody,
                                    this.toNumber(this.vars.RtImpulseBodyidx) +
                                        2
                                )
                            );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                        this.vars.RtImpulseMass =
                            this.toNumber(this.vars.RtImpulseMass) *
                            ((this.toNumber(w) / 2) *
                                this.toNumber(this.vars.RtImpulseNx));
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            0
                        );
                    }
                }
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseSetDensityOfObjectWithIdTo(id, d) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                if (
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx)
                        )
                    ) === 1
                ) {
                    if (this.compare(d, 0) > 0) {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 2,
                            1,
                            d
                        );
                        this.vars.RtImpulseRad = this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 1
                        );
                        this.vars.RtImpulseMass =
                            3.14159 *
                            (this.toNumber(this.vars.RtImpulseRad) *
                                this.toNumber(this.vars.RtImpulseRad)) *
                            this.toNumber(d);
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                        this.vars.RtImpulseMass =
                            this.toNumber(this.vars.RtImpulseMass) *
                            (this.toNumber(this.vars.RtImpulseRad) *
                                this.toNumber(this.vars.RtImpulseRad));
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 2,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            0
                        );
                    }
                } else {
                    if (this.compare(d, 0) > 0) {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 2,
                            1,
                            d
                        );
                        this.vars.RtImpulseNx = this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 5
                        );
                        this.vars.RtImpulseNy = this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 6
                        );
                        this.vars.RtImpulseMass =
                            3.14159 *
                            (this.toNumber(this.vars.RtImpulseNy) *
                                this.toNumber(this.vars.RtImpulseNx)) *
                            this.toNumber(d);
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                        this.vars.RtImpulseMass =
                            this.toNumber(this.vars.RtImpulseMass) *
                            (this.toNumber(this.vars.RtImpulseNy) *
                                this.toNumber(this.vars.RtImpulseNx));
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            this.vars.RtImpulseMass
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            1 / this.toNumber(this.vars.RtImpulseMass)
                        );
                    } else {
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 2,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 16,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 17,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 18,
                            1,
                            0
                        );
                        this.vars.RtImpulseRigidBody.splice(
                            this.toNumber(this.vars.RtImpulseBodyidx) + 19,
                            1,
                            0
                        );
                    }
                }
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }

    *RtImpulseAddForceToObjectWithIdForceXForceY(id, x, y) {
        this.warp(this.RtImpulseUpdateBody)();
        this.vars.RtImpulseBodyidx = this.vars.RtImpulseRb;
        for (let i = 0; i < this.toNumber(this.vars.RtImpulseBody); i++) {
            if (
                this.compare(
                    this.itemOf(
                        this.vars.RtImpulseRigidBody,
                        this.toNumber(this.vars.RtImpulseBodyidx) + 27
                    ),
                    id
                ) === 0
            ) {
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 31,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 31
                        )
                    ) + this.toNumber(x)
                );
                this.vars.RtImpulseRigidBody.splice(
                    this.toNumber(this.vars.RtImpulseBodyidx) + 32,
                    1,
                    this.toNumber(
                        this.itemOf(
                            this.vars.RtImpulseRigidBody,
                            this.toNumber(this.vars.RtImpulseBodyidx) + 32
                        )
                    ) + this.toNumber(y)
                );
            }
            this.vars.RtImpulseBodyidx += this.toNumber(this.vars.RtImpulseRb);
        }
    }
}

module.exports = ImpulseExtension;
