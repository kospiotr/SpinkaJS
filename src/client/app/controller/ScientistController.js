Ext.define('App.controller.ScientistController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.scientist',
  
  control: {
    '#backToListButton':{
      click: function () {
        this.getView().fireEvent('backToList');
      }
    },
    '#previewButton': {
      click: function(){
        this.getView().setActiveItem('previewPanel');
      }
    },
    '#editButton': {
      click: function(){
        this.getView().setActiveItem('editPanel');
      }
    }
  }

});