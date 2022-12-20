import {doc, runTransaction} from "@firebase/firestore";
import {db} from "../config/firebase";
import {isUndefined} from "lodash";


export async function generateCodeId() {
    const counterRef = doc(db, 'counters', 'codes');

    let codeId = '';

    await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(counterRef);
        if (isUndefined(doc) || !doc.exists()) {
            throw "Document does not exist!";
        } else {
            const newCount = doc.data().count + 1;
            transaction.update(counterRef, {count: newCount});
            codeId = newCount.toString();
            return newCount;
        }
    });

    return codeId;
}