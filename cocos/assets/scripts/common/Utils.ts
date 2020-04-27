class CommonUtils{
    public static readonly Effect: CommonUtils = new CommonUtils();

    // 随机整数，区间[min, max]
    randomInt = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // 通过key去获取相应的value
    getArrayValueByKey = (key, arr) => {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].key === key) {
                return arr[i].value
            }
        }
        return ''
    }
}
export const Utils = CommonUtils.Effect;
