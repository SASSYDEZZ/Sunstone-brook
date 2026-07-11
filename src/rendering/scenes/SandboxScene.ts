import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';

import type { IScene, SceneContext } from '../../core/IScene';

/**
 * Sprint 1 sandbox: proves the render pipeline, camera controls, and
 * scene lifecycle work end to end on desktop and mobile.
 *
 * Contains no gameplay — just a ground plane, placeholder "city block"
 * boxes, and an orbit camera with touch support. It will be replaced
 * by the World Prototype scene in Phase 2.
 */
export class SandboxScene implements IScene {
  readonly key = 'sandbox';

  private beacon: Mesh | null = null;
  private elapsedSeconds = 0;

  create(context: SceneContext): Scene {
    const { engine, canvas, config } = context;

    const scene = new Scene(engine);
    scene.clearColor = new Color4(
      config.clearColor.r,
      config.clearColor.g,
      config.clearColor.b,
      1,
    );

    this.setupCamera(scene, canvas);
    this.setupLighting(scene);
    this.buildPlaceholderWorld(scene);

    return scene;
  }

  update(deltaSeconds: number): void {
    // Gentle beacon rotation: a cheap visual heartbeat that makes it
    // obvious the frame loop and delta timing are alive.
    this.elapsedSeconds += deltaSeconds;
    if (this.beacon) {
      this.beacon.rotation.y = this.elapsedSeconds * 0.5;
    }
  }

  dispose(): void {
    // Meshes, materials, and cameras are owned by the Babylon scene;
    // SceneManager disposes it. Only clear our references here.
    this.beacon = null;
    this.elapsedSeconds = 0;
  }

  private setupCamera(scene: Scene, canvas: HTMLCanvasElement): void {
    const camera = new ArcRotateCamera(
      'main-camera',
      -Math.PI / 3, // alpha: slight diagonal view of the grid
      Math.PI / 3.5, // beta: elevated, city-builder style angle
      45,
      Vector3.Zero(),
      scene,
    );

    // Keep the camera above the ground and within a sane zoom range.
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 120;
    camera.upperBetaLimit = Math.PI / 2.2;
    camera.wheelDeltaPercentage = 0.01;
    // Two-finger pinch zoom sensitivity for touch devices.
    camera.pinchDeltaPercentage = 0.005;

    camera.attachControl(canvas, true);
  }

  private setupLighting(scene: Scene): void {
    const ambient = new HemisphericLight('ambient', new Vector3(0, 1, 0), scene);
    ambient.intensity = 0.6;
    ambient.groundColor = new Color3(0.15, 0.18, 0.22);

    const sun = new DirectionalLight('sun', new Vector3(-0.5, -1, 0.4), scene);
    sun.position = new Vector3(30, 60, -30);
    sun.intensity = 0.9;
  }

  private buildPlaceholderWorld(scene: Scene): void {
    const ground = CreateGround('ground', { width: 100, height: 100 }, scene);
    const groundMaterial = new StandardMaterial('ground-mat', scene);
    groundMaterial.diffuseColor = new Color3(0.16, 0.28, 0.2);
    groundMaterial.specularColor = Color3.Black();
    ground.material = groundMaterial;

    // A small grid of placeholder blocks standing in for future buildings.
    const blockMaterial = new StandardMaterial('block-mat', scene);
    blockMaterial.diffuseColor = new Color3(0.55, 0.6, 0.68);
    blockMaterial.specularColor = new Color3(0.05, 0.05, 0.05);

    for (let x = -2; x <= 2; x += 1) {
      for (let z = -2; z <= 2; z += 1) {
        if (x === 0 && z === 0) {
          continue; // center is reserved for the beacon
        }
        const height = 2 + ((Math.abs(x) + Math.abs(z)) % 3) * 2;
        const block = CreateBox(`block-${x}-${z}`, { width: 3, depth: 3, height }, scene);
        block.position = new Vector3(x * 8, height / 2, z * 8);
        block.material = blockMaterial;
      }
    }

    // Central rotating beacon marks the world origin.
    const beacon = CreateBox('beacon', { width: 2.5, depth: 2.5, height: 8 }, scene);
    beacon.position = new Vector3(0, 4, 0);
    const beaconMaterial = new StandardMaterial('beacon-mat', scene);
    beaconMaterial.diffuseColor = new Color3(0.9, 0.6, 0.2);
    beaconMaterial.emissiveColor = new Color3(0.25, 0.15, 0.03);
    beacon.material = beaconMaterial;
    this.beacon = beacon;
  }
}
