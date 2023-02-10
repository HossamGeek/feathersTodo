import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const validationIsFoundNameOnList = (context: any)=>{
  if(context.method === 'create'){
    if(!context.data.name || context.data.name.length == 0){
      throw new Error('Todo field ${"name"} is required');
    }
  }
}

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [async (context: any) => {validationIsFoundNameOnList(context)}],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
