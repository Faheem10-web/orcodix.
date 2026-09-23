import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleSphere() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const width = container.clientWidth || 550
    const height = container.clientHeight || 550

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 7.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Create Circular Point Texture for smooth round dots
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.9)')
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.25)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    const pointTexture = new THREE.CanvasTexture(canvas)

    // Generate Particles on a 3D Sphere with dense texture
    const particleCount = 28000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const basePositions = new Float32Array(particleCount * 3)

    const radius = 2.45

    const colorWhite = new THREE.Color('#ffffff')
    const colorRed = new THREE.Color('#ff542e')
    const colorOrange = new THREE.Color('#ff6b47')
    const colorDeepRed = new THREE.Color('#e03e18')

    for (let i = 0; i < particleCount; i++) {
      // Golden Spiral / Fibonacci Sphere distribution with slight organic noise
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      // Slight surface thickness variation
      const rJitter = (Math.random() - 0.5) * 0.18 + (Math.random() > 0.85 ? (Math.random() - 0.5) * 0.4 : 0)
      const r = radius + rJitter

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi)
      const z = r * Math.sin(phi) * Math.sin(theta)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z

      // Color mapping: Top / upper rim features intense red / orange cluster (matching reference)
      // Reference has bright red/orange concentrated at the top and top-right rim
      const isTopArea = y > 0.8 && (x > -1.2 && z > -1.2)
      const topFactor = Math.max(0, (y - 0.4) / 2.0)

      if (isTopArea || (y > 1.1 && Math.random() < 0.75) || (y > 0.5 && x > 0.4 && Math.random() < 0.6)) {
        // Red-orange gradient mix
        const mixVal = Math.random()
        const chosenColor = mixVal > 0.5 ? colorRed : (mixVal > 0.2 ? colorOrange : colorDeepRed)
        colors[i * 3] = chosenColor.r
        colors[i * 3 + 1] = chosenColor.g
        colors[i * 3 + 2] = chosenColor.b
      } else {
        // Crisp sparkling white / silver dots
        const brightness = 0.8 + Math.random() * 0.25
        colors[i * 3] = colorWhite.r * brightness
        colors[i * 3 + 1] = colorWhite.g * brightness
        colors[i * 3 + 2] = colorWhite.b * brightness
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.042,
      map: pointTexture,
      transparent: true,
      opacity: 0.95,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Load hype.png (Glossy 3D Glass Apple-style Logo) inside the sphere center
    let logoMesh = null
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load('/assets/hype.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.generateMipmaps = true
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter

      const logoGeo = new THREE.PlaneGeometry(2.35, 2.35)
      const logoMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        depthWrite: false,
      })

      logoMesh = new THREE.Mesh(logoGeo, logoMat)
      logoMesh.position.set(0, 0, 0)
      scene.add(logoMesh)
    })

    // Interactive mouse controls & rotation
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      mouseX = x
      mouseY = y
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Handle Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Continuous gentle rotation of the outer particle sphere
      targetRotationY += 0.003
      
      particleSystem.rotation.y += (targetRotationY + mouseX * 0.4 - particleSystem.rotation.y) * 0.05
      particleSystem.rotation.x += (mouseY * 0.3 - particleSystem.rotation.x) * 0.05
      particleSystem.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05

      // Glass Logo stays steady (NON-ROTATING), upright, with subtle breathing float
      if (logoMesh) {
        logoMesh.rotation.set(0, 0, 0)
        logoMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.03
      }

      // Subtle breathing / wave pulsation on points
      const pos = geometry.attributes.position.array
      for (let i = 0; i < particleCount; i += 4) {
        const bx = basePositions[i * 3]
        const by = basePositions[i * 3 + 1]
        const bz = basePositions[i * 3 + 2]

        const wave = Math.sin(elapsedTime * 1.5 + bx * 2 + by * 2) * 0.015
        pos[i * 3] = bx * (1 + wave)
        pos[i * 3 + 1] = by * (1 + wave)
        pos[i * 3 + 2] = bz * (1 + wave)
      }
      geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      pointTexture.dispose()
      if (logoMesh) {
        logoMesh.geometry.dispose()
        logoMesh.material.dispose()
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="particle-sphere-container" ref={mountRef}>
      <div className="sphere-ambient-glow" />
    </div>
  )
}
