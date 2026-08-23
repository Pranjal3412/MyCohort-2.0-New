const mouseFollower = document.querySelector(".mouse-follower")

let x = 0, y = 0;

addEventListener("mousemove",(e)=>{
    const {clientX, clientY} = e

    x = clientX
    y = clientY
    

    })

    function funn(){
        mouseFollower.style.transform = 'translate(${X}px, ${Y}px)'
        requestAnimationFrame (funn)
    }

    funn() 