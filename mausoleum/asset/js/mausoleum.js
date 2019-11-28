console.log("ready");

const circle = {
    playground : document.querySelector(".circle-wrap"),
    elem : document.querySelector(".circle"),
    radius : Number(window.getComputedStyle(document.querySelector(".circle-wrap"), null).getPropertyValue("width").replace("px", ""))/2,
    startpoint : 40,
    animateTime : 50,
}

function CirclePointer(opt){
    const {playground, elem, radius, startpoint, animateTime} = opt;

    this.playground = playground;
    this.elem = elem;
    this.radius = radius;
    this.arc = (Math.PI * 2)/360;
    this.startpoint = startpoint;
    this.distance = this.startpoint;
    this.animateTime = animateTime;
    
    // static method
    const _ =  this;
    
    // prototype method
    const p = CirclePointer.prototype;
    p.around = (orbital) => {
        _.elem.style = 
        "transform:matrix(1,0,0,1," + 
        ( _.radius * Math.sin(_.arc * orbital) ) + 
        "," + 
        ( _.radius * Math.cos(_.arc * orbital) ) + 
        ")"
        ;
    }
    p.animate = () => {
        console.log(_.distance);
        setInterval(()=>{
            _.around(_.distance);
            _.distance += 5;
            
            if(_.distance === 360){
                _.distance = 0;
                return;
            }
        
        }, _.animateTime);
    }
    p.pointercheck = (orbital)=>{
        this.around(orbital);
    }
}

const circlePointer = new CirclePointer(circle);
console.log(circlePointer);
// circlePointer.animate();
// circlePointer.pointercheck(180);

// console.log(window.innerHeight);
function dragging(){
    const tg = document.querySelector(".navigation__menulist");
    console.dir(tg);
    // tg.onmousedown = (e)=>{
    //     console.log("drag start");
    //     console.log(e.pageY);
    // }
    // let od = 0;
    tg.onmousedown = e => {
        // console.log(e);
        // console.log("dragging");
        // console.log("pageY : ", e.pageY);
        // console.log("clientY : ", e.clientY);
        // console.log("offsetY : ", e.offsetY);
        // tg.onmousemove(e);
        // tg.onmouseend(e);
        tg.addEventListener("mousemove", e =>{
            tg.children[1].style = "transform:translateY(" + Math.floor(e.pageY - (window.innerHeight/2) - 60) + "px)"
        }, false);
        tg.addEventListener("mouseend", e=>{
            e.preventDefault();
            return false;
        });
    };
    
    // tg.ondrag = (e)=>{
    //     console.log(e.pageX, e.pageY);
    // }
    // tg.addEventListener("mousedown", ()=>{
    //     console.log("drag start");
    //     this.addEventListener("mousemove", ()=>{
    //         console.log("dragging");
            
    //     })
    //     this.addEventListener("mouseup", ()=>{
    //         console.log("drag end");

    //     });
    // })
}
/* drag event key
ondrag: e => {…}
ondragend: null
ondragenter: null
ondragleave: null
ondragover: null
ondragstart: null
*/

