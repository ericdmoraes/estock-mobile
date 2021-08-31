import Realm from 'realm';

import CategorySchema from '../schemas/Category/CategorySchema';
import ItemSchema from '../schemas/Item/ItemSchema';

export default async function getRealm() {
  return Realm.open({
    schema: [CategorySchema, ItemSchema],
  });
}
