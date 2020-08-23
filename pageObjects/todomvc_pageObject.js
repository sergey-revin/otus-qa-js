// eslint-disable-next-line no-unused-vars
const { I } = inject();


module.exports = {
	
	pageStructure: {
		url: 'http://todomvc.com/examples/emberjs/',
		elements:{
			inputNewTODO: '#new-todo',
			listOfToDo: {
				container: '#todo-list',
				firstElement: {
					label: 'ul#todo-list > li:nth-child(1) > div > label',
					buttonRemove: 'button.destroy',
					buttonToggle: 'input.toggle'
				}

			},
			todoCounter: 'span#todo-count > strong',
			buttonShowAll: 'All',
			buttonShowActive: 'Active',
			buttonShowCompleted: 'Completed',

			buttonToggleAll: 'input#toggle-all'
		}
		

	}
		

	
};