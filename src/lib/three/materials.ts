import { Material, MeshStandardMaterial, MeshPhysicalMaterial } from "three";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Upgrades materials based on name. Each material is cloned so that the meshes remain independent.
 */

export function upgradeMaterial(src: Material): Material {
  const mat = src.clone() as MeshStandardMaterial;
  const name = src.name.toLowerCase();

  if (/metal/i.test(name)) {
    mat.metalness = 1;
    mat.roughness = clamp((mat.roughness ?? 0.5) * 0.5, 0, 0.18);
    mat.envMapIntensity = 2.2;
  } else if (/black/i.test(name)) {
    mat.metalness = 0.4;
    mat.roughness = 0.5;
    mat.envMapIntensity = 1.2;
  } else if (/green/i.test(name)) {
    mat.metalness = 0.3;
    mat.roughness = 0.55;
    mat.envMapIntensity = 1.1;
  } else if (/darkpin/i.test(name)) {
    mat.metalness = 0.9;
    mat.roughness = 0.3;
    mat.envMapIntensity = 1.6;
  } else if (/image/i.test(name)) {
    mat.metalness = 0.1;
    mat.roughness = 0.7;
  }

  return mat;
}

/**
 * Creates a physically based glass material. MeshPhysicalMaterial is required.
 */

export function createGlassMaterial(): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.96,
    thickness: 0.8,
    ior: 1.55,
    transparent: true,
    opacity: 0.4,
    roughness: 0.02,
    metalness: 0,
    envMapIntensity: 2.4,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
  });
}
