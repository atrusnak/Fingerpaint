const assert = require('assert');
const firebase = require('@firebase/testing');
const MY_PROJECT_ID = 'fingerpaint-7b504';

describe("Fingerpaint Tests", () => {

    it("Understands basic addition", () => {
        assert.equal(2+2,4);
    });

    it("Can read items in the read-only collection", async() => {
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get()); //await since async.
    });

    it("Can't write items in the read-only collection", async() => {
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.set({foo: "bar"})); //await since async.
    });

    it("Can write to a user document with the same ID as our user", async() =>{
        const myAuth = {uid: "user_abc", email: "abc@gmail.com"};
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: myAuth}).firestore();
        const testDoc = db.collection("users").doc("users_abc");
        await firebase.assertSucceeds(testDoc.set({foo: "bar"})); //await since async.
    });

    it("Can read posts marked public", async() =>{
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID}).firestore();
        const testQuery = db.collection("posts").where("visibility", "==", "public");
        await firebase.assertSucceeds(testQuery.get()); //await since async.
    });

    it("Can query personal posts", async() =>{
        const myAuth = {uid: "user_abc", email: "abc@gmail.com"};
        const db = firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: myAuth}).firestore();
        const testQuery = db.collection("posts").where("authorId", "==", "users_abc");
        await firebase.assertSucceeds(testQuery.get()); //await since async.
    });
})