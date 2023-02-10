import { Id, Paginated, Params } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import ToDoMongoDataModel from './dataModel/ToDoMongoDataModel';


export class Todo extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application,private toDoMongoDataModel:ToDoMongoDataModel) {
    super(options);
  }

  async findLastItem(params?: Params | undefined): Promise<any[] | Paginated<any>> {
    const user_id = params?.user?._id;
    this.toDoMongoDataModel.setDBModel(this.Model);
    const getItem = await this.toDoMongoDataModel.getLastItemInList({user_id});
    this.toDoMongoDataModel.destruct()
    return getItem;
  }

  async findAllDeleteItems(params?: Params | undefined):  Promise<any[] | Paginated<any>>  {
    const user_id = params?.user?._id;
    this.toDoMongoDataModel.setDBModel(this.Model);
    const getItem = await this.toDoMongoDataModel.findUserlist(user_id,{ action:true});
    this.toDoMongoDataModel.destruct()
    return getItem.length == 1 ?getItem[0].list.filter((item:any)=>item.action === true):[];
  }
  async find(params?: Params | undefined):  Promise<any[] | Paginated<any>>  {
    const user_id = params?.user?._id;
    this.toDoMongoDataModel.setDBModel(this.Model);
    const getItem = await this.toDoMongoDataModel.findUserlist(user_id,{action:false});
    this.toDoMongoDataModel.destruct()
    return getItem.length == 1 ?getItem[0].list.filter((item:any)=>item.action === false):[];
  }
  
  async get(id: Id, params?: Params | undefined): Promise<any> {
    const user_id = params?.user?._id;
    this.toDoMongoDataModel.setDBModel(this.Model);
    const getItem = await this.toDoMongoDataModel.findTodoByItemId(user_id, {_id:id});
    this.toDoMongoDataModel.destruct()
    return getItem;
  }
  async remove(id: any, params?: Params | undefined): Promise<any> {
    const user_id = params?.user?._id;
    this.toDoMongoDataModel.setDBModel(this.Model);
    const {modifiedCount} = await this.toDoMongoDataModel.updateUserList(user_id,{_id:id},{"list.$.action":true});
    this.toDoMongoDataModel.destruct()
    if(modifiedCount>=1) return {msg:`${id} deleted`}
  }

  async update(id: Id, data: any, params?: Params | undefined): Promise<any> {
    const user_id = params?.user?._id;
    this.toDoMongoDataModel.setDBModel(this.Model);
    const update = await this.toDoMongoDataModel.updateUserList(user_id,{_id:id},
      {'list.$.name':data.name,'list.$.description':data.description});
    this.toDoMongoDataModel.destruct()
    if(update.modifiedCount>=1) return {msg:`${id} updated`}
  }
  async create(data: Partial<any> | Partial<any>[], params?: Params | undefined): Promise<any> {
    const list = [data];
    const user_id = params?.user?._id;
    this.toDoMongoDataModel.setDBModel(this.Model);
    const isUserHaveToDoList:[] = await this.toDoMongoDataModel.findTodo({user_id})
    if(isUserHaveToDoList.length){
      const {modifiedCount} =  await this.toDoMongoDataModel.pushInList({user_id},'list',list)
      const getCreatedItem = await this.toDoMongoDataModel.getLastItemInList({user_id});
      this.toDoMongoDataModel.destruct()
      if(modifiedCount>=1) return getCreatedItem;
    }else{
      let createdData = {...{list},...{user_id}}
      return await super.create(createdData,params)  
    }
     
  }
}
