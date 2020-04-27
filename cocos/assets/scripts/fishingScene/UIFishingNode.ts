//author:   AimingChen
//time:     2020.4.19
//act:      钓鱼控制节点

const {ccclass, property} = cc._decorator;
import { EffectAction } from "../Effect/EffectAction";

@ccclass
export class FishingNode extends cc.Component {

    @property(cc.Sprite)
    roller: cc.Sprite

    @property(cc.Sprite)
    sliderNode: cc.Sprite

    @property(cc.Sprite)
    catchFishNode: cc.Sprite

    @property(cc.ProgressBar)
    fishingBar: cc.ProgressBar

    speed: number = -100
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true
        cc.director.getPhysicsManager().gravity = cc.v2(0, this.speed)
        cc.log(this.sliderNode.node.getComponent(cc.RigidBody).linearVelocity.y)
    }

    init () {

    }

    start () {

    }

    checkIsGetFishSlider (): boolean {
        let headIn: boolean = this.sliderNode.node.y + (this.sliderNode.node.height/2) > this.catchFishNode.node.y - (this.catchFishNode.node.height/2)
        let bottomIn: boolean = this.sliderNode.node.y - (this.sliderNode.node.height/2) < this.catchFishNode.node.y + (this.catchFishNode.node.height/2)
        if (headIn && bottomIn) {
            this.catchFishNode.node.opacity = 255
            EffectAction.nodeShake(this.catchFishNode.node)
            return true
        }else{
            this.catchFishNode.node.opacity = 100
            return false
        }
    }

    setSpeed () {
        this.speed = this.sliderNode.node.getComponent(cc.RigidBody).linearVelocity.y + 10
        this.sliderNode.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.speed)
    }

    updateFishingBar () {
        let barProgress: number = this.fishingBar.node.getComponent(cc.ProgressBar).progress
        if (this.checkIsGetFishSlider()) {
            if(barProgress < 1) {
                this.fishingBar.node.getComponent(cc.ProgressBar).progress += 0.01
            } else {
                // cc.log("get fish!!!")
            }
        } else {
            if(barProgress > 0) {
                this.fishingBar.node.getComponent(cc.ProgressBar).progress -= 0.01
            } else {
                // cc.log("lose fish!!!")
            }
        }
    }

    update (dt) {
        this.updateFishingBar()
    }
}

