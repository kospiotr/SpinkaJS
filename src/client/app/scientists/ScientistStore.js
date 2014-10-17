Ext.define('App.scientists.ScientistStore', {
  extend: 'Ext.data.Store',
  storeId: 'scientistStore',
  model: 'App.scientists.ScientistModel',
  autoLoad: true,
  autoSync: true,
  proxy: {
    type: 'rest',
    url: 'rest/scientist',
    reader: {
      type: 'json',
      rootProperty: 'data'
    },
    writer: {
      type: 'json'
    }
  },
});