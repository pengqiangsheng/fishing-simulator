//author:   AimingChen
//time:     2020.4.27
//act:      程序动画


class UIEffect{
    public static readonly Effect: UIEffect = new UIEffect();


    nodeShake (node: cc.Node) {
        // let moveRight = cc.moveBy(0.1, cc.v2(1, 0))
        // let moveLeft = cc.moveBy(0.1, cc.v2(-1, 0))
        // cc.tween(node)
        // .sequence(moveRight,moveLeft)
        // .start()
    }


}
export const EffectAction = UIEffect.Effect;
