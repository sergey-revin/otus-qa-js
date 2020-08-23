Feature('HomeWork #2.2: "Naughty Strings" can be used as TODO item');

const {todomvcPageObject} = inject();
const assert = require('assert');
const fileSystem = require('fs');


// loading all strings from source file to array
const arrayOfNaughtyString = fileSystem.readFileSync('/home/serg/app_otus_qa/otus-qa-js/homeWork_2/blns.txt').toString().split("\n");


// create test data table for parametrized test from array
const testDataTable = new DataTable(['naughtyString']);
arrayOfNaughtyString.forEach((item) => {
	// comments and empty strings will be skiped (don't need to this test) 
	if ((item.indexOf("#") != 0) && (item != '')) {
		testDataTable.add([item]);
	}
});


Before((I) => { 
	I.amOnPage(todomvcPageObject.pageStructure.url);
});


// test generator (parametrized test)
Data(testDataTable).Scenario(`The saved "naughty string" should be equal to the entered one`, async (I, current) => {

	// arrange
	const pageElements = todomvcPageObject.pageStructure.elements;
	const etalonText = current.naughtyString;

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
 










