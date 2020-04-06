export const moveDownEvent = (page, elem, id, fieldName, props) => {
  const moveDownEvent = () => {
    const list = props.EXTRACT_REDUCER(page.props.getStore());
    for (let i = 0; i < list.raw.length - 1; i++) {
      if (list.raw[i].id === id) {
        const el1 = document.getElementById(
            list.raw[i + 1].id).parentNode;

        const el2 = document.getElementById(
            list.raw[i].id).parentNode;

        page.props.setStore((s) => {
          const subStore = props.EXTRACT_REDUCER(s);
          const temp = subStore.raw.find((e) => e.id === id);
          const ind = subStore.raw.indexOf(temp);
          subStore.raw[ind] = subStore.raw[ind + 1];
          subStore.raw[ind + 1] = temp;
          return props.REPLACE_REDUCER(s, subStore);
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

export const moveUpEvent = (page, elem, id, fieldName, props) => {
  const moveUpEvent = () => {
    const list = props.EXTRACT_REDUCER(page.props.getStore());
    if ( list.raw[0].id === id) {
      return;
    }

    for (let i = 1; i < list.raw.length; i++) {
      if (list.raw[i].id === id) {
        const el1 = document.getElementById(
            list.raw[i].id).parentNode;
        const el2 = document.getElementById(
            list.raw[i - 1].id).parentNode;

        page.props.setStore((s) => {
          const subStore = props.EXTRACT_REDUCER(s);
          const temp = subStore.raw.find((e) => e.id === id);
          const ind = subStore.raw.indexOf(temp);
          subStore.raw[ind] = subStore.raw[ind - 1];
          subStore.raw[ind - 1] = temp;
          return props.REPLACE_REDUCER(s, subStore);
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
