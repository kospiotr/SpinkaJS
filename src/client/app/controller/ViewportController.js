Ext.define('App.controller.ViewportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.main',
  cachedViews: {},
  init: function () {
    var me = this;
    this.control({
      '#homeButton': {
        'click': me.runHome
      },
      '#projectsButton': {
        'click': me.runProjects
      },
      '#scientistsButton': {
        'click': me.runScientists
      },
      '#contractorsButton': {
        'click': me.runContractors
      }
    });
    me.runScientists();
  },
  setActiveItem: function (item) {
    this.getView().removeAll(true);
    this.getView().setActiveItem(item);
  },
  runHome: function () {
    var view = Ext.create('App.view.Home');
    this.setActiveItem(view);
  },
  runProjects: function () {
    var view = Ext.create('App.view.Projects');
    this.setActiveItem(view);
  },
  runScientists: function () {
    var view = Ext.create('App.view.Scientists');
    view.on('openRecord', this.runScientist, this);
    this.setActiveItem(view); 
  },
  runScientist: function (record) {
    var view = Ext.create('App.view.ScientistEdit');
    view.on('backToList', this.runScientists, this);
    view.setUpRecord(record);
    this.setActiveItem(view);
  },
  runContractors: function () {
    var view = Ext.create('App.view.Contractors');
    this.setActiveItem(view);
  }
});