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

const addTodo = async( { userId, title, description, status } ) => {
    try{
        await addDoc(
            collection( db, "todo" ),
            {
                user: userId,
                title: title,
                description: description,
                status: status,
                createdAt: new Date().getTime()
            }
        );
    }
    catch( error ) {
        console.log( error );
    }
};

const toggleTodoStatus = async( { docId, status } ) => {
    try {
        // reference to existing firestore document by id
        const todoRef = doc( db, "todo", docId );

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

const deleteTodo = async( docId ) => {
    try {
         // reference to existing firestore document by id
         const todoRef = doc( db, "todo", docId );

         // update that doc
         await deleteDoc( todoRef );
    }
    catch( error ) {
        console.log( error );
    }

};


export { addTodo, toggleTodoStatus, deleteTodo }; 