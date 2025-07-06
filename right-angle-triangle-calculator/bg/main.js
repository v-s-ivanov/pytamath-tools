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
    oppositeSide: 0, adjacentSide: 0,
    oppositeProjection: 0, adjacentProjection: 0,
    hypotenuse: 0,
    sin: 0, cos: 0, tan: 0,
    csc: 0, sec: 0, cot: 0,
    trigonometryFunc: "",
    functionValue: 0,
    height: 0,
    incircleRadius: 0,
    excircleRadius: 0,
    moreFields: false,
    fatalError: "",
    message: ""
}

// The main function. It's used to calculate the triangle and to show the results to the user ------------------------------------------------------------------------------------
function calculate() { // Is called in the HTML document
    // Setting the triangle properties
    triangle.fatalError = ""

    triangle.functionValue = document.getElementById("functionValueField").value
    triangle.alpha = document.getElementById("angleSizeField").value
    triangle.oppositeSide = document.getElementById("oppositeSideField").value
    triangle.adjacentSide = document.getElementById("adjacentSideField").value
    triangle.hypotenuse = document.getElementById("hypotenuseField").value

    if(triangle.moreFields){
        triangle.incircleRadius = document.getElementById("incircleField").value
        triangle.excircleRadius = document.getElementById("excircleField").value
        triangle.height = document.getElementById("heightField").value
    }

    excircle()

    setAngle()
    
    incircle()
    fromHeight()
    setSides() // Set the sides
    triangle.beta = 90 - triangle.alpha
    if(triangle.excircleRadius == "")
        triangle.excircleRadius = triangle.hypotenuse/2
    if(triangle.incircleRadius == "")
        triangle.incircleRadius = (Pytamath.roundNum(triangle.adjacentSide, 2) + Pytamath.roundNum(triangle.oppositeSide, 2) - Pytamath.roundNum(triangle.hypotenuse, 2)) / 2
    if(triangle.height == "")
        triangle.height = Math.sqrt(Math.pow(triangle.adjacentSide, 2) - Math.pow(triangle.adjacentProjection, 2))
    if(triangle.fatalError == ""){ // If there is no error
        writeToDoc() // Write the result
    }
    else{
        document.getElementById("result").innerHTML = "ERROR: " + triangle.fatalError // Show the error
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function moreFields(){ // This function adds the additional fields, is called in the HTML document
    triangle.moreFields = !triangle.moreFields
    if(document.getElementById("moreFieldsDiv").innerHTML == ""){
        document.getElementById("moreFieldsDiv").innerHTML = 
        `<label for="incircleField">Радиус на вписана окръжност:</label>
        <input type="text" name="incircleField" id="incircleField">
        <br><br>
        <label for="excircleField">Радиус на описана окръжност:</label>
        <input type="text" name="excircleField" id="excircleField">
        <br><br>
        <label for="heightField">Височина:</label>
        <input type="text" name="heightField" id="heightField">
        <br><br></br>`
    }
    else document.getElementById("moreFieldsDiv").innerHTML = ""
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
        triangle.fatalError += "Няма достатъчно информация, <br\> трябва да попълните 2 полета!"
    }
}

// Writing the result to the HTML document
function writeToDoc(){ // Is called in calculate()
    triangle.message = `sin = ${Pytamath.roundNum(triangle.sin, 2)}<br\>
    cosec = ${Pytamath.roundNum(triangle.csc, 2)}<br\><br\>

    cos = ${Pytamath.roundNum(triangle.cos, 2)}<br\>
    sec = ${Pytamath.roundNum(triangle.sec, 2)}<br\><br\>

    tg = ${Pytamath.roundNum(triangle.tan, 2)}<br\>
    cotg = ${Pytamath.roundNum(triangle.cot, 2)}<br\>
    <br\>
    Ъгъл 1 = ${Pytamath.roundNum(triangle.alpha, 2)}<br\>

    Ъгъл 2 = ${Pytamath.roundNum(triangle.beta, 2)}<br\>
    <br\>
    Прилежащ катет = ${Pytamath.roundNum(triangle.adjacentSide, 2)}<br\>
    Срещуприлежащ катет = ${Pytamath.roundNum(triangle.oppositeSide, 2)}<br\>
    Хипотенуза = ${Pytamath.roundNum(triangle.hypotenuse, 2)}`

    if(triangle.moreFields){
        triangle.message += `<br> <br>
        Радиус на вписана окръжност = ${Pytamath.roundNum(triangle.incircleRadius,2)}<br>
        Радиус на описана окръжност = ${Pytamath.roundNum(triangle.excircleRadius,2)}<br>
        Височина = ${Pytamath.roundNum(triangle.height,2)}
        `
    }
    document.getElementById("result").innerHTML = triangle.message
}

function incircle(){ // Finding the adjacent side from the incircle radius
    if(triangle.incircleRadius != "")
        triangle.adjacentSide = (triangle.cos * 2 * triangle.incircleRadius) / (triangle.cos + triangle.sin - 1)
}

function excircle(){ // Finding the hypotenuse from the excircle radius
    if(triangle.excircleRadius != ""){
        triangle.hypotenuse = 2 * triangle.excircleRadius
    }
}

function fromHeight(){ // Solving the triangle from the height and another value
    if(triangle.height != ""){ // If we have the height
        if(triangle.oppositeSide != ""){ // If we also have the opposite side
            // Using the Pythagorean theorem to find a1
            // a2 = sqrt(a2 - h2)
            triangle.oppositeProjection = Math.sqrt(Math.pow(triangle.oppositeSide,2) - Math.pow(triangle.height,2))
            // Reversing the formula a1 * b1 = h2
            // b1 = h2/a1
            triangle.adjacentProjection = Math.pow(triangle.height,2) / triangle.oppositeProjection
            // Finding the hypotenuse: a1 + b1 = c
            triangle.hypotenuse = triangle.adjacentProjection + triangle.oppositeProjection

            triangle.sin = triangle.oppositeSide / triangle.hypotenuse
            triangle.alpha = Pytamath.toDegrees(Math.asin(triangle.sin))
        }
        else if(triangle.adjacentSide != ""){ // If we also have the adjacent side
            triangle.adjacentProjection = Math.sqrt(Math.pow(triangle.adjacentProjection,2) - Math.pow(triangle.height,2))
            triangle.oppositeProjection = Math.pow(triangle.height,2) / triangle.adjacentProjection
            triangle.hypotenuse = triangle.adjacentProjection + triangle.oppositeProjection 

            triangle.cos = triangle.adjacentSide / triangle.hypotenuse
            triangle.alpha = Pytamath.toDegrees(Math.acos(triangle.cos))
        }
        else if(triangle.alpha != ""){ // If we also have the angle
            // Calculate the sine
            triangle.sin = Math.sin(Pytamath.toRadians(triangle.alpha))
            // We need at least one side for the setSides() function
            triangle.adjacentSide = triangle.height / triangle.sin
        }
        setFunctions() // Set all other trigonometric functions
    }
}

function setAngle(){
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
        else if (triangle.trigonometryFunc == "csc") {
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
            triangle.fatalError += "Не е избрана тригонометрична функция! <br\>"
            // Throw an error
        }
    }
    else if(triangle.alpha != ""){ // If an angle value is set
        setFunctions() // Set the trigonometric functions
    }
}