Ext.define('App.store.ScientistStore', {
	extend: 'Ext.data.Store',
	storeId: 'scientistStore',
	model: 'App.model.Scientist',
	data: {
		users: [
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Lisa', lastName: 'Simpson', email: "lisa@simpsons.com", state: "colorado"},
			{firstName: 'Bart', lastName: 'Simpson', email: "bart@simpsons.com", state: "colorado"},
			{firstName: 'Homer', lastName: 'Simpson', email: "homer@simpsons.com", state: "colorado"},
			{firstName: 'Marge', lastName: 'Simpson', email: "marge@simpsons.com", state: "colorado"}
		]
	},
	autoLoad: true,
	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			rootProperty: 'users'
		}
	}
});