const playMountAnimation = (dom) => {
  dom.style.transitionDuration='0';
  dom.style.transform='scale(0,0)';
  setTimeout(() => {
    dom.style.transitionDuration='';
    dom.classList.add('placing');
    dom.style.transform='';
  }, 0);
  setTimeout(
      () => dom.classList.remove('placing'), 500,
  );
};

const addHideAnimation = (page, smooth) => {
  let timerId;
  const hideEvent = (e, showSmooth) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    if (parent.classList.contains('placing') ||
        parent.classList.contains('removing')) {
      timerId = setTimeout(() => hideEvent(null, true), 50);
      return;
    }

    const {x, width} = parent.getBoundingClientRect();
    const {x: sX, width: sWidth} = holder.parentNode.getBoundingClientRect();
    let val = 1;
    let trans = 'center center';
    const offset = 20;
    if (x - offset<= sX) {
      val = (x - offset - sX + width) / width;
      trans = 'right center';
    } else if (x + offset + width >= sX + sWidth) {
      val = (sWidth - x - offset + sX) / width;
      trans = 'left center';
    }
    val = val >= 0 ? val : 0;
    val = val <= 1 ? val : 1;
    if (showSmooth) {
      if(parent.firstChild)
        parent.firstChild.style.transitionDuration = '.4s';
    } else {
      if(parent.firstChild)
        parent.firstChild.style.transitionDuration = '';
    }
    page._rot = `scale(${val}, ${val})`;
    page._val = val;
    page._trans = trans;
    if(parent.firstChild) {
      parent.firstChild.style.transform = `scale(${val}, ${val})`;
      parent.firstChild.style.transformOrigin = trans;
      parent.firstChild.style.opacity = val;
    }
  };

  const parent = document.querySelector(page.container);
  window.removeEventListener('resize', hideEvent);
  window.addEventListener('resize', hideEvent);
  page.dom?.removeEventListener('scroll', hideEvent);
  if (!parent) {
    return;
  }
  const holder = parent.parentNode;
  holder.parentNode?.addEventListener('scroll', hideEvent);
  hideEvent(null, smooth);
};

export {
  playMountAnimation,
  addHideAnimation,
};
