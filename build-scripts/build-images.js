const sharp = require('sharp');
const fs = require('fs');
const srcDir = 'src/images';
const outDir = 'public/images/hero';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const src = `${srcDir}/hero.src.jpg`;
if (!fs.existsSync(src)) {
  console.log('No source image at', src, '- skipping image build.');
  process.exit(0);
}

(async () => {
  const sizes = [640, 960, 1440];

  for (const width of sizes) {
    await sharp(src)
      .resize({ width })
      .avif({ quality: 50 })
      .toFile(`${outDir}/hero-${width}.avif`);

    await sharp(src)
      .resize({ width })
      .webp({ quality: 70 })
      .toFile(`${outDir}/hero-${width}.webp`);

    await sharp(src)
      .resize({ width })
      .jpeg({ quality: 78, progressive: true, chromaSubsampling: '4:4:4' })
      .toFile(`${outDir}/hero-${width}.jpg`);

    console.log(`Generated hero assets for ${width}px`);
  }
})();