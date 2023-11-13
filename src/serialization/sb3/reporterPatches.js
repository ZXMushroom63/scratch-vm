var reporterPatches = {
    "operator_power": "$rt. %s ^ %s",
    "operator_min": "$rt.min %s %s",
    "operator_max": "$rt.max %s %s",
    "operator_if": "$rt. %b ? %s : %s",
    "operator_replace": "$rt.replace %s with %s in %s",
    "operator_newline": "$rt.new line",
    "operator_hex": "$rt. %s to hexadecimal",
    "sensing_color": "$rt.color at my position",
}
var reporterPatchesBasic = {
    "operator_true": "operator_not",
    "operator_false": "operator_and"
}

module.exports = { reporterPatches: reporterPatches, reporterPatchesBasic: reporterPatchesBasic }