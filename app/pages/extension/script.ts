import { BaseComponent, ComponentConstructor, Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml();

const CustomExtension: ComponentConstructor<BaseComponent> = (Splide, Components, options, event) => {
  const { root } = Splide;
  const { bind } = event;

  function mount(): void {
    const button = document.createElement('button');
    button.textContent = 'Jump';
    bind(button, 'click', () => Splide.go('>>'));
    root.append(button);
  }

  return {
    mount,
  };
};

new Splide('#splide01', {
  width: 1000,
  height: 400,
}).mount({ CustomExtension });

