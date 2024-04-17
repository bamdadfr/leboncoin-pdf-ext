import {StateKeys, setState} from '../state/set-state';

export function addContentButton() {
  const container = document.querySelector('.mt-xl');
  const button = document.createElement('button');
  button.id = 'export';
  button.textContent = 'Export PDF';
  button.className =
    'u-shadow-border-transition box-border inline-flex items-center justify-center gap-md whitespace-nowrap px-lg text-body-1 font-bold focus-visible:outline-none focus-visible:u-ring [&:not(:focus-visible)]:ring-inset bg-transparent border-sm border-current min-w-sz-44 h-sz-44 rounded-lg hover:bg-support/dim-5 enabled:active:bg-support/dim-5 focus-visible:bg-support/dim-5 text-support w-full';

  button.onclick = async () => {
    await setState(StateKeys.isTriggered, true);
  };

  container.appendChild(button);
}
