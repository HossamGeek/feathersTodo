// todo-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export default function (app: Application): Model<any> {
  const modelName = 'todo';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
        list            :   [{
                            name            :   {type:String,required:true},
                            description     :   {type:String},
                            action          :   {type:Boolean,default:false},
                            creation_date   :   { type: Date, default: Date.now }
                         }],   
    user_id            :   {type: Schema.Types.ObjectId,ref:"users",autopopulate: true,required:true},

  }, {
    timestamps: true
  });
schema.plugin(mongooseAutopopulate);
  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
