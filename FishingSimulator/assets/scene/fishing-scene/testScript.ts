// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
// const http = require('http')

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



    buttonDown: boolean = false
    speed:  number = -100
    maxSpeed: number = 5
    acc: number = 9.8
    contactSpeed: number = 100
    // LIFE-CYCLE CALLBACKS:

    // http({
    //     url: 'https://api.inner.ink/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA',
    //     }).then(({ data }) => JSON.parse(data))
    //     .then(data => {
    //         console.log(data)
    //     })

    onLoad () {

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -100);
        this.testButton.node.on(cc.Node.EventType.TOUCH_START,function(event){
            this.buttonDown = true;
        },this)

        this.testButton.node.on(cc.Node.EventType.TOUCH_END,function(event){
            this.buttonDown = false;
        },this)

        cc.log(this.testSprite.node.getComponent("contactTest"))
        
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
        // this.checkIsFish()
    };


    isContact(){
        let isContact = this.testSprite.node.getComponent("contactTest").getContactState()
        return isContact
    }


    checkIsFish(){
        let headIn:boolean = this.testSprite.node.y + (this.testSprite.node.height/2) > this.ruleSprite.node.y - (this.ruleSprite.node.height/2)
        let bottomIn:boolean = this.testSprite.node.y - (this.testSprite.node.height/2) < this.ruleSprite.node.y + (this.ruleSprite.node.height/2)
        // if (headIn && bottomIn){
        //     cc.log(true)
        // }else{
        //     cc.log(false)
        // }
    };

    setSpeed(time){
        if(this.buttonDown){
            this.speed += this.acc * time * 100
            // this.contactSpeed -= this.acc * time * 100
        }else{
            // this.speed -= this.acc * time * 100
            // this.contactSpeed += this.acc * time * 100
        }
        if (this.isContact()){
            cc.log("contactSpeed:",this.speed)
            let contactSpeed = 0 - this.speed
            this.speed = this.contactSpeed
        }
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

   
}
