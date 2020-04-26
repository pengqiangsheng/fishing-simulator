//author:   AimingChen
//time:     2020.4.26
//act:      触摸事件

const {ccclass, property} = cc._decorator;
import { FishingNode } from "./UIFishingNode";


@ccclass
export class TouchCtrl extends cc.Component {

    isTouch: boolean = false
    @property(FishingNode)
    FishingNode: FishingNode;
    
    onLoad () {
        
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            this.isTouch = true
        },this)

        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            this.isTouch = false
        },this)
    }

    start () {

    }

    update (dt) {
        if (this.isTouch) {
            this.FishingNode.setSpeed()
        }
    }
}
