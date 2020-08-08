Feature('HomeWork-2: new TODO creating');

const {pageForHomeWork2} = inject();
const assert = require('assert');


Before((I) => { 

	I.amOnPage(pageForHomeWork2.pageStructure.url);

});


 
Scenario(`The page ${pageForHomeWork2.pageStructure.url} should open with label "todos"`, (I) => {

	I.see('todos')

});



Scenario(`Old TODO items should absent for default state of page (e.g. on incognito tab)`, (I, pageForHomeWork2) => {

	I.dontSeeElement(pageForHomeWork2.pageStructure.elements.listOfToDo.container)

});



Scenario('Created TODO item should have the right value after Enter', async (I, pageForHomeWork2) => {
		
	// arrange
	const pageElements = pageForHomeWork2.pageStructure.elements;
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



Scenario('Created TODO item should have the righ value after F5', async (I, pageForHomeWork2) => {
		
	// arrange
	const pageElements = pageForHomeWork2.pageStructure.elements;
	const etalonText = 'My first TODO';

	// action
	I.waitForElement(pageElements.inputNewTODO);
	I.click(pageElements.inputNewTODO);
	I.fillField(pageElements.inputNewTODO, etalonText);
	I.pressKey('Enter');
	I.waitForElement({css: pageElements.listOfToDo.firstElement.label});
	//reloaad page
	I.amOnPage(pageForHomeWork2.pageStructure.url);
	I.wait(2);
    I.waitForElement({css: pageElements.listOfToDo.firstElement.label});
	const  savedText = await I.grabTextFrom({css: pageElements.listOfToDo.firstElement.label});

	// assertion
	assert.equal(savedText, etalonText, `After F5 the text in TODO should be ${etalonText} but it is ${savedText}`);

});




