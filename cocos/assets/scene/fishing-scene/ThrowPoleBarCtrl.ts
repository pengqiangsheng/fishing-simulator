//author:   AimingChen
//time:     2020.4.4
//act:      钓鱼抛竿进度条控制

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Canvas)
    touchCanvas: cc.Canvas
    @property(cc.Node)
    fishingNode: cc.Node

    // LIFE-CYCLE CALLBACKS:
    direction = 1
    showProgress: boolean = false

    onLoad () {
        this.node.getComponent(cc.ProgressBar).progress = 0
    }

    start () {

    }

    update (dt) {
        let barProgress: number = this.node.getComponent(cc.ProgressBar).progress
        // cc.log(this.direction)
        if ( !this.getIsThrow() ) {
            
            if (this.direction == 1) {
                if (barProgress < 1) {
                    this.node.getComponent(cc.ProgressBar).progress += 0.02
                } else {
                    this.direction = -1
                    // 优化玩家抛竿到100%的体验
                    this.node.getComponent(cc.ProgressBar).progress += 0.03
                }
            } else {
                if (barProgress > 0) {
                    this.node.getComponent(cc.ProgressBar).progress -= 0.02
                } else {
                    this.direction = 1
                }
            }

        } else {
            if (! this.showProgress) {
                cc.log(barProgress)
                this.showProgress = true
            }
            if (barProgress >= 1) {
                cc.log("MAX!!!")
            }
        }
    }

    onEnable () {
        cc.log("aimingChen 调用摧毁算法！！！！！！")
        this.node.getComponent(cc.ProgressBar).progress = 0
    }

    getIsThrow () {
        return this.touchCanvas.node.getComponent("TouchEvent").getIsThrow()
    }
}
