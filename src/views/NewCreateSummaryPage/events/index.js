export const moveDownEvent = (page, elem, id, fieldName) => {
  const moveDownEvent = () => {
    for (let i = 0; i < page.props[fieldName].length - 1; i++) {
      if (page.props[fieldName][i].id === id) {
        const temp = page.props[fieldName][i];
        page.props[fieldName][i] = page.props[fieldName][i + 1];
        page.props[fieldName][i + 1] = temp;

        const el1 = document.getElementById(
          page.props[fieldName][i].id).parentNode;
        const el2 = document.getElementById(
          page.props[fieldName][i + 1].id).parentNode;

        el1.classList.add('moving-top');
        el2.classList.add('moving-down');

        setTimeout(
          () => {
            el1.parentNode.insertBefore(el1, el2);
            el1.classList.remove('moving-top');
            el2.classList.remove('moving-down');
          }, 200,
        );
        return;
      }
    }
  };
  elem?.addEventListener('click', moveDownEvent);
};

export const moveUpEvent = (page, elem, id, fieldName) => {
  const moveUpEvent = () => {
    if ( page.props[fieldName][0].id === id) {
      return;
    }

    for (let i = 1; i < page.props[fieldName].length; i++) {
      if (page.props[fieldName][i].id === id) {
        const temp = page.props[fieldName][i - 1];
        page.props[fieldName][i - 1] = page.props[fieldName][i];
        page.props[fieldName][i] = temp;

        const el1 = document.getElementById(
          page.props[fieldName][i - 1].id).parentNode;
        const el2 = document.getElementById(
          page.props[fieldName][i].id).parentNode;

        el1.classList.add('moving-top');
        el2.classList.add('moving-down');

        setTimeout(
          () => {
            el1.parentNode.insertBefore(el1, el2);
            el1.classList.remove('moving-top');
            el2.classList.remove('moving-down');
          }, 200,
        );
        return;
      }
    }
  };
  elem?.addEventListener('click', moveUpEvent);
};