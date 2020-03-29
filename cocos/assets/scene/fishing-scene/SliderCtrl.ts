//author:   AimingChen
//time:     2020.3.28
//act:      滑块控制

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Canvas)
    touchCanvas: cc.Canvas
    @property(cc.Sprite)
    catchFish: cc.Sprite


    // LIFE-CYCLE CALLBACKS:

    isContact: boolean = false
    speed: number = -100
    acc: number = 9.8

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -100)

    }

    start () {

    }

    update (dt) {
        this.setSpeed(dt)
        // this.getSceneTouch()
    }

    onPreSolve (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 1) {
            this.isContact = true
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 1) {
            this.isContact = false
        } else if (otherCollider.tag == 0){
            cc.log("star!!!!")
        }
    }

    getSceneTouch () {
         return this.touchCanvas.node.getComponent("TouchEvent").getSceneTouch()
    }

    setSpeed (time) {
        if(this.getSceneTouch()){
            this.speed += this.acc * time * 100
        }else{
            if (this.isContact) {
                this.speed = - (this.speed + 50)
            }else{
                this.speed -= this.acc * time * 100
            }
            // this.contactSpeed += this.acc * time * 100
        }
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.speed)
    }

    getSliderContact(){
        return this.isContact
    }

    checkIsGetFishSlider () {
        let headIn: boolean = this.node.y + (this.node.height/2) > this.catchFish.node.y - (this.catchFish.node.height/2)
        let bottomIn: boolean = this.node.y - (this.node.height/2) < this.catchFish.node.y + (this.catchFish.node.height/2)
        if (headIn && bottomIn) {
            return true
        }else{
            return false
        }
    }
}
