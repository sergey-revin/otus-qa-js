Feature('HomeWork #3.1:  managing of TODO');



const pageStructure = {
	url: 'http://todomvc.com/examples/emberjs/',
	elements: {
		inputNewTODO: '#new-todo',
		listOfToDo: {
			container: '#todo-list',
			firstElement: {
				item: 'ul#todo-list > li:nth-child(1)',
				label: 'ul#todo-list > li:nth-child(1) > div > label',
				buttonRemove: 'button.destroy',
				buttonToggle: 'input.toggle',
			},
			secondElement: {
				item: 'ul#todo-list > li:nth-child(2)',
				label: 'ul#todo-list > li:nth-child(2) > div > label',
				buttonRemove: 'button.destroy',
				buttonToggle: 'input.toggle'
			},
			activeItems: {
				firstActive: 'ul#todo-list > li.ember-view:nth-child(1) > div > label',
				secondActive: 'ul#todo-list > li.ember-view:nth-child(2) > div > label',
			},
			completedItems: {
				firstCompleted: 'ul#todo-list > li.completed.ember-view:nth-child(1) > div > label',
				secondCompleted: 'ul#todo-list > li.completed.ember-view:nth-child(2) > div > label',
			}
			

		},
		todoCounter: 'span#todo-count > strong',
		buttonShowAll: 'a.ember-view[href = "#/"]',
		buttonShowActive: 'a.ember-view[href = "#/active"]',
		buttonShowCompleted: 'a.ember-view[href = "#/completed"]',
		buttonClearCompleted: "#clear-completed",
		buttonToggleAll: 'input#toggle-all'
	}
}


const addNextElementToList = async (I, todoText,) => {

	const pageElements = pageStructure.elements;

	I.click(pageElements.inputNewTODO,);
	I.fillField(pageElements.inputNewTODO, todoText);
	I.pressKey('Enter');

};



Before((I) => { 
	I.amOnPage(pageStructure.url);
});



Scenario('001: New TODO item can be created on empty list and TODO counter should be equal to 1', async (I) => {
		
	// arrange
	const pageElements = pageStructure.elements;
	
	// action
	await addNextElementToList(I, `My first TODO`);

	// assertions
	I.see('My first TODO', {css: pageElements.listOfToDo.firstElement.label});
	I.see('1', {css: pageElements.todoCounter});
});


Scenario('002: Second TODO item should be added to the end of list and TODO counter should be equal to 2', async (I) => {
		
	// arrange
	const pageElements = pageStructure.elements;
	
	// action
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');

	// assertions
	I.see('My second TODO', {css: pageElements.listOfToDo.secondElement.label});
	I.see('2', {css: pageElements.todoCounter});
	
});


Scenario('003: ToggleALL button should toggle all list items to Completed/Active state and change todo counter', async (I) => {

	// arrange
	const pageElements = pageStructure.elements;
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');
	
	// action #1 - set all to completed state
	I.click({css: pageElements.buttonToggleAll});

	//assertions
	I.see('My first TODO', {css: pageElements.listOfToDo.completedItems.firstCompleted});
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
	I.see('0', {css: pageElements.todoCounter});

	// action #2 - return all to active state
	I.click({css: pageElements.buttonToggleAll});

	//assertions
	I.dontSeeElement({css: pageElements.listOfToDo.completedItems.firstCompleted});
	I.dontSeeElement({css: pageElements.listOfToDo.completedItems.secondCompleted});
	I.see('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
	I.see('My second TODO', {css: pageElements.listOfToDo.activeItems.secondActive});
	I.see('2', {css: pageElements.todoCounter});

});


Scenario('004: ToggleItem button should toggle current item to Completed/Active state and change todo counter', async (I) => {

	// arrange
	const pageElements = pageStructure.elements;
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');
	
	// action #1 - set second item to completed state
	I.click({css: pageElements.listOfToDo.secondElement.buttonToggle},{css: pageElements.listOfToDo.secondElement.item});
	I.see('1', {css: pageElements.todoCounter});

	//assertions
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
	
	// action #2 - return second item to actiive state
	I.click({css: pageElements.listOfToDo.secondElement.buttonToggle},{css: pageElements.listOfToDo.secondElement.item});

	//assertions
	I.dontSeeElement({css: pageElements.listOfToDo.completedItems.secondCompleted});
	I.see('My second TODO', {css: pageElements.listOfToDo.activeItems.secondActive});
	I.see('2', {css: pageElements.todoCounter});
	
	
});


Scenario('005: ShowActive button should hidde completed items', async (I) => {

	// arrange
	const pageElements = pageStructure.elements;
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');
	
	// action #1 - set second item to completed state
	I.click({css: pageElements.listOfToDo.secondElement.buttonToggle},{css: pageElements.listOfToDo.secondElement.item});

	//assertions
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});

	// action #2 - hide completed (second) item via showActive button
	I.click({css: pageElements.buttonShowActive});
	
	//assertions
	I.dontSeeElement({css: pageElements.listOfToDo.completedItems.secondCompleted});
	I.see('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
	
	
});


