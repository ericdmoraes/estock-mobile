export default class Category {
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      name: {type: 'string', optional: false},
    },
  };
}
