Feature('HomeWork #2.1: new TODO creating');

const {todomvcPageObject} = inject();
const assert = require('assert');


Before((I) => { 
	I.amOnPage(todomvcPageObject.pageStructure.url);
});


 
Scenario(`The page ${todomvcPageObject.pageStructure.url} should open with label "todos"`, (I) => {
	I.see('todos')
});



Scenario(`Old TODO items should absent for default state of page (e.g. on incognito tab)`, (I, todomvcPageObject) => {
	I.dontSeeElement(todomvcPageObject.pageStructure.elements.listOfToDo.container)
});



Scenario('Created TODO item should have the right value after Enter', async (I, todomvcPageObject) => {
		
	// arrange
	const pageElements = todomvcPageObject.pageStructure.elements;
	const etalonText = 'My first TODO';

	// action
	I.waitForElement(pageElements.inputNewTODO);
	I.click(pageElements.inputNewTODO);
	I.fillField(pageElements.inputNewTODO, etalonText);
	I.pressKey('Enter');
	I.waitForElement({css: pageElements.listOfToDo.firstElement.label});
	const  savedText = await I.grabTextFrom({css: pageElements.listOfToDo.firstElement.label});

	// assertion
	assert.equal(savedText, etalonText, `After creating the text in TODO should be ${etalonText} but it is ${savedText}`);

});



Scenario('Created TODO item should have the righ value after F5', async (I, todomvcPageObject) => {
		
	// arrange
	const pageElements = todomvcPageObject.pageStructure.elements;
	const etalonText = 'My first TODO';

	// action
	I.waitForElement(pageElements.inputNewTODO);
	I.click(pageElements.inputNewTODO);
	I.fillField(pageElements.inputNewTODO, etalonText);
	I.pressKey('Enter');
	I.waitForElement({css: pageElements.listOfToDo.firstElement.label});
	//reloaad page
	I.amOnPage(todomvcPageObject.pageStructure.url);
	I.wait(2);
    I.waitForElement({css: pageElements.listOfToDo.firstElement.label});
	const  savedText = await I.grabTextFrom({css: pageElements.listOfToDo.firstElement.label});

	// assertion
	assert.equal(savedText, etalonText, `After F5 the text in TODO should be ${etalonText} but it is ${savedText}`);

});




