// Arays denote boolean reporters.
var reporterPatches = {
    "operator_power": "$rt. %s ^ %s",
    "operator_min": "$rt.min %s %s",
    "operator_max": "$rt.max %s %s",
    "operator_if": "$rt. %b ? %s : %s",
    "operator_replace": "$rt.replace %s with %s in %s",
    "operator_newline": "$rt.new line",
    "operator_hex": "$rt. %s to hexadecimal",
    "sensing_color": "$rt.color at my position",
    "network_message": "$rt.received message",
    "operator_fastpower": "$rt. %s ** %s",
    "operator_substring": "$rt.letters %s to %s of %s",
    "operator_startswith": ["$rt. %s starts with %s"],
    "operator_endswith": ["$rt. %s ends with %s"],
}
var reporterPatchesBasic = {
    "operator_true": "operator_not",
    "operator_false": "operator_and"
}

module.exports = { reporterPatches: reporterPatches, reporterPatchesBasic: reporterPatchesBasic }