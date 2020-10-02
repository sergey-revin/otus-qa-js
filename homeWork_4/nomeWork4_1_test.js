
const assert = require('assert');

const baseURL = 'https://petstore.swagger.io/v2/';

const testPetItem =  {

	id: 1000001,

	category: {
		id: 10001,
		name: 'Dogs'
	},

	name: "STURDY BASIC NYLON DOG COLLAR WITH QUICK SNAP BUCKLE",

	photoUrls: [
		"https://cdn.shopify.com/s/files/1/0272/4904/9675/products/product-image-848512288_720x.jpg?v=1581568679"
	],

	tags: [
		{
			id: 100001,
			name: "Black"
		},
		{
			id: 100002,
			name: "XL"
		}
	],

	status: "available"
};



Feature('HomeWork #4 api tests for adusting of pet items');



// POSITIVE TESTS

Scenario(`New pet item can be created via api POST request: /pet`, async (I) => {

	const apiResponse = await I.sendPostRequest(baseURL + 'pet', testPetItem);

	assert(apiResponse.status === 200, `expected response status is 200, but received status is ${apiResponse.status}`);
	assert(apiResponse.data.id ===  testPetItem.id, `expected id is ${ testPetItem.id}, but received value is ${apiResponse.data.id}`);
	assert(apiResponse.data.name ===  testPetItem.name, `expected name is ${ testPetItem.name}, but received value is ${apiResponse.data.name}`);
	assert(apiResponse.data.category.id ===  testPetItem.category.id, `expected category.id is  ${testPetItem.category.id}, but received value is ${apiResponse.data.category.id}`);
	assert(apiResponse.data.category.name ===  testPetItem.category.name, `expected category.name is ${ testPetItem.category.name}, but received value is ${apiResponse.data.category.name}`);

	// ----------------------------
	// you can add here all other fields to check their correctness
	// ----------------------------

});



Scenario(`Created pet item can be loaded by ID via api GET request: /pet/{petId}`, async (I) => {
	
	const apiResponse = await I.sendGetRequest(baseURL + `pet/${testPetItem.id}`);

	assert(apiResponse.status === 200, `expected response status is 200, but received status is ${apiResponse.status}`);
	assert(apiResponse.data.id === testPetItem.id, `expected id is ${testPetItem.id}, but received value is ${apiResponse.data.id}`);
	assert(apiResponse.data.name === testPetItem.name, `expected name is ${testPetItem.name}, but received value is ${apiResponse.data.name}`);
	assert(apiResponse.data.category.id === testPetItem.category.id, `expected category.id is ${testPetItem.category.id}, but received value is ${apiResponse.data.category.id}`);
	assert(apiResponse.data.category.name === testPetItem.category.name, `expected category.name is ${testPetItem.category.name}, but received value is ${apiResponse.data.category.name}`);

	// ----------------------------
	// you can add here all other fields to check their correctness
	// ----------------------------

});



Scenario(`Created pet item can be loaded by Status via api GET request: /pet/findByStatus`, async (I) => {

	const soughtID = testPetItem.id;
	const soughtStatus = testPetItem.status
	
	const apiResponse = await I.sendGetRequest(baseURL + `pet/findByStatus?status=${soughtStatus}`);

	assert(apiResponse.status === 200, `expected response status 200, but received status is ${apiResponse.status}`);
	// checking: Is there test_item in returned array
	const arrayPetItems = apiResponse.data
	const soughtPet = arrayPetItems.find(pet => pet.id === soughtID);
	assert(soughtPet, `Item with ID = ${soughtID} was not found on list of "${soughtStatus}" items`);

});



Scenario(`Created pet item can be deleted by ID via DELETE request /pet/{petId}`, async (I) => {

	const header = {
		api_key: 'special-key'
	};

	const apiResponse = await I.sendDeleteRequest(baseURL + `pet/${testPetItem.id}`, header);
	
	assert(apiResponse.status === 200, `Expected response status 200, but received value is ${apiResponse.status}`);
		
});


// NEGATIVE TESTS

Scenario(`A search with wrong ID should return 404 code and 'Not Found' status text`, async (I) => {

	const wrongID = testPetItem.id + 1;

	const apiResponse = await I.sendGetRequest(baseURL + `pet/${wrongID}`);

	assert(apiResponse.status === 404, `Expected response status 404, but received status is ${apiResponse.status}`);
	assert(apiResponse.statusText === 'Not Found', `Expected error message is 'Not Found', but received value is ${apiResponse.statusText}`);
	
});



