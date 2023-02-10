interface ToDoDataModel{
    createTodo(todoNewData:{}):Promise<any>;
    findTodo(filterQuery: {}): Promise<any>
    findTodoByItemId(user_id: any,item_id:any):Promise<any>;
    pushInList(filterQuery:{}, fieldSearch:string, updatesData:{}, opt?:{}):Promise<any>;
    findUserlist(user_id:any,filterQuery?:{}):Promise<any>;
    getLastItemInList(filterQuery:{}):Promise<any>;
    updateUserList(user_id:any,filterQuery:{}, updatesData?:{}, opt?:{}):Promise<any>;
}
export default ToDoDataModel;