export const moveDownEvent = (page, elem, id, fieldName, storeName) => {
  const moveDownEvent = () => {
    for (let i = 0; i < page.props[fieldName].length - 1; i++) {
      if (page.props[fieldName][i].id === id) {
        const temp = page.props[fieldName][i];
        page.props[fieldName][i] = page.props[fieldName][i + 1];
        page.props[fieldName][i + 1] = temp;
        page.props.setStore((s) => {
          console.log(s);
          const temp = s[storeName].find((e) => e.id === id);
          const ind = s[storeName].indexOf(temp);
          s[storeName][ind] = s[storeName][ind + 1];
          s[storeName][ind + 1] = temp;
          return s;
        });
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

export const moveUpEvent = (page, elem, id, fieldName, storeName) => {
  const moveUpEvent = () => {
    if ( page.props[fieldName][0].id === id) {
      return;
    }

    for (let i = 1; i < page.props[fieldName].length; i++) {
      if (page.props[fieldName][i].id === id) {
        const temp = page.props[fieldName][i - 1];
        page.props[fieldName][i - 1] = page.props[fieldName][i];
        page.props[fieldName][i] = temp;

        page.props.setStore((s) => {
          const temp = s[storeName].find((e) => e.id === id);
          const ind = s[storeName].indexOf(temp);
          s[storeName][ind] = s[storeName][ind - 1];
          s[storeName][ind - 1] = temp;
          return s;
        });

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
