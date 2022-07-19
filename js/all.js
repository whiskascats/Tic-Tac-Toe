let win = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] ]
let O = []
let X = []
let point = [0,0]
let time = 0
let whoTurn = true //T:O, F:X

$("#start").on("click", function() {    //開始btn
    $('.area').animate({ top: '-100vh' }, 500)
})

if(localStorage.getItem("point") != null){
    point = localStorage.getItem("point").split(',')
    pointView()
}

function boxClick() {
    $(".play-area .box").off("click")   //因為重複宣告點擊事件，需先清空點擊事件
    $(".play-area .box").on("click", function() {

        let num = parseInt(this.id)
        if(whoTurn){        
            O.push(num)
            $("#"+this.id).off("click")
            $("#"+this.id).text("○")
            $(".turn").addClass("right")
            winner(O)        
        }
        else{
            X.push(num)
            $("#"+this.id).off("click")
            $("#"+this.id).text("X")
            $(".turn").removeClass("right")
            winner(X)
        }
    })
}
boxClick()
function pointView() {  //分數顯示
    $(".Opoint").text(point[0])
    $(".Xpoint").text(point[1])
}

function winner(arr) {
    let have = false
    time ++
    win.forEach(item => {
        let winPoint = 0
        item.forEach( winNum => {
            if(have){   //避免平手和獲勝同時發生
                return
            }
            if(arr.includes(winNum)){
                winPoint ++
            }
            if(winPoint == 3){
                if(whoTurn){
                    winnerView(1)
                    have = true
                }
                else{
                    winnerView(2)
                    have = true
                }
            }

        })
    })
    if(time == 9 && !have){ //第九步且未出現勝利者
        winnerView(3)
    }
    whoTurn = !whoTurn
}
function winnerView(win) {  //結束畫面切換
    $(".play").addClass("d-none")
    if(win == 3){
        $(".drew").removeClass("d-none")
    }
    else if(win == 1){
        $(".oiswin").removeClass("d-none")
        point[0] ++
    }
    else{
        $(".xiswin").removeClass("d-none")
        point[1] ++
    }
    localStorage.setItem("point", point)
    pointView()
}
function restart() {    //重新開始btn
    O = []
    X = []
    time = 0
    $(".play-area .box").text("")
    $(".oiswin").addClass("d-none")
    $(".xiswin").addClass("d-none")
    $(".drew").addClass("d-none")
    $(".play").removeClass("d-none")
    boxClick()
}
$("#restart").on("click", restart)