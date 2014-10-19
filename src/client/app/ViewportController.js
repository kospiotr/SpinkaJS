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
    var view = Ext.create('App.scientists.ScientistListView');
    view.on('openRecord', this.runScientist, this);
    view.on('newRecord', this.newScientist, this);
    view.on('delRecord', this.delScientist, this);
    this.setActiveItem(view); 
  },
  runScientist: function (record) {
    var view = Ext.create('App.scientists.ScientistEditorView');
    view.setUpRecord(record);
    this.setActiveItem(view);
  },
  newScientist: function () {
      this.runScientist(new App.scientists.ScientistModel());
  },
  delScientist: function (record) {
      record.drop();
  }
});