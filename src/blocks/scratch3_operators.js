const Cast = require('../util/cast.js');
const MathUtil = require('../util/math-util.js');

class Scratch3OperatorsBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives() {
        return {
            operator_add: this.add,
            operator_subtract: this.subtract,
            operator_multiply: this.multiply,
            operator_divide: this.divide,
            operator_power: this.power,
            operator_fastpower: this.fastpower,
            operator_lt: this.lt,
            operator_equals: this.equals,
            operator_gt: this.gt,
            operator_and: this.and,
            operator_or: this.or,
            operator_not: this.not,
            operator_true: this.true,
            operator_false: this.false,
            operator_random: this.random,
            operator_join: this.join,
            operator_newline: this.newline,
            operator_letter_of: this.letterOf,
            operator_substring: this.substring,
            operator_length: this.length,
            operator_contains: this.contains,
            operator_startswith: this.startsWith,
            operator_endswith: this.endsWith,
            operator_replace: this.replace,
            operator_if: this.if,
            operator_min: this.min,
            operator_max: this.max,
            operator_mod: this.mod,
            operator_hex: this.hex,
            operator_round: this.round,
            operator_mathop: this.mathop
        };
    }

    add(args) {
        return Cast.toNumber(args.NUM1) + Cast.toNumber(args.NUM2);
    }

    subtract(args) {
        return Cast.toNumber(args.NUM1) - Cast.toNumber(args.NUM2);
    }

    multiply(args) {
        return Cast.toNumber(args.NUM1) * Cast.toNumber(args.NUM2);
    }

    divide(args) {
        return Cast.toNumber(args.NUM1) / Cast.toNumber(args.NUM2);
    }

    power(args) {
        return Math.pow(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2));
    }

    lt(args) {
        return Cast.compare(args.OPERAND1, args.OPERAND2) < 0;
    }

    equals(args) {
        return Cast.compare(args.OPERAND1, args.OPERAND2) === 0;
    }

    gt(args) {
        return Cast.compare(args.OPERAND1, args.OPERAND2) > 0;
    }

    and(args) {
        return Cast.toBoolean(args.OPERAND1) && Cast.toBoolean(args.OPERAND2);
    }

    or(args) {
        return Cast.toBoolean(args.OPERAND1) || Cast.toBoolean(args.OPERAND2);
    }

    not(args) {
        return !Cast.toBoolean(args.OPERAND);
    }

    true(args) {
        return true;
    }

    false(args) {
        return false
    }

    random(args) {
        const nFrom = Cast.toNumber(args.FROM);
        const nTo = Cast.toNumber(args.TO);
        const low = nFrom <= nTo ? nFrom : nTo;
        const high = nFrom <= nTo ? nTo : nFrom;
        if (low === high) return low;
        // If both arguments are ints, truncate the result to an int.
        if (Cast.isInt(args.FROM) && Cast.isInt(args.TO)) {
            return low + Math.floor(Math.random() * ((high + 1) - low));
        }
        return (Math.random() * (high - low)) + low;
    }

    join(args) {
        return Cast.toString(args.STRING1) + Cast.toString(args.STRING2);
    }

    newline(args) {
        return "\n";
    }

    letterOf(args) {
        const index = Cast.toNumber(args.LETTER) - 1;
        const str = Cast.toString(args.STRING);
        // Out of bounds?
        if (index < 0 || index >= str.length) {
            return '';
        }
        return str.charAt(index);
    }

    substring(args) {
        const x = Math.min(Cast.toNumber(args.LETTER1) - 1, Cast.toNumber(args.LETTER2) - 1);
        const y = Math.max(Cast.toNumber(args.LETTER1) - 1, Cast.toNumber(args.LETTER2) - 1);
        const string = Cast.toString(args.STRING);
        //JavaScripts substring implementation is annoying.
        var answer = "";
        for (let i = 0; i < y - x; i++) {
            answer = answer + (string[x + i] || "");
        }

        return answer;
    }

    length(args) {
        return Cast.toString(args.STRING).length;
    }

    contains(args) {
        const format = function (string) {
            return Cast.toString(string).toLowerCase();
        };
        return format(args.STRING1).includes(format(args.STRING2));
    }

    startsWith(args) {
        const format = function (string) {
            return Cast.toString(string).toLowerCase();
        };
        return format(args.STRING1).startsWith(format(args.STRING2));
    }

    endsWith(args) {
        const format = function (string) {
            return Cast.toString(string).toLowerCase();
        };
        return format(args.STRING1).endsWith(format(args.STRING2));
    }

    replace(args) {
        return Cast.toString(args.STRING).replaceAll(Cast.toString(args.X), Cast.toString(args.Y));
    }

    if(args) {
        return Cast.toBoolean(args.OPERAND) ? Cast.toString(args.STRING1) : Cast.toString(args.STRING2);
    }

    min(args) {
        return Math.min(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2));
    }

    max(args) {
        return Math.max(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2));
    }

    mod(args) {
        const n = Cast.toNumber(args.NUM1);
        const modulus = Cast.toNumber(args.NUM2);
        let result = n % modulus;
        // Scratch mod uses floored division instead of truncated division.
        if (result / modulus < 0) result += modulus;
        return result;
    }

    fastpower(args) {
        // operator_fastpower
        return Math.pow(10, ((Math.log10(Cast.toNumber(args.NUM1)) || 0) * (Cast.toNumber(args.NUM2) || 0)) || 0);
    }

    hex(args) {
        function _mod(x, y) {
            let result = x % y;
            // Scratch's modula uses floored division instead of truncated division.
            // I do not know why.
            if (result / y < 0) result += y;
            return result;
        }
        var hex = "";
        var digits = "0123456789ABCDEF"
        var cdiv = Cast.toNumber(args.NUM);
        hex = digits[_mod(cdiv, 16)] + hex;
        cdiv = Math.floor((cdiv - _mod(cdiv, 16)) / 16);
        while (!(cdiv === 0)) {
            hex = digits[_mod(cdiv, 16)] + hex;
            cdiv = Math.floor((cdiv - _mod(cdiv, 16)) / 16);
        }
        return hex;
    }

    round(args) {
        return Math.round(Cast.toNumber(args.NUM));
    }

    mathop(args) {
        const operator = Cast.toString(args.OPERATOR).toLowerCase();
        const n = Cast.toNumber(args.NUM);
        switch (operator) {
            case 'abs': return Math.abs(n);
            case 'floor': return Math.floor(n);
            case 'ceiling': return Math.ceil(n);
            case 'sqrt': return Math.sqrt(n);
            case 'sin': return parseFloat(Math.sin((Math.PI * n) / 180).toFixed(10));
            case 'cos': return parseFloat(Math.cos((Math.PI * n) / 180).toFixed(10));
            case 'tan': return MathUtil.tan(n);
            case 'asin': return (Math.asin(n) * 180) / Math.PI;
            case 'acos': return (Math.acos(n) * 180) / Math.PI;
            case 'atan': return (Math.atan(n) * 180) / Math.PI;
            case 'ln': return Math.log(n);
            case 'log': return Math.log(n) / Math.LN10;
            case 'e ^': return Math.exp(n);
            case '10 ^': return Math.pow(10, n);
        }
        return 0;
    }
}

module.exports = Scratch3OperatorsBlocks;
