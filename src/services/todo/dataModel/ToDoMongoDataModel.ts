import ToDoDataModel from "./ToDoDataModel.interface";

class ToDoMongoDataModel implements ToDoDataModel{
    private DBModel:any;

    constructor(){

    }
    setDBModel(Model:any){
        this.DBModel = Model;
    }
    async createTodo(todoNewData: {}) : Promise<any>{
        let newTodo = new this.DBModel(todoNewData);
        return await newTodo.save();    
    }
    async getLastItemInList(filterQuery: {}): Promise<any> {
        return await this.DBModel.find(filterQuery, { "list": { "$slice": [ "$list", -1 ] }});
    }
    async findTodo(filterQuery: {}): Promise<any> {
        return await this.DBModel.find(filterQuery);
    }
    async findTodoByItemId(user_id: any,_id:any): Promise<any> {
        return await this.DBModel.find({user_id, "list": { $elemMatch: { _id} } }, 
            { "list": { $elemMatch: { _id } } });
    }
    async pushInList(filterQuery: {}, fieldSearch: string, updatesData: {}, opt?: {} | undefined): Promise<any> {
        return await this.DBModel.updateOne(
            filterQuery,
            { $push: { [fieldSearch] : { $each:updatesData} }},
            opt
          );
    }
    async findUserlist(user_id: any, filterQuery?: {} | undefined): Promise<any> {
        return await this.DBModel.find({user_id,filterQuery} )            
            //     'list.$.action':false
            //  },{list: {$in : {'action':[false]}}).limit(10)
    }
    async updateUserList(user_id: any, filterQuery: {}, updatesData?: {} | undefined, opt?: {} | undefined): Promise<any> {
        return await this.DBModel.updateOne({  
            user_id,
            list: 
            { $elemMatch : 
                filterQuery
            } 
        }, { $set: updatesData }, opt);
    }

    destruct(){
        this.DBModel = undefined;
    }
}

export default ToDoMongoDataModel;