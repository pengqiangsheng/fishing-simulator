module.exports = {
    1: {
        id: 1,
        name: 'fish1',
        size: [1, 2, 10001],
        time: [1, 2, 3],
    },
    2: {
        id: 2
    }

}


const fishConfig


const timeList = [
	{
		value: '12:00 - 13:00',
		key: 1
	},
	{
		value: '12:00 - 13:00',
		key: 1
	},
	{
		value: '12:00 - 13:00',
		key: 1
	},
	{
		value: '12:00 - 13:01',
		key: 10001
	}
]

const getValue = (key, arr) => {
	for(let i = 0; i < arr.length; i++) {
		if(arr[i].key === key) {
			return arr[i].value
		}
	}
	return ''
}
