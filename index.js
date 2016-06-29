/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask engagement topics for a new topic"
 *  Alexa: "..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing topics of conversation.
 */
var QUESTIONS = [
"who is going to take care of providing the household income?",
"Who is going to stay at home with the children?", 
"Who is going to handle the finances?",
"How are finances going to be handled?", 
"Who is going to take care of garden work and supplies?",
"Who is going to maintain vehicles?",
"Who is going to wash and fold clothes?",
"Who is going to do the laundry?",
"Who is going to wash the dishes?",
"Who is going to clean the house?",
"Who is going to cook?",
"Who is going to go to the supermarket?",
"Who is going to take care of the cat, dogs or pets?",
"Who is going to plan social events?",
"Who is going to be responsible for relations with family and friends?",
"Who is going to plan vacations?",
"Who is going to initiate sexual relations?",
"Who is going to decorate the house?",
"How are major decisions going to be made?",
"Who is going to initiate dialogue about the relationship?",
"Who is going to maintain the house in order?", 
"Who is going to discipline the children?",
"Who is going to deliver and pick up children from activities?",
"Who is going to handle the people that work for the family. Like exterminator, gardner, or other services",
"What is my opinion about having children with you?",
"Who is going to take out the trash?", 
"How many children do we want to have?",
"When do we want to have our first children together?",
"Complete and discuss the following statement. If for some reason we were unable to have children, then, we would...",
"Which method of fertility awareness will we use?",
"How important will it be to have a lifestyle equal or better than my friends?",
"When making a big purchase, will we take into consideration the opinion of others?",
"Discuss the following statement: Since money means power. We will make it a priority to make lots of money in order to have more power? ",
"Discuss the following statement: We love to go shopping and to have good things",
"Discuss the following statement: Saving money for emergencies is a very important principle",
"Discuss the following statement: If we had some money to invest, we would invest it in various no risk funds instead of investing in one that earns more money, but is riskier",
"How would we handle being broke?",
"Discuss the following statement: One of our goals will be to save for ritirement",
"If we won fifty thousand american dollars from the lottery, what would we do with the money?", 
"Discuss the following statement: Since, we cannot take it with us when we die, we better spend our money now",
"Will we have separate or joined bank accounts?",
"Discuss the following statement: Money does not buy happiness, but it helps",
"Discuss the following statement: The simple things in life give me more pleasure than buying something big",
"Discuss the following statement: I would like to have my own business in order to control my future finances",
"Discuss the following statement: I would like to decide on my own how to spend the money I make",
"Discuss the following statement: It bothers me to depend on somebody else's money",
"Discuss the following statement: I feel uncomfortable if somebody offers to pay for the food we have shared because I feel indebted to that person",
"How are we going to split holidays between families?",
"What religion or faith are we raising our children in?"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Topic = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Topic.prototype = Object.create(AlexaSkill.prototype);
Topic.prototype.constructor = Topic;

Topic.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Topic.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewTopicRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Topic.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Topic.prototype.intentHandlers = {
    "GetNewTopicIntent": function (intent, session, response) {
        handleNewTopicRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask for another conversation topic or you can say exit. What would you like to do?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new topic from the list and returns to the user.
 */
function handleNewTopicRequest(response) {
    // Get a random space topic from the space topics list
    var questionIndex = Math.floor(Math.random() * QUESTIONS.length);
    var randomTopic = QUESTIONS[questionIndex];

    // Create speech output
    var speechOutput = " " + randomTopic;
    var cardTitle = "Conversation Topic";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var topic = new Topic();
    topic.execute(event, context);
};
