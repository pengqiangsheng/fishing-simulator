//author:   AimingChen
//time:     2020.3.28
//act:      触摸事件

const {ccclass, property} = cc._decorator;
const Utils = require('Utils')
const utils = new Utils()

const BEGIN_GAME = 0
const BEGIN_FISH = 1
const WAIT_FISH = 2
const HOOK_FISH = 3
const GET_FISH = 4
const LOSE_FISH = 5

@ccclass
export default class NewClass extends cc.Component {

    @property (cc.Node)
    fishingNode: cc.Node

    @property (cc.ProgressBar)
    throwPoleBar: cc.ProgressBar

    // 游戏测试文字后期会删除
    @property (cc.Label)
    testTipLabel: cc.Label
    
    is_touch: boolean = false
    is_throw: boolean = false

    gameState = BEGIN_GAME

    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        
        cc.log(this.fishingNode.getChildByName("FishingBar").getComponent("FishingBarCtrl"))
        // 初始化游戏中的组件
        this.fishingNode.active = false
        this.throwPoleBar.node.active = false
        cc.log(this.throwPoleBar.node)
        this.setTestTipText("点击屏幕开始游戏")
        this.runLabelScaleAction()
        
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            // cc.log("TOUCH_START")
            this.is_touch = true

            if (this.gameState == BEGIN_GAME) {
                this.setTestTipText("点击抛竿")
                this.throwPoleBar.node.stopAllActions()
                this.throwPoleBar.node.opacity = 255
                this.throwPoleBar.node.active = true
            }
            else if (this.gameState == BEGIN_FISH) {
                this.is_throw = true
                
                let fadeOut = cc.fadeOut(0.5)
                let waitFunc = cc.callFunc(function(){
                    if (this.gameState == WAIT_FISH) {
                        this.setTestTipText("等待鱼儿上钩！")
                        this.runLabelJumpAction()
                    }
                }.bind(this))

                let waitTime = cc.delayTime(this.getWaitFishTime())

                let getFishFunc = cc.callFunc(function(){
                    this.setTestTipText("鱼儿上钩了！！！")
                    this.fishingNode.active = true
                    this.gameState = HOOK_FISH
                    this.throwPoleBar.node.getComponent(cc.ProgressBar).progress = 0
                    this.throwPoleBar.node.active = false
                }.bind(this))


                cc.tween(this.throwPoleBar.node)
                .sequence(fadeOut,waitFunc)
                .sequence(waitTime,getFishFunc)
                .start() 
            }
            else if (this.gameState == WAIT_FISH) {
                this.is_throw = false
                
            }
            
            // this.buttonDown = false;
        },this)

        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            // cc.log("TOUCH_END")
            this.is_touch = false
            if (this.gameState == BEGIN_GAME) {
                this.gameState = BEGIN_FISH
            }
            else if (this.gameState == BEGIN_FISH) {
                this.gameState = WAIT_FISH
            }
            else if (this.gameState == WAIT_FISH) {
                this.gameState = BEGIN_GAME
                this.setTestTipText("您收杆了，点击屏幕开始游戏")
                this.runLabelScaleAction()
            }
            else if (this.gameState == GET_FISH || this.gameState == LOSE_FISH) {
                this.gameState = BEGIN_GAME
                this.setTestTipText("还要钓鱼么？")
                this.runLabelScaleAction()
            }
            // this.buttonDown = false;
        },this)
    }

    start () {

    }

    update (dt) {
        if (this.gameState == HOOK_FISH) {
            
            if (this.checkGetOrLoseFish() == 1) {
                this.gameState = GET_FISH
                this.fishingNode.active = false
                this.setTestTipText("钓到了一条鱼！")
                this.runLabelJumpAction()
                this.fishingNode.getChildByName("FishingBar").getComponent("FishingBarCtrl").isGetFish = false
                this.fishingNode.getChildByName("FishingBar").getComponent("FishingBarCtrl").isLoseFish = false
                this.fishingNode.getChildByName("FishingBar").getComponent(cc.ProgressBar).progress = 0.5
            }
            else if (this.checkGetOrLoseFish() == 0) {
                this.gameState = LOSE_FISH
                this.fishingNode.active = false
                this.setTestTipText("鱼儿跑了")
                this.runLabelScaleAction()
                this.fishingNode.getChildByName("FishingBar").getComponent("FishingBarCtrl").isGetFish = false
                this.fishingNode.getChildByName("FishingBar").getComponent("FishingBarCtrl").isLoseFish = false
                this.fishingNode.getChildByName("FishingBar").getComponent(cc.ProgressBar).progress = 0.5
            }

        }    
    }

    onDestroy () {
        // 取消输入监听
        this.node.off(cc.Node.EventType.TOUCH_START, function(event){}, this);
        this.node.off(cc.Node.EventType.TOUCH_END, function(event){}, this);
    }

    getSceneTouch () {
        return this.is_touch
    }

    getIsThrow () {
        return this.is_throw
    }

    setTestTipText (text: string) {
        this.testTipLabel.node.getComponent(cc.Label).string = text
    }

    runLabelJumpAction () {
        this.testTipLabel.node.scale = 1
        this.testTipLabel.node.stopAllActions()
        cc.tween(this.testTipLabel.node)
        .repeatForever(cc.sequence(cc.jumpBy(2, cc.v2(0, 0), 50, 5), cc.delayTime(0.8)))
        .start()
    }

    runLabelScaleAction () {
        this.testTipLabel.node.scale = 1
        this.testTipLabel.node.y = 358
        this.testTipLabel.node.stopAllActions()
        cc.tween(this.testTipLabel.node)
        .repeatForever(cc.sequence(cc.scaleBy(1, 1.3),cc.scaleBy(1, 1 / 1.3)))
        .start()
    }

    // 获得鱼上钩的时间（后期调整）
    getWaitFishTime () {
        let delayTime = utils.randomInt(2, 6)
        cc.log("delayTime:", delayTime)
        return delayTime
    }


    checkGetOrLoseFish () {
        if (this.fishingNode.getChildByName("FishingBar").getComponent("FishingBarCtrl").isGetFish){
            return 1
        }

        if (this.fishingNode.getChildByName("FishingBar").getComponent("FishingBarCtrl").isLoseFish){
            return 0
        }
        return 3
    }

}
