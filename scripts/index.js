// Get guides container
const guideList = document.querySelector(".guides")
// Setup guides
const setupGuides = (data) => {
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
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

