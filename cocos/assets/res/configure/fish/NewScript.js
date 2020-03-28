const fishConfig = {
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

module.exports = {
	fishConfig,
	timeList
}