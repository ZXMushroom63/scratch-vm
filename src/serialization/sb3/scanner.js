/**
 * @fileoverview
 * Scans for issues in Scratch++'s compiled code.
 */

module.exports = {
    scan: function scan(project) {
        function checkExists(blocks, blockId) {
            return blocks[blockId] || false;
        }
        var data = JSON.parse(project);
        var good = true;
        var offenders = [];
        /*/
        [
            {
                missingId: "example_missing_id",
                referencedById: "example_referencer_id",
                referencedByObject: Block,
                sprite: "sprite_name",
                isInStage: bIsInStage
            }
        ]
        /*/


        data.targets.forEach((target) => {
            var blockIds = Object.keys(target.blocks);
            blockIds.forEach((blockId) => {
                var targetBlock = target.blocks[blockId];

                //Skip shadows
                if (targetBlock.shadow) {
                    return;
                }

                //Check block parents
                if (targetBlock.parent && !checkExists(target.blocks, targetBlock.parent)) {
                    offenders.push({
                        missingId: targetBlock.parent,
                        referencedById: blockId,
                        referencedByObject: targetBlock,
                        sprite: target.name,
                        isInStage: target.isStage
                    });
                    good = false;
                }

                //Check block children
                if (targetBlock.next && !checkExists(target.blocks, targetBlock.next)) {
                    offenders.push({
                        missingId: targetBlock.next,
                        referencedById: blockId,
                        referencedByObject: targetBlock,
                        sprite: target.name,
                        isInStage: target.isStage
                    });
                    good = false;
                }

                //Check block inputs
                for (const input of Object.values(targetBlock.inputs)) {
                    for (let i = 1; i < input.length; i++) {
                        const inputValue = input[i];
                        if (typeof inputValue === "string" && inputValue && !checkExists(target.blocks, inputValue)) {
                            offenders.push({
                                missingId: inputValue,
                                referencedById: blockId,
                                referencedByObject: targetBlock,
                                sprite: target.name,
                                isInStage: target.isStage
                            });
                            good = false;
                        }
                    }
                }
            });
        });

        /*/Outputs:
        {
            offenders: Offender[],
            allGood: bIsAllGood
        }
        /*/
        return {
            allGood: good,
            offenders: offenders
        }
    },
    scanLocal: function scanLocal(blockdef) {
        function checkExists(bd, blockId) {
            return bd[blockId] || false;
        }
        var data = JSON.parse(blockdef);
        var good = true;
        var offenders = [];
        /*/
        [
            {
                missingId: "example_missing_id",
                referencedById: "example_referencer_id",
                referencedByObject: Block,
                sprite: "sprite_name",
                isInStage: bIsInStage
            }
        ]
        /*/

        var blockIds = Object.keys(data);
        blockIds.forEach((blockId) => {
            var targetBlock = data[blockId];

            //Skip shadows
            if (targetBlock.shadow) {
                return;
            }

            //Check block parents
            if (targetBlock.parent && !checkExists(data, targetBlock.parent)) {
                offenders.push({
                    missingId: targetBlock.parent,
                    referencedById: blockId,
                    referencedByObject: targetBlock,
                    sprite: target.name,
                    isInStage: target.isStage
                });
                good = false;
            }

            //Check block children
            if (targetBlock.next && !checkExists(data, targetBlock.next)) {
                offenders.push({
                    missingId: targetBlock.next,
                    referencedById: blockId,
                    referencedByObject: targetBlock,
                    sprite: target.name,
                    isInStage: target.isStage
                });
                good = false;
            }

            //Check block inputs
            for (const input of Object.values(targetBlock.inputs)) {
                for (let i = 1; i < input.length; i++) {
                    const inputValue = input[i];
                    if (typeof inputValue === "string" && inputValue && !checkExists(data, inputValue)) {
                        offenders.push({
                            missingId: inputValue,
                            referencedById: blockId,
                            referencedByObject: targetBlock,
                            sprite: target.name,
                            isInStage: target.isStage
                        });
                        good = false;
                    }
                }
            }
        });

        /*/Outputs:
        {
            offenders: Offender[],
            allGood: bIsAllGood
        }
        /*/
        return {
            allGood: good,
            offenders: offenders
        }
    }
};
