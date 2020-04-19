//author:   AimingChen
//time:     2020.4.19
//act:      钓鱼控制节点

const {ccclass, property} = cc._decorator;

@ccclass
export default class FishingNode extends cc.Component {

    @property(cc.Sprite)
    roller: cc.Sprite

    @property(cc.Sprite)
    sliderNode: cc.Sprite

    @property(cc.Sprite)
    catchFishNode: cc.Sprite

    @property(cc.ProgressBar)
    fishingBar: cc.ProgressBar


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
