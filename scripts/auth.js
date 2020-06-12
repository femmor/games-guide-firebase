// Add admin cloud function
const adminActions = document.querySelector(".admin-actions")
adminActions.addEventListener("submit", (e) => {
    e.preventDefault()
    const adminEmail = document.querySelector("#admin-email").value
    // Admin Role
    const addAdminRole = functions.httpsCallable("addAdminRole")
    addAdminRole({
        email: adminEmail
    }).then((result) => {
        console.log(result)
    })  
})

// UI Variables
const signUpForm = document.querySelector("#signup-form")
const loginForm = document.querySelector("#login-form")
const logout = document.querySelector("#logout")
const accountDetails = document.querySelector(".account-details")

// Track user authentication status / Listen for auth state changed
auth.onAuthStateChanged(user => {
    if(user) {
        // Connect to FireStore DB and retrieve data from it
        db.collection("guides").onSnapshot((snapshot) => {
            setupGuides(snapshot.docs)
            setupUi(user)
        }, err => {
            console.log(err.message)
        })
    } else {
        setupGuides([])
        setupUi()
    }
})

// Sign Up
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Get user info
    const email = signUpForm["signup-email"].value
    const password = signUpForm["signup-password"].value

    // SignUp Logic
    // Create & authenticate user
    auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
        // Create user bio document in firestore
        return db.collection("users").doc(cred.user.uid).set({
            bio: signUpForm["signup-bio"].value,
            firstName: signUpForm["first-name"].value,
            lastName: signUpForm["last-name"].value,
            username: signUpForm["user-name"].value
        })
        
    }).then(() => {
        // clear form and close modal
        signUpForm.reset()
        const modal = document.querySelector("#modal-signup")
        M.Modal.getInstance(modal).close();
    })
})

// Log User Out
logout.addEventListener("click", (e) => {
    e.preventDefault()
    // Log out user
    auth.signOut()
}) 

// Sign User In
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // get user info
    const email = loginForm["login-email"].value
    const password = loginForm["login-password"].value

    // Login Logic
    auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
        // Clear form and close modal
        loginForm.reset()
        const modal = document.querySelector("#modal-login")
        M.Modal.getInstance(modal).close()
    })
})

// Create Guide
const createGuideForm = document.querySelector("#create-form")
createGuideForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // Get form values
    const title = createGuideForm["title"].value
    const content = createGuideForm["content"].value

    db.collection("guides").add({
        title,
        content
    })
    .then(() => {
        // close modal and reset form 
        const modal = document.querySelector("#modal-create")
        createGuideForm.reset()
        M.Modal.getInstance(modal).close()
    }).catch(e => {
        console.log(e.message)
    })    
})


// Accounts pop-up functionality
