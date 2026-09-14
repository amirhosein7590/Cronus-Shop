import {
  Group,
  WebGLRenderer,
  Vector3,
  Clock,
  Object3D,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  PointLight,
  PMREMGenerator,
  Box3,
  Mesh,
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import {
  CAMERA_FOV,
  DRACO_DECODER_PATH,
  WATCH_MODEL_PATH,
} from "@/lib/constants";
import { createGlassMaterial, upgradeMaterial } from "./materials";
import { HOUR_HAND_MESH, ROLE_MAP, SECOND_HAND_MESH } from "./roleMap";

interface SceneOptions {
  isMobile?: boolean;
}

export class WatchScene {
  readonly cameraState = {
    px: 0,
    py: 0.3,
    pz: 8.5,
    tx: 0,
    ty: 0,
    tz: 0,
  };

  watch: Group | null = null;

  private container: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private composer: EffectComposer;
  private bokeh: BokehPass;
  private camTarget = new Vector3();
  private clock = new Clock();
  private rafId = 0;
  private isMobile: boolean;

  // Scales the camera position so the watch stays fully in frame on
  // narrow viewports. Computed on resize, applied every frame.
  private aspectScale = 1;

  private secondHand: Object3D | null = null;
  private hourHand: Object3D | null = null;
  private initialSecondRot = 0;
  private initialHourRot = 0;

  private disposed = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(container: HTMLElement, opts: SceneOptions = {}) {
    this.container = container;
    this.isMobile = opts.isMobile ?? false;

    this.renderer = new WebGLRenderer({
      antialias: !this.isMobile,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2),
    );
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.scene.background = null;

    this.camera = new PerspectiveCamera(CAMERA_FOV, 1, 0.1, 200);
    this.camera.position.set(0, 0.3, 8.5);
    this.camera.lookAt(this.camTarget);

    this.setupEnvironment();
    this.setupLights();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bokeh = new BokehPass(this.scene, this.camera, {
      focus: 8.5,
      aperture: this.isMobile ? 0.0001 : 0.0003,
      maxblur: this.isMobile ? 0.004 : 0.008,
    });
    this.composer.addPass(this.bokeh);
    this.composer.addPass(new OutputPass());

    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    window.addEventListener("resize", this.resize);
  }

  private setupEnvironment() {
    const pmrem = new PMREMGenerator(this.renderer);
    pmrem.compileEquirectangularShader();
    this.scene.environment = pmrem.fromScene(
      new RoomEnvironment(),
      0.04,
    ).texture;
    pmrem.dispose();
  }

  private setupLights() {
    this.scene.add(new AmbientLight(0xffffff, 0.25));

    const keyLight = new DirectionalLight(0xfff5e8, 1.8);
    keyLight.position.set(5, 6, 6);
    this.scene.add(keyLight);

    const fillLight = new DirectionalLight(0xb8d4ff, 0.6);
    fillLight.position.set(-5, 2, 4);
    this.scene.add(fillLight);

    const rimLight = new DirectionalLight(0xc9a96e, 1.2);
    rimLight.position.set(-3, 4, -6);
    this.scene.add(rimLight);

    const goldPoint1 = new PointLight(0xc9a96e, 0.6, 12);
    goldPoint1.position.set(2, 2, 3);
    this.scene.add(goldPoint1);

    const goldPoint2 = new PointLight(0xffddaa, 0.4, 10);
    goldPoint2.position.set(-2, -1.5, 2);
    this.scene.add(goldPoint2);
  }

  async load(): Promise<void> {
    const draco = new DRACOLoader();
    draco.setDecoderPath(DRACO_DECODER_PATH);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    const gltf = await loader.loadAsync(WATCH_MODEL_PATH);
    if (this.disposed) return;

    const model = gltf.scene;

    const box = new Box3().setFromObject(model);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 5.0 / maxDim;

    model.scale.setScalar(scale);
    model.position.copy(center).multiplyScalar(-scale);

    this.watch = new Group();
    this.watch.add(model);
    this.scene.add(this.watch);

    model.traverse((obj) => {
      if (!(obj instanceof Mesh)) return;
      const mesh = obj as Mesh;

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => upgradeMaterial(m));
      } else if (mesh.material) {
        mesh.material = upgradeMaterial(mesh.material);
      }

      if (mesh.name === SECOND_HAND_MESH) {
        this.secondHand = mesh;
        this.initialSecondRot = mesh.rotation.z;
      } else if (mesh.name === HOUR_HAND_MESH) {
        this.hourHand = mesh;
        this.initialHourRot = mesh.rotation.z;
      }
    });

    this.watch.scale.setScalar(0.001);
    this.watch.rotation.z = -0.3 * Math.PI;
  }

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
    const dt = this.clock.getDelta();

    if (this.secondHand && this.hourHand) {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const hr = (now.getHours() % 12) + now.getMinutes() / 60;

      const targetSecond = this.initialSecondRot - (sec / 60) * Math.PI * 2;
      const targetHour = this.initialHourRot - (hr / 12) * Math.PI * 2;
      this.secondHand.rotation.z +=
        (targetSecond - this.secondHand.rotation.z) * Math.min(1, dt * 12);
      this.hourHand.rotation.z +=
        (targetHour - this.hourHand.rotation.z) * Math.min(1, dt * 12);
    }

    // Pull the camera back proportionally on narrow viewports so the
    // watch keeps the same framing it has on a wide desktop viewport.
    const s = this.aspectScale;
    this.camera.position.set(
      this.cameraState.px * s,
      this.cameraState.py * s,
      this.cameraState.pz * s,
    );
    this.camTarget.set(
      this.cameraState.tx,
      this.cameraState.ty,
      this.cameraState.tz,
    );
    this.camera.lookAt(this.camTarget);

    const dist = this.camera.position.distanceTo(this.camTarget);
    (this.bokeh.uniforms as any)["focus"].value = dist;

    this.composer.render();
  }

  // Keeps the horizontal field of view roughly constant across viewports.
  // Above 1.4 the base FOV is wide enough; below it we back the camera off.
  private computeAspectScale(): number {
    const aspect = this.camera.aspect || 1;
    if (aspect >= 1.4) return 1;
    return Math.min(2.0, 1.4 / Math.max(aspect, 0.4));
  }

  private resize = () => {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.aspectScale = this.computeAspectScale();
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener("resize", this.resize);
    this.resizeObserver?.disconnect();
    this.renderer.dispose();
    this.scene.traverse((o) => {
      if (o instanceof Mesh) {
        o.geometry?.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m?.dispose());
      }
    });
    this.renderer.domElement.remove();
  }
}
