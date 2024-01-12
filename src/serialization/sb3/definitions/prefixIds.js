const path = require("path");
const fs = require("fs");
console.log("Usage: prefix.js prefix infile.json outfile.json")
if (typeof process.argv[3] !== "string") {
    throw new Error("Invalid input file name.");
}
if (typeof process.argv[4] !== "string") {
    throw new Error("Invalid output file name.");
}
if (typeof process.argv[2] !== "string") {
    throw new Error("Invalid prefix.");
}
var prefix = process.argv[2];
fs.readFile(path.resolve(__dirname, process.argv[3]), 'UTF-8', (err, data)=>{
    if (err) {
        throw new Error(err);
    }
    var blocks = JSON.parse(data);
    var prefixedBlocks = {};
    for (const blockId of Object.keys(blocks)) {
        const block = blocks[blockId];
        prefixedBlocks[prefix + blockId] = block;
        if (block.parent) {
            prefixedBlocks[prefix + blockId].parent = prefix + block.parent;
        }
        if (block.next) {
            prefixedBlocks[prefix + blockId].next = prefix + block.next;
        }
        for (const inputKey of Object.keys(block.inputs)) {
            var input = block.inputs[inputKey];
            for (let i = 1; i < input.length; i++) {
                const inputValue = input[i];
                if (typeof inputValue === "string") {
                    input[i] = prefix + inputValue;
                }
            }
        }
    }
    var out = JSON.stringify(prefixedBlocks);
    fs.writeFile(path.resolve(__dirname, process.argv[4]), out, (err)=>{
        if (err) {
            throw new Error(err);
        } else {
            console.log("Done! And nothing blew up!")
        }
    });
});