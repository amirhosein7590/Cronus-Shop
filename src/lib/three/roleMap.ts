import type { WatchRole } from '@/types/watch'

export const ROLE_MAP: Record<string, WatchRole> = {
  // glass
  Sphere_Glass_0: 'glass',

  // dial
  Circle_Image_0: 'dial',
  Circle004_Image2_0: 'dial',
  Circle005_Image_0: 'dial',
  Circle003_Green_0: 'dial',
  Circle001_Green_0: 'dial',
  Circle017_Green_0: 'dial',
  Circle007_Black_0: 'dial',
  Text001__0: 'dial',
  Text002__0: 'dial',

  // case
  Cube010_MetalGrey_0: 'case',
  Cube010_Black_0: 'case',
  Circle009_MetalGrey_0: 'case',

  // hands
  Cube011_DarkPins001_0: 'hands',
  Circle006_DarkPins001_0: 'hands',

  // movement
  Cube009_DarkPins001_0: 'movement',

  // crown
  Cylinder_Black_0: 'crown',

  // pushers
  Cylinder001_MetalGrey_0: 'pushers',
  Cylinder002_MetalGrey_0: 'pushers',
  Cylinder003_MetalGrey_0: 'pushers',

  // indices
  Circle010_MetalGrey_0: 'indices',
  Circle011_MetalGrey_0: 'indices',
  Circle012_MetalGrey_0: 'indices',
  Circle013_MetalGrey_0: 'indices',
  Circle014_MetalGrey_0: 'indices',
  Circle015_MetalGrey_0: 'indices',
  Circle016_MetalGrey_0: 'indices',

  // strap upper
  Cube005_Green_0: 'strapUpper',
  Cube018_DarkPins001_0: 'strapUpper',
  Circle008_Black_0: 'strapUpper',
  Circle018_Green_0: 'strapUpper',
  Plane006_Green_0: 'strapUpper',
  Plane006_MetalGrey_0: 'strapUpper',
  Plane004_MetalGrey_0: 'strapUpper',
  Cube019_DarkPins001_0: 'strapUpper',
  Cube007_Green_0: 'strapUpper',
  Cube017_DarkPins001_0: 'strapUpper',
  Cube006_Green_0: 'strapUpper',

  // strap lower
  Cube020_DarkPins001_0: 'strapLower',
  Cube020_Black_0: 'strapLower',
  Cube024_Black_0: 'strapLower',
  Cube024_DarkPins001_0: 'strapLower',
  Cube022_Green_0: 'strapLower',
  Cube022_DarkPins001_0: 'strapLower',
  Cube004_Green_0: 'strapLower',

  // detail
  Cube013_MetalGrey_0: 'detail',
  Cube014_MetalGrey_0: 'detail',
  Cube015_MetalGrey_0: 'detail',
  Cube016_DarkPins001_0: 'detail',
  Cube008_Black_0: 'detail',
  Cube008_DarkPins001_0: 'detail',
  Cube023_Black_0: 'detail',
  Plane001__0: 'detail',
  Plane002__0: 'detail',
  Plane003__0: 'detail',
  Cylinder004_Green_0: 'detail',
}

export const SECOND_HAND_MESH = 'Cube011_DarkPins001_0'
export const HOUR_HAND_MESH = 'Circle006_DarkPins001_0'