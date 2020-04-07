import rc from 'rc'

export default rc('covid', {
  secret: process.env.API_SECRET || 'secret',
  mongo: process.env.MONGO_URL || 'mongodb://localhost:27017/covid',
  sms: {
    key: process.env.SMS_KEY,
    url: process.env.SMS_URL || 'https://api.sms506.com/sms'
  }
})
