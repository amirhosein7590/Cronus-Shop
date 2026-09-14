import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Points,
  Clock,
  Vector2,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Material,
} from "three";

/**
 * Floating golden particles for the "About Us" page.
 * Responds to mouse movement and scrolling.
 */

export class ParticleScene {
  private container: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private points: Points;
  private rafId = 0;
  private disposed = false;
  private clock = new Clock();
  private mouse = new Vector2(0, 0);
  private targetMouse = new Vector2(0, 0);
  private scrollY = 0;
  private basePositions: Float32Array;

  constructor(container: HTMLElement, count = 900) {
    this.container = container;
    this.renderer = new WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    container.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(55, 1, 0.1, 200);
    this.camera.position.z = 12;

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 0.06 + 0.02;
    }
    this.basePositions = positions.slice();

    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("size", new BufferAttribute(sizes, 1));

    const mat = new PointsMaterial({
      color: 0xc9a227,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    this.points = new Points(geo, mat);
    this.scene.add(this.points);

    this.resize();
    window.addEventListener("resize", this.resize);
    window.addEventListener("mousemove", this.onMouseMove, { passive: true });
    window.addEventListener("scroll", this.onScroll, { passive: true });
  }

  private onMouseMove = (e: MouseEvent) => {
    this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  private onScroll = () => {
    this.scrollY = window.scrollY;
  };

  start() {
    if (this.rafId) return;
    const tick = () => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(tick);
      this.update();
    };
    tick();
  }

  private update() {
    const t = this.clock.getElapsedTime();

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    const geo = this.points.geometry;
    const posAttr = geo.getAttribute("position") as BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const count = arr.length / 3;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = this.basePositions[ix];
      const by = this.basePositions[ix + 1];
      const bz = this.basePositions[ix + 2];
      const wave = Math.sin(t * 0.4 + i * 0.05) * 0.12;
      arr[ix] = bx + wave + this.mouse.x * 0.9;
      arr[ix + 1] = by + wave + this.mouse.y * 0.9 - this.scrollY * 0.0008;
      arr[ix + 2] = bz + Math.cos(t * 0.3 + i * 0.03) * 0.15;
    }
    posAttr.needsUpdate = true;

    this.points.rotation.y = this.mouse.x * 0.15;
    this.points.rotation.x = -this.mouse.y * 0.1;

    this.renderer.render(this.scene, this.camera);
  }

  private resize = () => {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("scroll", this.onScroll);
    this.points.geometry.dispose();
    (this.points.material as Material).dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
