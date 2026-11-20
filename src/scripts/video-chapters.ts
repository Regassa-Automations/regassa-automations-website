/**
 * Walkthrough chapters and transcript (04-interactions-and-responsive.md, Walkthrough video).
 * Chapters render as plain text without JS; here they become buttons
 * "Play from {time}: {name}" that seek, play (rejections caught) and move focus to the video.
 * The transcript <details> opens when the hash is #transcript or the transcript link is used.
 */
const video = document.querySelector<HTMLVideoElement>('[data-walkthrough-video]');

if (video) {
  for (const span of document.querySelectorAll<HTMLElement>('[data-chapters] [data-seconds]')) {
    const button = document.createElement('button');
    button.type = 'button';
    // Copy class and data attributes (including Astro's scoped-style data-astro-cid-*).
    for (const attr of [...span.attributes]) button.setAttribute(attr.name, attr.value);
    // Name reads "Play from 0:57: Route pricing exception" and still contains the visible text.
    const hidden = (text: string) => {
      const el = document.createElement('span');
      el.className = 'visually-hidden';
      el.textContent = text;
      return el;
    };
    // Hidden text sits inside the time span so the flex layout adds no stray spaces.
    const [time, ...rest] = [...span.childNodes];
    if (time instanceof HTMLElement) {
      time.prepend(hidden('Play from '));
      time.append(hidden(': '));
    }
    if (time) button.append(time);
    button.append(...rest);
    span.replaceWith(button);
    button.addEventListener('click', () => {
      video.currentTime = Number(span.dataset.seconds ?? 0);
      video.play().catch(() => {
        /* playback blocked; the seek still applies */
      });
      video.focus();
    });
  }
}

const transcript = document.querySelector<HTMLDetailsElement>('details#transcript');
if (transcript) {
  const openTranscript = () => {
    transcript.open = true;
  };
  if (location.hash === '#transcript') openTranscript();
  window.addEventListener('hashchange', () => {
    if (location.hash === '#transcript') openTranscript();
  });
  document
    .querySelectorAll('[data-open-transcript]')
    .forEach((a) => a.addEventListener('click', openTranscript));
}

export {};
