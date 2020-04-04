//author:   AimingChen
//time:     2020.3.28
//act:      钓鱼进度条控制

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    @property(cc.Sprite)
    sliderSprite: cc.Sprite
    // LIFE-CYCLE CALLBACKS:

    isGetFish = false
    isLoseFish = false

    onLoad () {
        cc.log("bar:",this.node.getComponent(cc.ProgressBar).progress)
    }

    start () {

    }

    update (dt) {
        this.updateFishBar()
    }

    onEnable () {
        this.isGetFish = false
        this.isLoseFish = false
        this.node.getComponent(cc.ProgressBar).progress
    }

    updateFishBar () {
        let barProgress: number = this.node.getComponent(cc.ProgressBar).progress
        if (this.checkIsGetFishSlider()) {
            if(barProgress < 1) {
                this.node.getComponent(cc.ProgressBar).progress += 0.01
            } else {
                cc.log("get fish!!!")
                this.isGetFish = true
            }
        } else {
            if(barProgress > 0) {
                this.node.getComponent(cc.ProgressBar).progress -= 0.01
            } else {
                cc.log("lose fish!!!")
                this.isLoseFish = true
            }
        }
    }

    checkIsGetFishSlider () {
        return this.sliderSprite.node.getComponent("SliderCtrl").checkIsGetFishSlider ()
    }

    // checkGetFish () {
    //     return this.isGetFish
    // }

    // loseGetFish () {
    //     return this.isLoseFish
    // }


}
