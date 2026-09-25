document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.nav-toggle');
  const list = document.getElementById('nav-list');
  if (!btn || !list) return;
  const closeMenu = () => {
    list.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
  };
  btn.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  list.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', event => {
    if (list.classList.contains('open') && !list.contains(event.target) && !btn.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  // Video facades: swap the thumbnail for the player on first click.
  // Without JS the card remains a plain link to YouTube.
  document.querySelectorAll('.video-facade[data-video]').forEach(link => {
    link.addEventListener('click', event => {
      if (link.dataset.playing) return;
      event.preventDefault();
      link.dataset.playing = 'true';
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + link.dataset.video + '?autoplay=1&rel=0';
      frame.title = link.getAttribute('aria-label') || 'Embedded video player';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      link.querySelectorAll('img, .play').forEach(n => n.remove());
      link.appendChild(frame);
    });
  });
});
