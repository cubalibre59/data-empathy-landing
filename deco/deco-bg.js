// Animation de particules de fond pour Deco Intérieur Maison
(function() {
  const canvas = document.getElementById('deco-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
  }
  window.addEventListener('resize', resize); 
  resize();

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 120;
      this.r = Math.random() * 2 + .4;
      this.vy = -(Math.random() * .45 + .1);
      this.c = Math.random() > .5 ? 'rgba(108,63,255,0.3)' : 'rgba(194,147,67,0.3)';
    }
    tick() { this.y += this.vy; if (this.y < -10) this.reset(); }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = this.c; ctx.fill(); }
  }
  
  const count = Math.min(70, Math.floor(window.innerWidth / 14));
  const particles = Array.from({ length: count }, () => new P());
  
  (function loop() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    particles.forEach(p => { p.tick(); p.draw(); }); 
    requestAnimationFrame(loop); 
  })();
})();
