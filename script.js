function setHeight() {
    windowHeight = window.innerHeight
    headerHeight = parseInt(window.getComputedStyle(document.querySelector('#header-container')).height.replace(/[^\d.-]/g, ''))
    document.getElementById("reaction-forms").style.height = windowHeight-headerHeight-20.3 + "px"
}
setHeight()
window.addEventListener("resize", setHeight)



// Start Reaction Tester
function createShape() {
    screenwidth = document.getElementById("reaction-forms").clientWidth
    screenheight = document.getElementById("reaction-forms").clientHeight
    //Gets the values for the shapes

    // //Dimensions
    var width = Math.floor(Math.random(0,1) *125+screenwidth/7)
    var height = Math.floor(Math.random(0,1) *75+screenheight/7) 

    //Generate x,y axis for shape
    //##NOTE can change px to % and add screenResize event listener to adjust width ratio for overflow 
    xOffset = (screenwidth-width)/screenwidth
    yOffset = (screenheight-height)/screenheight
    randX = Math.random() *xOffset
    randY = Math.random() *yOffset
    xAxis = Math.round(randX*screenwidth)
    yAxis = Math.round(randY*screenheight)
    var radius = Math.floor(Math.random() *50);
    
    //Set style on shape
    document.getElementById("shapes").style.display ="block";
    document.getElementById("shapes").style.border = "solid";
    document.getElementById("shapes").style.position = "relative"
    document.getElementById("shapes").style.height = height + "px";
    document.getElementById("shapes").style.width = width + "px";
    document.getElementById("shapes").style.borderRadius = radius + "%";
    document.getElementById("shapes").style.top = yAxis + "px";
    document.getElementById("shapes").style.left = xAxis + "px";  
}

//Create Color Scheme
function rainbowStop(h) {
        let f= (n,k=(n+h*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1);  
        let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,0)).join('');
        return ( rgb2hex(f(0), f(8), f(4)) );
    } 
    
//Color the shapes with the Color Scheme
function colorShape() {
    randomColor = Math.random(10)
    document.getElementById("shapes").style.background = rainbowStop(randomColor);
}

// start = new Date().getTime();
//-----------------------Start Game---------------------------------
document.getElementById("timer-start").onclick = function() { 
    var game = true
    reset = false
    document.getElementById("timer-start").style.display = "none"; //Hide Start Timer
    document.getElementById("timer-count").innerHTML = "Timer: "  ;  //Replace Html of timer-count to Timer:+ Time
    document.getElementById("timer-end").style.display = "inline"; //Shows End Timer
    // Creates the Shape
    function shape() {
        if (reset == false) {
            createShape()
            colorShape();
            screenwidth = document.getElementById("reaction-forms").clientWidth

        //Sets time to be the same as to when the function is called to avoid timer starting early
            start = new Date().getTime();
        } else if(reset == true) {
            //Pass
        }
    } //End of document.onclick of timer-start

    //Draw the shapes
    function makeShapeAppear() {  
        if (game == true) {
            setTimeout(shape, Math.random()* 1500+0.5); 
        } else {
            //Pass
        }
    }

    //Replace interval with event listener
    if (game == true) {
        screenwidth = document.getElementById("reaction-forms").clientWidth
        setInterval(() => {
            lastScreenSize = screenwidth
            if (document.getElementById("reaction-forms").clientWidth != screenwidth) {
                document.getElementById("shapes").style.display = "none";
                document.getElementById("timer-count").innerHTML = "Reseted";
                makeShapeAppear()
            } else {
                screenwidth = lastScreenSize
            }
        }, 1000);
    }

    timeTakenTotal = []
    //If user clicks shape
    document.getElementById("shapes").onclick = function() {
        if (game == true) {
            var end = new Date().getTime();      
            var timeTaken = (end - start) / 1000;
            timeTakenTotal.push(timeTaken); //Adds time to array
            document.getElementById("timer-avg-time").innerHTML = (timeTakenTotal.reduce((a,b) => a + b, 0)/timeTakenTotal.length).toFixed(3)
            if (timeTaken > 1) {
                document.getElementById("timer-count").style.background ="red";
            } else {
                document.getElementById("timer-count").style.background ="green";
            }
            //Places reaction time for the onclick shape and makes shape dissapear
            document.getElementById("timer-count").innerHTML = "Timer: " + timeTaken; ;
            document.getElementById("shapes").style.display = "none";

            // Recall Shapes
            makeShapeAppear();  
            }  else {
                document.getElementById("shapes").style.display = "none";
            }
        }
        
        document.getElementById("timer-end").onclick = function() {
            game = false
            reset = true
            document.getElementById("timer-start").style.display = "inline-block"; //Hide Start Timer
            document.getElementById("timer-count").innerHTML = "Start Timer";  //Replace Html of timer-count to Timer:+ Time
            document.getElementById("timer-end").style.display = "none"; //Shows End Timer
            document.getElementById("shapes").style.display = "none";
            document.getElementById("timer-count").style.background = "";
    }
    //Draws shape When timer-start is pressed
    makeShapeAppear();
}