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
        console.log(orbital, _.arc * orbital);
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
            _.distance += 1;
            
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

Slider.prototype = underscoreMin.extend(Object.create({}), {
    setup: function() {
        var dot, numDots = 80, radius = 168, circle = 1.5 * Math.PI, angle = circle / numDots;
        this.clock = new PIXI.Sprite;
        for (var i = 0, j = 0; i < circle; i += angle,
        ++j) {
            dot = new PIXI.Graphics;
            dot.beginFill(10066329, 1);
            dot.drawCircle(0, 0, 1);
            dot.angle = i - Math.PI / 2;
            if (j > 1 && j < numDots - 2)
                this.clock.addChildAt(dot, 0)
        }
        this.stage.addChild(this.clock);
        this.$el.append($(['<div class="dragger">', '<svg xmlns="http://www.w3.org/2000/svg" class="waves">', '<circle cx="0" cy="0" r="50" fill="none" stroke="#999999" stroke-width="2" />', '<circle cx="0" cy="0" r="50" fill="none" stroke="#999999" stroke-width="2" />', "</svg>", '<div class="hitarea"></div>', '<div class="circle"></div>', "</div>", '<div class="snapper">', '<svg xmlns="http://www.w3.org/2000/svg" class="waves">', '<circle cx="0" cy="0" r="50" fill="none" stroke="#999999" stroke-width="2" />', '<circle cx="0" cy="0" r="50" fill="none" stroke="#999999" stroke-width="2" />', "</svg>", '<div class="circle"></div>', "</div>", '<div class="tutorial"><span class="timsans-bold">' + this.locale.ui.drag[this.lang] + "</span></div>", '<p><span class="timsans-bold">' + this.index + "</span></p>", '<span class="left line"></span>', '<span class="right line"></span>'].join().replace(/,/g, "")));
        TweenMax.set(this.$el.find("p"), {
            rotation: -90
        });
        this.dragTimeline = this.getTimeline(this.$el.find(".dragger svg circle"), .35, .35, -1);
        this.snapTimeline = this.getTimeline(this.$el.find(".snapper svg circle"), .35, .15, -1);
        this.move(-Math.PI / 2);
        this.hide()
    },
    getTimeline: function(holder, stagger, delay, repeat) {
        var tweens = [];
        underscoreMin.each(holder, function(wave) {
            transformWave(wave, .1, 0);
            tweens.push(TweenMax.to({
                scale: .1,
                alpha: 0
            }, 2, {
                ease: Cubic.easeOut,
                bezier: {
                    curviness: 0,
                    values: [{
                        scale: .3,
                        alpha: .6
                    }, {
                        scale: 1,
                        alpha: 0
                    }]
                },
                onUpdate: function() {
                    transformWave(wave, this.target.scale, this.target.alpha)
                }
            }))
        });
        function transformWave(wave, scale, alpha) {
            var r = parseInt($(wave).attr("r"))
              , a = alpha
              , s = scale
              , x = r / s
              , y = r / s;
            $(wave).attr("stroke-opacity", a).attr("transform", "scale(" + s + ") translate(" + x + "," + y + ")")
        }
        return new TimelineMax({
            tweens: tweens,
            stagger: stagger,
            delay: delay,
            repeat: repeat,
            paused: true
        })
    },
    hide: function() {
        underscoreMin.each(this.clock.children, function(dot) {
            dot.radius = 148
        });
        TweenMax.set(this.$el.find(".dragger"), {
            scale: 0
        });
        TweenMax.set(this.$el.find(".tutorial span"), {
            y: 20,
            force3D: true
        });
        TweenMax.set(this.$el.find(".left.line"), {
            scaleX: 0,
            x: 30,
            force3D: true
        });
        TweenMax.set(this.$el.find(".right.line"), {
            scaleX: 0,
            x: -30,
            force3D: true
        });
        TweenMax.set(this.$el.find("p"), {
            autoAlpha: 0,
            x: 20,
            force3D: true
        });
        TweenMax.set(this.$el.find(".snapper"), {
            scale: 0
        })
    },
    move: function(angle) {
        this.angle = angle;
        var w = window.innerWidth
          , h = window.innerHeight
          , dx = Math.rotate(w < 768 ? 128 : 168, this.angle).x + w / 2
          , dy = Math.rotate(w < 768 ? 128 : 168, this.angle).y + h / 2
          , sx = Math.rotate(w < 768 ? 128 : 168, Math.PI).x + w / 2
          , sy = Math.rotate(w < 768 ? 128 : 168, Math.PI).y + h / 2;
        TweenMax.set(this.$el.find(".dragger"), {
            x: dx,
            y: dy
        });
        TweenMax.set(this.$el.find(".snapper"), {
            x: sx,
            y: sy
        })
    },
    tweenWavesIn: function(notutorial) {
        var tweens = [];
        tweens.push(TweenMax.to(this.$el.find(".dragger svg"), .6, {
            autoAlpha: 1,
            ease: Cubic.easeInOut
        }));
        if (!notutorial)
            tweens.push(TweenMax.to(this.$el.find(".tutorial span"), .8, {
                y: 0,
                force3D: true,
                ease: Cubic.easeOut
            }));
        return new TimelineMax({
            tweens: tweens,
            onStart: underscoreMin.bind(function() {
                this.dragTimeline.play()
            }, this)
        })
    },
    tweenWavesOut: function() {
        var tweens = [];
        tweens.push(TweenMax.to(this.$el.find(".dragger svg"), .6, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
        }));
        tweens.push(TweenMax.to(this.$el.find(".tutorial span"), .8, {
            y: 20,
            force3D: true,
            ease: Cubic.easeInOut
        }));
        return new TimelineMax({
            tweens: tweens,
            onStart: underscoreMin.bind(function() {
                this.dragTimeline.pause()
            }, this)
        })
    },
    tweenSnapWavesIn: function() {
        var tweens = [];
        tweens.push(TweenMax.to(this.$el.find(".snapper svg"), .6, {
            autoAlpha: 1,
            ease: Cubic.easeInOut
        }));
        return new TimelineMax({
            tweens: tweens,
            onStart: underscoreMin.bind(function() {
                this.snapTimeline.play()
            }, this)
        })
    },
    tweenSnapWavesOut: function() {
        var tweens = [];
        tweens.push(TweenMax.to(this.$el.find(".snapper svg"), .6, {
            autoAlpha: 0,
            ease: Cubic.easeInOut
        }));
        return new TimelineMax({
            tweens: tweens,
            onStart: underscoreMin.bind(function() {}, this),
            onComplete: underscoreMin.bind(function() {
                this.snapTimeline.progress(0)
            }, this)
        })
    },
    tweenIn: function() {
        var tweens = []
          , clockTweens = [];
        underscoreMin.each(this.clock.children, function(dot) {
            clockTweens.push(TweenMax.to({
                radius: dot.radius,
                alpha: dot.alpha,
                dot: dot
            }, 1.2, {
                radius: 168,
                alpha: 1,
                ease: Elastic.easeOut,
                easeParams: [.6, .2],
                onUpdate: function() {
                    this.target.dot.x = 190 + Math.cos(this.target.dot.angle) * this.target.radius;
                    this.target.dot.y = 190 + Math.sin(this.target.dot.angle) * this.target.radius;
                    this.target.dot.radius = this.target.radius;
                    this.target.dot.alpha = this.target.alpha
                }
            }))
        }, this);
        tweens.push(TweenMax.to(this.$el.find(".snapper"), 1, {
            scale: 1,
            ease: Cubic.easeInOut
        }));
        tweens.push(TweenMax.to(this.$el.find("p"), .75, {
            autoAlpha: 1,
            x: 0,
            force3D: true,
            ease: Cubic.easeInOut
        }));
        tweens.push(new TimelineMax({
            tweens: [TweenMax.to(this.$el.find(".left.line"), .75, {
                scaleX: 1,
                x: 0,
                force3D: true,
                ease: Cubic.easeInOut
            }), TweenMax.to(this.$el.find(".right.line"), .75, {
                scaleX: 1,
                x: 0,
                force3D: true,
                ease: Cubic.easeInOut
            })],
            stagger: .25
        }));
        tweens.push(new TimelineMax({
            tweens: clockTweens,
            stagger: .0175
        }));
        tweens.push(TweenMax.to(this.$el.find(".dragger"), 1, {
            scale: 1,
            ease: Cubic.easeInOut
        }));
        if (!this.moved)
            tweens.push(TweenMax.to(this.$el.find(".tutorial span"), .75, {
                y: 0,
                force3D: true,
                ease: Cubic.easeOut
            }));
        return new TimelineMax({
            tweens: tweens,
            stagger: .25,
            onComplete: underscoreMin.bind(function() {
                this.dragTimeline.play()
            }, this)
        })
    },
    tweenOut: function() {
        var tweens = []
          , clockTweens = [];
        underscoreMin.each(this.clock.children, function(dot) {
            clockTweens.push(TweenMax.to({
                radius: dot.radius,
                alpha: dot.alpha,
                dot: dot
            }, 1.2, {
                radius: 148,
                alpha: 0,
                ease: Elastic.easeIn,
                easeParams: [.6, .2],
                onUpdate: function() {
                    this.target.dot.x = 190 + Math.cos(this.target.dot.angle) * this.target.radius;
                    this.target.dot.y = 190 + Math.sin(this.target.dot.angle) * this.target.radius;
                    this.target.dot.radius = this.target.radius;
                    this.target.dot.alpha = this.target.alpha
                }
            }))
        });
        tweens.push(new TimelineMax({
            tweens: clockTweens,
            stagger: .015
        }));
        tweens.push(TweenMax.to(this.$el.find(".dragger"), 1, {
            scale: 0,
            ease: Expo.easeInOut
        }));
        tweens.push(TweenMax.to(this.$el.find(".snapper"), 1, {
            scale: 0,
            ease: Expo.easeInOut
        }));
        tweens.push(TweenMax.to(this.$el.find("p"), .75, {
            autoAlpha: 0,
            x: -20,
            force3D: true,
            ease: Cubic.easeInOut
        }));
        tweens.push(new TimelineMax({
            tweens: [TweenMax.to(this.$el.find(".left.line"), .75, {
                scaleX: 0,
                x: -30,
                force3D: true,
                ease: Cubic.easeInOut
            }), TweenMax.to(this.$el.find(".right.line"), .75, {
                scaleX: 0,
                x: 30,
                force3D: true,
                ease: Cubic.easeInOut
            })],
            stagger: .25
        }));
        tweens.push(TweenMax.to(this.$el.find(".tutorial span"), .8, {
            y: 20,
            force3D: true,
            ease: Cubic.easeInOut
        }));
        return new TimelineMax({
            tweens: tweens,
            stagger: .15,
            onStart: underscoreMin.bind(function() {
                this.snapOut = true
            }, this),
            onComplete: underscoreMin.bind(function() {
                this.snapOut = false
            }, this)
        })
    },
    destroy: function() {
        if (this.timeline)
            this.timeline.kill();
        this.$el.remove();
        this.clock.destroy(true);
        this.stage.destroy(true);
        this.timeline = null;
        this.snapOut = null;
        this.locale = null;
        this.clock = null;
        this.stage = null;
        this.moved = null;
        this.lang = null;
        this.$el = null
    }
});
