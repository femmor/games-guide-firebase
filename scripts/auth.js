

// Track user authentication status / Listen for auth state changed
auth.onAuthStateChanged(user => {
    user ? 
        // Connect to FireStore DB and retrieve data from it
        db.collection("guides").get()
        .then((snapshot) => {
            setupGuides(snapshot.docs)
            setupUi(user)
        })
        : setupGuides([])
        setupUi()
})

const signUpForm = document.querySelector("#signup-form")
const loginForm = document.querySelector("#login-form")
const logout = document.querySelector("#logout")

// Sign Up
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Get user info
    const email = signUpForm["signup-email"].value
    const password = signUpForm["signup-password"].value

    // SignUp Logic
    auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
        // console.log(cred.user)
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