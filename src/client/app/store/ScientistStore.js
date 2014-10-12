Ext.define('App.store.ScientistStore', {
  extend: 'Ext.data.Store',
  storeId: 'scientistStore',
  model: 'App.model.Scientist',
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