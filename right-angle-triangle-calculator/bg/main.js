/* This is the right angle triangle calculator.
PART OF: v-s-ivanov/triangle-calculator
REPO: https://github.com/v-s-ivanov/triangle-calculator
VISIT AT: https://v-s-ivanov.github.io/triangle-calculator

    WARNING: The functions Math.sin(), Math.cos(), Math.tan(), 
            Pytamath.csc(), Pytamath.sec(), Pytamath.cot() accept RADIANS
            instead of degrees and the functions Math.asin(), Math.acos(), 
            Math.atan(), Pytamath.acsc(), Pytamath.asec(), Pytamath.acot()
            return RADIANS instead of degrees. Remember to convert with
            the functions toRadians() and toDegrees().
*/

const triangle = { // Object with the properties of the triangle
    alpha: 0, 
    beta: 0,
    oppositeSide: 0,
    adjacentSide: 0,
    hypotenuse: 0,
    sin: 0, cos: 0, tan: 0,
    csc: 0, sec: 0, cot: 0,
    trigonometryFunc: "",
    functionValue: 0
}

// This code sets the trigonometric function when the according radio button is pressed
// The JS functions are called in HTML
function toSin() {
    triangle.trigonometryFunc = "sin"
}
function toCos() {
    triangle.trigonometryFunc = "cos"
}
function toTan() {
    triangle.trigonometryFunc = "tan"
}

function toCsc() {
    triangle.trigonometryFunc = "csc"
}
function toSec() {
    triangle.trigonometryFunc = "sec"
}
function toCot() {
    triangle.trigonometryFunc = "cot"
}

// Sets the values of all trigonometric functions
function setFunctions(){ // Is called in calculate()
    // Regular functions
    triangle.sin = Math.sin(Pytamath.toRadians(triangle.alpha))
    triangle.cos = Math.cos(Pytamath.toRadians(triangle.alpha))
    triangle.tan = Math.tan(Pytamath.toRadians(triangle.alpha))

    //Reciprocal functions
    triangle.csc = Pytamath.csc(Pytamath.toRadians(triangle.alpha))
    triangle.sec = Pytamath.sec(Pytamath.toRadians(triangle.alpha))
    triangle.cot = Pytamath.cot(Pytamath.toRadians(triangle.alpha))
}

// Sets the sides of the triangles
function setSides(){ // Is called in calculate()

    // If we have the opposite side and the hypotenuse
    if(triangle.oppositeSide != "" && 
        triangle.hypotenuse != ""){ 

        triangle.sin = triangle.oppositeSide / triangle.hypotenuse

        triangle.alpha = Pytamath.toDegrees(Math.asin(triangle.sin))
        setFunctions()

        triangle.adjacentSide = triangle.hypotenuse * triangle.cos
    }
    // If we have the adjacent side and the hypotenuse
    else if(triangle.adjacentSide != "" && 
        triangle.hypotenuse != ""){
        triangle.cos = triangle.adjacentSide / triangle.hypotenuse
        triangle.alpha = Pytamath.toDegrees(Math.acos(triangle.cos))
        setFunctions()

        triangle.oppositeSide = triangle.hypotenuse * triangle.sin
    }
    // If we have the opposite and adjacent side
    else if(triangle.oppositeSide != "" && 
        triangle.adjacentSide != ""){
        triangle.tan = triangle.oppositeSide / triangle.adjacentSide

        triangle.alpha = Pytamath.toDegrees(Math.atan(triangle.tan))
        setFunctions()

        triangle.hypotenuse = triangle.adjacentSide / triangle.cos
    }
    // If we only have the opposite side
    else if(triangle.oppositeSide != ""){
        triangle.hypotenuse = triangle.oppositeSide / triangle.sin
        triangle.adjacentSide = triangle.hypotenuse * triangle.cos
    }
    // If we only have the adjacent side
    else if(triangle.adjacentSide != ""){
        triangle.hypotenuse = triangle.adjacentSide / triangle.cos
        triangle.oppositeSide = triangle.hypotenuse * triangle.sin
    }
    // If we only have the hypotenuse
    else if(triangle.hypotenuse != ""){
        triangle.adjacentSide = triangle.hypotenuse * triangle.cos
        triangle.oppositeSide = triangle.hypotenuse * triangle.sin
    }
    // If we don't have any side
    else{ // A triangle cannot be fully solved with just the angles
        fatalError += "Няма достатъчно информация, <br\> трябва да попълните 2 полета!"
    }
}

