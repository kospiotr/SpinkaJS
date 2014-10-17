Ext.define('App.model.Scientist',{
	extend: 'Ext.data.Model',
  alias: 'viewmodel.scientist',
	fields: [
		'firstName', 'lastName', 'email', 'state', 'dateOfBirth', 'description'
	]
});
