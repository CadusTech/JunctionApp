const mongoose = require('mongoose')
const Promise = require('bluebird')

const EventController = require('../modules/event/controller')

module.exports = {
    index: 14,
    name: '14-add-checklist-to-registration',
    description: 'add checklist',
    run: async () => {
        const nres = await mongoose.model('Registration').updateMany(
            { checklist: { $exists: false } },
            {
                $set: {
                    checklist: {
                        items: [],
                    },
                },
            },
        )
        const bres = await mongoose.model('Registration').updateMany(
            {
                checklistItem: null,
            },
            {
                $set: {
                    checklist: {
                        items: [
                            {
                                title: '1st checkboks',
                                checked: false,
                            },
                            {
                                title: '2nd checkboks',
                                checked: false,
                            },
                            {
                                title: '3rd checkbox',
                                checked: false,
                            },
                            {
                                title: '4th checkbox',
                                checked: false,
                            },
                        ],
                    },
                },
            },
        )
        console.info('Done with registration checklist', nres.n, nres.nModified)
        return Promise.resolve()
    },
}
