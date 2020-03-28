
const {ccclass, property} = cc._decorator;
const http = import('http')
const Utils = require('Utils')
const utils = new Utils()
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Button)
    testButton: cc.Button;

    @property(cc.Sprite)
    testSprite: cc.Sprite;

    @property(cc.Sprite)
    ruleSprite: cc.Sprite

    @property(cc.ProgressBar)
    fishBar: cc.ProgressBar



    buttonDown: boolean = false
    speed:  number = -100
    maxSpeed: number = 5
    acc: number = 9.8
    contactSpeed: number = 100
    barDirection = false
    // LIFE-CYCLE CALLBACKS:

    // http({
    //     url: 'https://api.inner.ink/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA',
    //     }).then(({ data }) => JSON.parse(data))
    //     .then(data => {
    //         console.log(data)
    //     })

    onLoad () {
        console.log('随机整数:', utils.randomInt(10,1))
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -100);
        this.testButton.node.on(cc.Node.EventType.TOUCH_START,function(event){
            this.buttonDown = true;
        },this)

        this.testButton.node.on(cc.Node.EventType.TOUCH_END,function(event){
            this.buttonDown = false;
        },this)

        cc.log(this.testSprite.node.getComponent("contactTest"))

        cc.log(this.fishBar.progress)
        
    }


    start () {
        // cc.director.getPhysicsManager().gravity = cc.v2(0,0);
        // cc.director.getPhysicsManager().debugDrawFlags = 0;
        // cc.log(this.ruleSprite)
        // this.testButton.node = this.node.getChildByName("TestButton")
        // this.testButton.node.active = false;
       
        
    };


    update (dt) {
        this.setSpeed(dt)
        this.updateFishBar()
        // this.checkIsFish()
    };


    isContact(){
        let isContact = this.testSprite.node.getComponent("contactTest").getContactState()
        return isContact
    }


    checkIsFish(){
        let headIn:boolean = this.testSprite.node.y + (this.testSprite.node.height/2) > this.ruleSprite.node.y - (this.ruleSprite.node.height/2)
        let bottomIn:boolean = this.testSprite.node.y - (this.testSprite.node.height/2) < this.ruleSprite.node.y + (this.ruleSprite.node.height/2)
        if (headIn && bottomIn){
            return true
        }else{
            return false
        }
    };

    setSpeed(time){
        // let acc: number[] = [10, 20, 50]
        // let idx: number = randomInt(2,0)
        if(this.buttonDown){
            // cc.log("acc:", acc[idx])
            this.speed += this.acc * time * 100
            // this.contactSpeed -= this.acc * time * 100
        }else{
            if (this.isContact()){
                // cc.log("contactSpeed:",this.speed)
                // let contactSpeed = 0 - this.speed
                this.speed = - (this.speed + 50)
                // this.speed = this.contactSpeed
            }else{
                this.speed -= this.acc * time * 100
            }
            // this.contactSpeed += this.acc * time * 100
        }
        // if (this.isContact()){
        //     cc.log("contactSpeed:",this.speed)
        //     let contactSpeed = 0 - this.speed
        //     this.speed = 500
        // }
        this.testSprite.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.speed)
        // this.speed += this.acc * time * 100
        // if(this.buttonDown){
        //     this.testSprite.node.y += 10
        // }else{
        //     if(this.testSprite.node.y >= -298){
        //         this.testSprite.node.y -= this.speed
        //     }else{
        //         this.testSprite.node.y = -298
        //     }
        // }
        
        // if (this.testSprite.node.y >= -298){
        //     // cc.log("speed:",this.speed)
        //     this.testSprite.node.y += this.speed
        // }
        // else{
        //     if (this.speed > 0){
        //         this.testSprite.node.y += this.speed
        //     }
        // }
    };

    updateFishBar(){
        if(this.checkIsFish()) {
            if(this.fishBar.progress < 1) {
                this.fishBar.progress += 0.01
            } else {
                cc.log("get fish!!!")
            }
        } else {
            if(this.fishBar.progress > 0) {
                this.fishBar.progress -= 0.01
            } else {
                cc.log("lose fish!!!")
            }
        }

        // if(this.fishBar.progress >= 1) {
        //     this.barDirection = true
        // } else if (this.fishBar.progress <= 0) {
        //     this.barDirection = false
        // }
    
        
    }

   
}
