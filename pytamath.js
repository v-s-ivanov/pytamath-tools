const Pytamath = {}

Pytamath.csc = function(csc){ // Cosecant
    return 1 / Math.sin(csc);
}
Pytamath.sec = function(sec){ // Secant
    return 1 / Math.cos(sec);
}
Pytamath.cot = function(cot){ // Cotangent
    return 1 / Math.tan(cot);
}

Pytamath.acsc = function(csc){ // Inverse cosecant
    return Math.asin(1/csc);
}
Pytamath.asec = function(sec){ // Inverse secant
    return Math.acos(1/sec);
}
Pytamath.acot = function(cot){ // Inverse cotangent
    return Math.atan(1/cot);
}

Pytamath.roundNum = function(number, digits){ // Rounding to specific digits
    return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
}
/* Example for roundNum:
    Pytamath.roundNum(123.45678, 2) - round the number 123.45678 to 2 digits after .
    123.45678 -> 12345.678 -> 12346 -> 123.46
*/

Pytamath.toRadians = function(num){ // Degrees to radians converter
    return num * Math.PI / 180;
}

Pytamath.toDegrees = function(num){ // Radians to degrees converter
    return num * 180 / Math.PI;
}