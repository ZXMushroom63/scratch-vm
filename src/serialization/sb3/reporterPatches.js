// Arrays denote boolean reporters.
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
    "impulse_objectcount": "$rt.impulse.# of objects",
    "impulse_objectids": "$rt.impulse.object ids",
    "impulse_objectexists": ["$rt.impulse.object with id %s exists?"],
    "impulse_scenedata": "$rt.impulse.Scene Data",
    "operator_else": "$rt. %s ?? %s",
    "operator_clamp": "$rt.clamp %s %s %s",
}
var reporterPatchesBasic = {
    "operator_true": "operator_not",
    "operator_false": "operator_and"
}
var reporterPatchesVariable = {
    //"sensing_loudness": ["rt_out"] <-- Would be a boolean
    "impulse_xgravity": "rt_impulse_gravity_x",
    "impulse_ygravity": "rt_impulse_gravity_y",
    "impulse_timestep": "rt_impulse_tscale",
    "impulse_quality": "rt_impulse_iterations",
    "impulse_penetrationcorrection": "rt_impulse_pscale",
    "impulse_retrievedbodytype": "rt_impulse_retrieved_type",
    "impulse_retrievedbodyid": "rt_impulse_retrieved_id",
    "impulse_retrievedbodyx": "rt_impulse_retrieved_x",
    "impulse_retrievedbodyy": "rt_impulse_retrieved_y",
    "impulse_retrievedbodyvx": "rt_impulse_retrieved_vx",
    "impulse_retrievedbodyvy": "rt_impulse_retrieved_vy",
    "impulse_retrievedbodywidth": "rt_impulse_retrieved_width",
    "impulse_retrievedbodyheight": "rt_impulse_retrieved_height",
    "impulse_retrievedbodyrotation": "rt_impulse_retrieved_rotation",
    "impulse_retrievedbodyvr": "rt_impulse_retrieved_vr",
    "impulse_retrievedbodyradius": "rt_impulse_retrieved_radius",
    "impulse_retrievedbodymass": "rt_impulse_retrieved_mass",
    "impulse_retrievedbodydensity": "rt_impulse_retrieved_density",
    "impulse_retrievedbodycollided": ["rt_impulse_retrieved_collided"],
    "impulse_retrievedbodylastcollidedid": "rt_impulse_retrieved_lastcollidedid",
}

module.exports = { reporterPatches: reporterPatches, reporterPatchesBasic: reporterPatchesBasic, reporterPatchesVariable: reporterPatchesVariable }