Scenario('006: ShowCompleted button should hidde active items', async (I) => {

	// arrange
	const pageElements = pageStructure.elements;
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');
	
	// action #1 - set second item to completed state
	I.click({css: pageElements.listOfToDo.secondElement.buttonToggle},{css: pageElements.listOfToDo.secondElement.item});

	//assertions
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
	
	// action #2 - hide active (first) item via showCompleted button
	I.click({css: pageElements.buttonShowCompleted});

	//assertions
	I.dontSee('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.firstCompleted});
		
});


Scenario('007: ShowAll button should unhidde all hidden completed items', async (I) => {

	// arrange
	const pageElements = pageStructure.elements;
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');
	
	// action #1 - set second item to completed state
	I.click({css: pageElements.listOfToDo.secondElement.buttonToggle},{css: pageElements.listOfToDo.secondElement.item});

	//assertions
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
	
	// action #2 - hide completed (second) item via showActive button
	I.click({css: pageElements.buttonShowActive});
	
	//assertions
	I.dontSeeElement({css: pageElements.listOfToDo.completedItems.secondCompleted});
	I.see('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
	
	// action #3  - unhidde completed elements
	I.click({css: pageElements.buttonShowAll});

	//assertions
	I.see('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
		
});


Scenario('008: ShowAll button should unhidde all hidden active items', async (I) => {

	// arrange
	const pageElements = pageStructure.elements;
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');
	
	// action #1 - set second item to completed state
	I.click({css: pageElements.listOfToDo.secondElement.buttonToggle},{css: pageElements.listOfToDo.secondElement.item});

	//assertions
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
	
	// action #2 - hide active (first) item via showCompleted button
	I.click({css: pageElements.buttonShowCompleted});

	//assertions
	I.dontSee('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.firstCompleted});
		
	// action #3  - unhidde active elements
	I.click({css: pageElements.buttonShowAll});

	//assertions
	I.see('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
		
});


Scenario('009: ClearCompleted button should remove all copmleted items', async (I) => {

	// arrange
	const pageElements = pageStructure.elements;
	await addNextElementToList(I, 'My first TODO');
	await addNextElementToList(I, 'My second TODO');
	
	// action #1 - set second item to completed state
	I.click({css: pageElements.listOfToDo.secondElement.buttonToggle},{css: pageElements.listOfToDo.secondElement.item});

	//assertions
	I.see('My second TODO', {css: pageElements.listOfToDo.completedItems.secondCompleted});
	
	// action #2 - remove all completed items item via ClearCompleted button
	I.click({css: pageElements.buttonClearCompleted});

	//assertions
	I.dontSeeElement({css: pageElements.listOfToDo.completedItems.secondCompleted});
	I.see('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
		
	// action #3  - unhidde all hidden elements
	I.click({css: pageElements.buttonShowAll});

	//assertions (nothing should change)
	I.dontSeeElement({css: pageElements.listOfToDo.completedItems.secondCompleted});
	I.see('My first TODO', {css: pageElements.listOfToDo.activeItems.firstActive});
		
});

