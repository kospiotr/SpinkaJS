Ext.define('App.ViewportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.main',
  init: function () {
    var me = this;
    this.control({
      '#scientistsButton': {
        'click': me.runScientists
      }
    });
    me.runScientists();
  },
  setActiveItem: function (item) {
    this.getView().removeAll(true);
    this.getView().setActiveItem(item);
  },
  runScientists: function () {
    var listView = Ext.create('App.scientists.ScientistListView');
    listView.on('newRecord', this.runScientist, this);
    listView.on('openRecord', this.runScientist, this);
    listView.on('editRecord', this.runScientist, this);
    listView.on('copyRecord', this.runScientist, this);
    listView.on('delRecord', this.delScientist, this);
    this.setActiveItem(listView); 
  },
  runScientist: function (record) {
    var view = Ext.create('App.scientists.ScientistEditorView');
    view.getForm().loadRecord(record);
    this.setActiveItem(view);
  },
  delScientist: function (record) {
      record.drop();
  }
});