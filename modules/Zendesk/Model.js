const mongoose = require("../../core/mongoose");
const Schema = mongoose.Schema;
const requestType = require("../../api/Zendesk/requestStatusType");

const serviceSchema = new Schema({
  [requestType.request_success]: {
    type: Number,
    default: 0
  },
  [requestType.request_fail]: {
    type: Number
  }
});

serviceSchema.methods.countRequest = function(service, resquestType) {
  service
    .findOneAndUpdate(
      { [resquestType]: { $exists: true } },
      { $inc: { [resquestType]: 1 } },
      { upsert: true }
    )
    .catch(err => {
      console.log(err);
    });
};
let ZendeskService = mongoose.model("ZendeskServices", serviceSchema);
module.exports = ZendeskService;
