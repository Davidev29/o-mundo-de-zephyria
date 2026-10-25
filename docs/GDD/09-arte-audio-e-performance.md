# 09 — Arte, Áudio e Performance

## 9.1 Estilo Artístico
- Low-poly estilizado, cores vibrantes, iluminação PBR.
- Texturas 512–1024px; atlas para reduzir draw calls.

## 9.2 Pipeline Visual
- Renderização WebGL 2.0 (Three.js).
- Pós-processamento: Bloom, SSAO, DOF (postprocessing) — Should.
- Sombras PCF, LOD para terreno/vegetação, frustum culling.
- Água: shader customizado + reflexos.
- Partículas: GPU (Three.js Points).

## 9.3 Áudio
- Música dinâmica por ilha (camadas que mudam com combate/exploração).
- SFX completos (passos, impactos, ambiente).
- Voz parcial (cutscenes-chave e chefes).
- Mixagem: música -12dB, SFX -6dB, voz 0dB (referência).
- Formatos: OGG (web), com fallback.

## 9.4 Performance Alvo
- 60 FPS @ 1080p em hardware mínimo (Dual-core 2GHz, 4GB RAM, WebGL 2.0).
- Bundle inicial < 5MB (lazy load de ilhas).
- Tempo de carregamento de ilha < 3s.
- Memória < 512MB.

## 9.5 Escalabilidade
- Qualidade automática (baixa/média/alta) baseada em FPS.
- Opção manual nas configurações.
