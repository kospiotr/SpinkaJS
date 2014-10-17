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
    var view = Ext.create('App.scientists.ScientistsView');
    view.on('openRecord', this.runScientist, this);
    this.setActiveItem(view); 
  },
  runScientist: function (record) {
    var view = Ext.create('App.scientists.ScientistEditView');
    view.on('backToList', this.runScientists, this);
    view.setUpRecord(record);
    this.setActiveItem(view);
  }
});