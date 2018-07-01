const mongoose = require('mongoose'),
  Mockgoose = require('mockgoose').Mockgoose,
  mockgoose = new Mockgoose(mongoose)

module.exports = {
  setup: async () => {
    await mockgoose.prepareStorage()
    await mongoose.connect('mongodb://test')
  },

  teardown: async () => {
    await mockgoose.helper.reset()
    await mongoose.disconnect()
    let retval = new Promise(resolve => {
      mockgoose.mongodHelper.mongoBin.childProcess.on('exit', resolve)
    })
    mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM')
    return retval
  }
}