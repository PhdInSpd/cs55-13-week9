// todo.js  -   will interact with firestore
import {db} from "../firebase";

// import from firestore sdk
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

const addEvent = async( { userId, title, description, status, startDate, endDate } ) => {
    try{
        await addDoc(
            collection( db, "events" ),
            {
                user: userId,
                title: title,
                description: description,
                status: status,
                startDate: startDate,
                endDate: endDate
            }
        );
    }
    catch( error ) {
        console.log( error );
    }
};

const toggleEventStatus = async( { docId, status } ) => {
    try {
        // reference to existing firestore document by id
        const todoRef = doc( db, "events", docId );

        // update that doc
        await updateDoc(
            todoRef,
            {
                status: status
            }
        );
    }
    catch( error ) {
        console.log( error );
    }
};

const deleteEvent = async( docId ) => {
    try {
         // reference to existing firestore document by id
         const todoRef = doc( db, "events", docId );

         // update that doc
         await deleteDoc( todoRef );
    }
    catch( error ) {
        console.log( error );
    }

};


export { addEvent , toggleEventStatus  , deleteEvent}; 