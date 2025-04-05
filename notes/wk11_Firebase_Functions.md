**Firebase Function Summary**

**Firestore Database:**

- Insert a new document with an auto-generated id
```js
const docRef = await addDoc(collection(db, "students"),
{name:"Abby", gpa:3.5, isPostGrad:true})
```

- Insert a new document with a specific id
```js
await setDoc(doc(db, "students", *<span class="mark">id</span>*),
{name: "Peter", gpa:3.5, isPostGrad:**false**})
```

- Get all documents
```js
const querySnapshot = await getDocs(collection(db, "students"));
```

- Get all documents that meet a specific criteria
```js
const q = query(collection(db, "students"), where("name", "==",
"Abby"));

const querySnapshot = await getDocs(q);
```

- Get a single document using its document id:
```js
const docSnap = await getDoc(doc(db,
"userdata",*<span class="mark">id</span>*))

console.log(docSnap.data())
```

- Update a document with id
```js
await updateDoc(doc(db, "students", *id*), {gpa: -25.555})
```

- Delete a document by id
```js   
await deleteDoc(doc(db, "students", *id*))
```

**Firebase Authentication:**

- Login
```js
await signInWithEmailAndPassword(auth, emailFromUI, passwordFromUI)
```

- Logout

auth.signOut()
```

- Create new account
```js
await createUserWithEmailAndPassword(auth, emailFromUI,
passwordFromUI)
```

*After a user is created, they are automatically “logged in”*

- Get the currently logged in user
```js
auth.currentUser
```

- Check if there is someone logged in
```js   
if (auth.currentUser == null) {

// nobody logged in

} else {

// someone is logged in

    }
```
