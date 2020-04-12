//author:   AimingChen
//time:     2020.4.12
//act:      鱼竿滚轮测试

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Sprite)
    roller:cc.Sprite

    onLoad () {
        cc.tween(this.node)
        .repeatForever(cc.rotateBy(1,-360))
        .start()
    }

    start () {

    }

    // update (dt) {}
}
