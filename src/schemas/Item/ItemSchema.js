export default class Item {
  static schema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      qtd: 'int',
      selled: 'int',
      acquired: 'int',
      price_to_sell: 'float',
      price_to_buy: 'float',
      picture: 'string',
      category: 'string',
      description: 'string',
      createdAt: 'int',
    },
  };
}
