//author:   AimingChen
//time:     2020.3.28
//act:      触摸事件

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    IS_TOUCH: boolean = false

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            // cc.log("TOUCH_START")
            this.IS_TOUCH = true
            // this.buttonDown = false;
        },this)

        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            // cc.log("TOUCH_END")
            this.IS_TOUCH = false
            // this.buttonDown = false;
        },this)
    }

    start () {

    }

    // update (dt) {}

    onDestroy () {
        // 取消输入监听
        this.node.off(cc.Node.EventType.TOUCH_START, function(event){}, this);
        this.node.off(cc.Node.EventType.TOUCH_END, function(event){}, this);
    }

    getSceneTouch () {
        return this.IS_TOUCH
    }
}
