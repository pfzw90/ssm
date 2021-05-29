/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class Collapsible {
  constructor() {
    this.collabpsibles = Array.from(document.getElementsByClassName('collapse'));
  }

  drawButton(elem) {
    const button = document.createElement('button');
    button.innerText = elem.dataset.buttontext;
    elem.insertAdjacentElement('beforebegin', button);

    if (elem.dataset.animationmethod === 'raf') {
      const maxHeight = elem.offsetHeight * 10;
      let open = false;
      elem.style.height = '0px';

      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        const start = Date.now();
        const end = maxHeight;

        function draw() {
          const progress = Date.now() - start;
          if (!open) elem.style.height = `${progress / 10}px`;
          else elem.style.height = `calc(${elem.style.height} - ${progress / 10}px`;

          if (progress <= end) window.requestAnimationFrame(draw);
          else open = !open;
        }

        window.requestAnimationFrame(draw);
      });
    }

    if (elem.dataset.animationmethod === 'css') {
      elem.classList.add('hidden');
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        elem.classList.toggle('hidden');
        elem.classList.toggle('visible');
      });
    }
  }

  init() {
    this.collabpsibles.forEach((elem) => {
      elem.style.overflow = 'hidden';
      this.drawButton(elem);
    });
  }
}
