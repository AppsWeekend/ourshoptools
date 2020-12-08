const $ = (query, selectAll = false) => (
  selectAll ?
    document.querySelectorAll(query) :
    document.querySelector(query)
)

const navigateTo = (page) => {
  const section = $("section.active");
  const visibleSection = $(`#${page}`);
  if (section) {
    section.classList.remove('active');
    visibleSection.classList.add('animate__animated', 'animate__fadeIn', 'active');
  } else {
    visibleSection.classList.add('animate__animated', 'animate__fadeIn', 'active');
  }
}