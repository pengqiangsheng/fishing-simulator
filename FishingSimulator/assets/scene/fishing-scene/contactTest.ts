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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    isContact:boolean = false;

    // onBeginContact: function (contact, selfCollider, otherCollider) {
    // };

    // // 只在两个碰撞体结束接触时被调用一次
    // onEndContact (contact, selfCollider, otherCollider) {
    // };

    // // 每次将要处理碰撞体接触逻辑时被调用
    // onPreSolve (contact, selfCollider, otherCollider) {
    // };

    // // 每次处理完碰撞体接触逻辑时被调用
    // onPostSolve (contact, selfCollider, otherCollider) {
    // };

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    onPreSolve (contact, selfCollider, otherCollider) {
        this.isContact = true
    }

    onEndContact(contact, selfCollider, otherCollider) {
        this.isContact = false
    }

    getContactState(){
        return this.isContact
    }

    // update (dt) {}
}
