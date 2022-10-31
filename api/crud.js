// events.js  -   will interact with firestore
import {db} from "../firebase";

// import from firestore sdk
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";
const collectionNames = {
    todo: 'todo',
    events: 'events',
    contacts: 'contacts',   
};

/*
for events collection 
data is defined as
const data ={ 
        user: userId,
        title: title,
        description: description,
        status: status,
        startDate: startDate,
        endDate: endDate }
*/
/**
 * @param {String} collectionName The name of collection
 * @param {any} data The data to be saved
 */
const addCollectionDoc = async( collectionName , data ) => {
    try{
        const collectionRef = collection( db, collectionName );
        await addDoc(
            collectionRef,
            data,
        );
    }
    catch( error ) {
        console.log( error );
    }
};
/*
for events collection 
data is defined as
const data ={ 
        user: userId,
        title: title,
        description: description,
        status: status,
        startDate: startDate,
        endDate: endDate }
*/
const updateCollectionDoc = async(  collectionName, docID, data ) => {
    try{
        //console.log( "collectionName: " + collectionName);
        const docRef = doc( db, collectionName, docID);
        //console.log( "updateCollectionDoc" + data);
        await setDoc( docRef, data, {merge:true}, docID );
    }
    catch( error ) {
        console.log( error );
    }
};

/*
for events collections
updateObject = {
    status: status
};
*/
const updateCollectionDocFields = async( collectionName, docId, updateObject  ) => {
    try {
        // reference to existing firestore document by id
        const docRef = doc( db, collectionName, docId );

        // update that doc
        await updateDoc(
            docRef,
            updateObject
        );
    }
    catch( error ) {
        console.log( error );
    }
};

const deleteCollectionDoc = async( collectionName, docId ) => {
    try {
         // reference to existing firestore document by id
         const docRef = doc( db, collectionName, docId );

         // update that doc
         await deleteDoc( docRef );
    }
    catch( error ) {
        console.log( error );
    }

};

export { collectionNames, addCollectionDoc , updateCollectionDoc, updateCollectionDocFields  , deleteCollectionDoc}; 