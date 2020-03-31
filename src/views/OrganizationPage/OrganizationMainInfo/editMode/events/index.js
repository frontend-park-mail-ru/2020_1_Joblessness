export const moveDownEvent = (page, elem, id, fieldName, storeName) => {
  const moveDownEvent = () => {
    const list = page.props.getStore()[storeName];
    for (let i = 0; i < list.length - 1; i++) {
      if (list[i].id === id) {

        const el1 = document.getElementById(
          list[i + 1].id).parentNode;

        const el2 = document.getElementById(
          list[i].id).parentNode;

        page.props.setStore((s) => {
          const temp = s[storeName].find((e) => e.id === id);
          const ind = s[storeName].indexOf(temp);
          s[storeName][ind] = s[storeName][ind + 1];
          s[storeName][ind + 1] = temp;
          return s;
        });

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
    const list = page.props.getStore()[storeName];
    if ( list[0].id === id) {
      return;
    }

    for (let i = 1; i < list.length; i++) {
      if (list[i].id === id) {

        const el1 = document.getElementById(
          list[i].id).parentNode;
        const el2 = document.getElementById(
          list[i - 1].id).parentNode;

        page.props.setStore((s) => {
          const temp = s[storeName].find((e) => e.id === id);
          const ind = s[storeName].indexOf(temp);
          s[storeName][ind] = s[storeName][ind - 1];
          s[storeName][ind - 1] = temp;
          return s;
        });

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
