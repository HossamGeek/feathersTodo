// Initializes the `todo` service on path `/todo`
import { Params, ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Todo } from './todo.class';
import createModel from '../../models/todo.model';
import hooks from './todo.hooks';
import ToDoMongoDataModel from './dataModel/ToDoMongoDataModel';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'todo': Todo & ServiceAddons<any>;
    'todo/last-item':  Todo & ServiceAddons<any>;
    'todo/deleted': Todo & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
 
  app.use('/todo/last-item', {
    find: async function(params:Params): Promise<any> {
      return new Todo(options, app,new ToDoMongoDataModel()).findLastItem(params)
    },
  });
  app.use('/todo/deleted', {
    find: async function(params:Params): Promise<any> {
      return new Todo(options, app,new ToDoMongoDataModel()).findAllDeleteItems(params)      
    },
  });
  app.use('/todo', new Todo(options, app,new ToDoMongoDataModel()));

  // Get our initialized service so that we can register hooks

  app.service('todo/last-item').hooks(hooks);
  app.service('todo/deleted').hooks(hooks);
  app.service('todo').hooks(hooks);
  
}