// Writing the result to the HTML document
function writeToDoc(){ // Is called in calculate()
    document.getElementById("result").innerHTML = 
    `sin = ${Pytamath.roundNum(triangle.sin, 2)}<br\>
    csc = ${Pytamath.roundNum(triangle.csc, 2)}<br\><br\>

    cos = ${Pytamath.roundNum(triangle.cos, 2)}<br\>
    sec = ${Pytamath.roundNum(triangle.sec, 2)}<br\><br\>

    tan = ${Pytamath.roundNum(triangle.tan, 2)}<br\>
    cot = ${Pytamath.roundNum(triangle.cot, 2)}<br\>
    <br\>
    Ъгъл 1 = ${Pytamath.roundNum(triangle.alpha, 2)}<br\>

    Ъгъл 2 = ${Pytamath.roundNum(triangle.beta, 2)}<br\>
    <br\>
    Прилежащ катет = ${Pytamath.roundNum(triangle.adjacentSide, 2)}<br\>
    Срещуположен катет = ${Pytamath.roundNum(triangle.oppositeSide, 2)}<br\>
    Хипотенуза = ${Pytamath.roundNum(triangle.hypotenuse, 2)}`
}

// The main function. It's used to calculate the triangle and to show the results to the user
function calculate() { // Is called in the HTML document
    // Setting the triangle properties
    triangle.functionValue = document.getElementById("functionValueField").value,
    triangle.alpha = document.getElementById("angleSizeField").value,
    triangle.oppositeSide = document.getElementById("oppositeSideField").value,
    triangle.adjacentSide = document.getElementById("adjacentSideField").value,
    triangle.hypotenuse = document.getElementById("hypotenuseField").value

    let fatalError = "" // Variable for error (just in case)

    // If a function value is set
    if (triangle.functionValue != "") {
        // If the function is sin
        if (triangle.trigonometryFunc == "sin") {
            triangle.sin = triangle.functionValue
            triangle.alpha = Pytamath.toDegrees(Math.asin(triangle.sin)) // Finding the angle using inverse sin.
            /* WARNING: The functions Math.sin(), Math.cos(), Math.tan(), 
            Pytamath.csc(), Pytamath.sec(), Pytamath.cot() accept RADIANS
            instead of degrees and the functions Math.asin(), Math.acos(), 
            Math.atan(), Pytamath.acsc(), Pytamath.asec(), Pytamath.acot()
            return RADIANS instead of degrees. Remember to convert with
            the functions toRadians() and toDegrees().
            */
            setFunctions()
        }
        // If the function is cos
        else if (triangle.trigonometryFunc == "cos") {
            triangle.cos = triangle.functionValue
            triangle.alpha = Pytamath.toDegrees(Math.acos(triangle.cos))
            setFunctions()
        }
        // You get the point
        else if (triangle.trigonometryFunc == "tan") {
            triangle.tan = triangle.functionValue
            triangle.alpha = Pytamath.toDegrees(Math.atan(triangle.tan))
            setFunctions()
        }
        // The standard Math library doesn't have reciprocal functions (csc, sec, cot).
        // To get them, we use the Pytamath library.
        if (triangle.trigonometryFunc == "csc") {
            triangle.csc = triangle.functionValue
            triangle.alpha = Pytamath.toDegrees(Pytamath.acsc(triangle.csc))
            setFunctions()
        }
        else if (triangle.trigonometryFunc == "sec") {
            triangle.sec = triangle.functionValue
            triangle.alpha = Pytamath.toDegrees(Pytamath.asec(triangle.sec))
            setFunctions()
        }
        else if (triangle.trigonometryFunc == "cot") {
            triangle.cot = triangle.functionValue
            triangle.alpha = Pytamath.toDegrees(Pytamath.acot(triangle.cot))
            setFunctions()
        }
        else{ // If a trigonometric function isn't set and there is a value
            fatalError += "Не е избрана тригонометрична функция! <br\>"
            // Throw an error
        }
    }
    else if(triangle.alpha != ""){ // If an angle value is set
        setFunctions() // Set the trigonometric functions
    }
    setSides() // Set the sides
    triangle.beta = 90 - triangle.alpha
    if(fatalError == ""){ // If there is no error
        writeToDoc() // Write the result
    }
    else{
        document.getElementById("result").innerHTML = "ERROR: " + fatalError // Show the error
    }
}
/*-Added a home page
-Added Bulgarian
-Added reciprocal functions - cosecant (csc) and secant (sec)
-Added the pytamath library
-Fixed some typos*/