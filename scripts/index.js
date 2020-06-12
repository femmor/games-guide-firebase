// Get guides container
const guideList = document.querySelector(".guides")
const loggedOutLinks = document.querySelectorAll(".logged-out")
const loggedInLinks = document.querySelectorAll(".logged-in")

// setup UI
const setupUi = (user) => {
  if(user) {
    db.collection("users").doc(user.uid).get()
      .then(doc => {
        // accounts info
        const html = `
          <div>Logged in as ${user.email}</div>
          <hr />
          <div>Biography: ${doc.data().bio}</div>
          <div>First Name: ${doc.data().firstName}</div>
          <div>Last Name: ${doc.data().lastName}</div>
          <div>Username: ${doc.data().username}</div>
          `

        accountDetails.innerHTML = html
      })
    // toggle ui elements
    loggedInLinks.forEach(item => {
      item.style.display = "block"
    })
    loggedOutLinks.forEach(item => {
      item.style.display = "none"
    })
  } else {
    loggedInLinks.forEach(item => {
      item.style.display = "none"
    })
    loggedOutLinks.forEach(item => {
      item.style.display = "block"
    })
  }
}


// Setup guides
const setupGuides = (data) => {
  if(data.length > 0) {
    let html = ""
    data.forEach(doc => {
      const guide = doc.data()
      const { title, content } = guide
      // console.log(title, content)

      const li = `
              <li>
                <div class="collapsible-header grey lighten-4">${title}</div>
                <div class="collapsible-body white">${content}</div>
              </li>
      `
      html += li
      guideList.innerHTML = html
    }); 
  } else {
    guideList.innerHTML = `<h5 class="center-align">Please login to see guides</h5>`
  } 
}



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

