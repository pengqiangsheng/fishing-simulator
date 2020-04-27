//author:   AimingChen
//time:     2020.4.26
//act:      鱼滑块移动

const {ccclass, property} = cc._decorator;


@ccclass
export class FishMove extends cc.Component {

    maxPosY = 298
    minPosY = -225
    isMove = false

    onLoad () {
        cc.log("aimingChen fishMove")
        cc.log(this.node)
    }

    start () {

    }

    fishMoveAction () {
        let movePos = this.randomInt(this.maxPosY, this.minPosY)
        let moveTime = this.randomInt(4, 1)
        this.isMove = true
        let moveAction = cc.moveTo(moveTime, cc.v2(129, movePos));
        let callback = cc.callFunc(function(){
            this.isMove = false
        }.bind(this))
        cc.tween(this.node)
        .sequence(moveAction,callback)
        .start()
    }

    // TODO 后续应该写入通用的工具类中(闭区间)
    randomInt (max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    update (dt) {
        // cc.log(this.randomInt(2,1))
        if (!this.isMove) {
            this.fishMoveAction()
        }
    }
}
