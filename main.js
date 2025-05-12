let trigonometryFunc = ""

function toSin() {
    trigonometryFunc = "sin"
}
function toCos() {
    trigonometryFunc = "cos"
}
function toTg() {
    trigonometryFunc = "tg"
}
function toCotg() {
    trigonometryFunc = "cotg"
}

function acot(cot){
    return Math.atan(1/cot)
}

function roundNum(number, digits){
    return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

function calculate() {
    let functionValue = document.getElementById("functionValueField").value,
        angleSize = document.getElementById("angleSizeField").value,
        oppositeSide = document.getElementById("oppositeSideField").value,
        adjacentSide = document.getElementById("adjacentSideField").value,
        hypotenuse = document.getElementById("hypotenuseField").value

    let sin, cos, tg, cotg

    let fatalError = ""

    function setSin(){sin = Math.sin(angleSize * Math.PI / 180)}
    function setCos(){cos = Math.cos(angleSize * Math.PI / 180)}
    function setTg(){tg = Math.tan(angleSize * Math.PI / 180)}
    function setCotg(){cotg = 1 / Math.tan(angleSize * Math.PI / 180)}

    function setSides(){
        if(oppositeSide != "" && 
            hypotenuse != ""){

            sin = oppositeSide / hypotenuse

            angleSize = Math.asin(sin) * 180 / Math.PI
            setCos()
            setTg()
            setCotg()

            adjacentSide = hypotenuse * cos
        }
        else if(adjacentSide != "" && 
            hypotenuse != ""){

            cos = adjacentSide / hypotenuse
            angleSize = Math.acos(cos) * 180 / Math.PI
            setSin()
            setTg()
            setCotg()

            oppositeSide = hypotenuse * sin
        }
        else if(oppositeSide != "" && 
            adjacentSide != ""){

            tg = oppositeSide / adjacentSide
    
            angleSize = Math.atan(tg) * 180 / Math.PI
            setCos()
            setSin()
            setCotg()
    
            hypotenuse = adjacentSide / cos
        }
        else if(oppositeSide != ""){
            hypotenuse = oppositeSide / sin
            adjacentSide = hypotenuse * cos
        }
        else if(adjacentSide != ""){
            hypotenuse = adjacentSide / cos
            oppositeSide = hypotenuse * sin
        }
        else if(hypotenuse != ""){
            adjacentSide = hypotenuse * cos
            oppositeSide = hypotenuse * sin
        }
        else{
            fatalError += "Data not enough, <br\> you have to fill at least 2 fields!"
        }
    }

    function writeToDoc(){
        document.getElementById("result").innerHTML = 
        `sin = ${roundNum(sin, 2)}<br\>
        cos = ${roundNum(cos, 2)}<br\>
        tg = ${roundNum(tg, 2)}<br\>
        cotg = ${roundNum(cotg, 2)}<br\>
        <br\>
        Angle 1 = ${roundNum(angleSize, 2)}<br\>

        Angle 2 = ${roundNum(90 - angleSize, 2)}<br\>
        <br\>
        Adjacent side = ${roundNum(adjacentSide, 2)}<br\>
        Opposite side = ${roundNum(oppositeSide, 2)}<br\>
        Hypotenuse = ${roundNum(hypotenuse, 2)}`
    }

    if (functionValue != "") {
        if (trigonometryFunc == "sin") {
            sin = functionValue
            angleSize = Math.asin(sin) * 180 / Math.PI
            setCos() 
            setTg()
            setCotg()
        }
        else if (trigonometryFunc == "cos") {
            cos = functionValue
            angleSize = Math.acos(cos) * 180 / Math.PI
            setSin() 
            setTg()
            setCotg()
        }
        else if (trigonometryFunc == "tg") {
            tg = functionValue
            angleSize = Math.atan(tg) * 180 / Math.PI
            setCos() 
            setSin()
            setCotg()
        }
        else if (trigonometryFunc == "cotg") {
            cotg = functionValue
            angleSize = Math.acot(cotg) * 180 / Math.PI
            setCos() 
            setTg()
            setSin()
        }
        else{
            fatalError += "No trigonometric function selected! <br\>"
        }
    }
    else if(angleSize != ""){
        setSin()
        setCos() 
        setTg()
        setCotg()
    }
    setSides()
    if(fatalError == ""){
        writeToDoc()
    }
    else{
        document.getElementById("result").innerHTML = "ERROR: " + fatalError
    }
}
