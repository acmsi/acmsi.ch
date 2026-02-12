import { readdir, stat, mkdir, rm } from 'node:fs/promises'
import { join, parse, extname } from 'node:path'
import sharp from 'sharp'

const UPLOADS_DIR = 'public/images/uploads'
const OUTPUT_DIR = 'public/images/optimized'
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])

const VARIANTS = [
  { name: 'thumb', width: 400, quality: 80 },
  { name: 'medium', width: 800, quality: 82 },
  { name: 'large', width: 1600, quality: 85 },
]

async function getSourceImages(): Promise<string[]> {
  const entries = await readdir(UPLOADS_DIR)
  return entries.filter(f => SUPPORTED_EXTENSIONS.has(extname(f).toLowerCase()))
}

async function needsUpdate(
  sourcePath: string,
  outputDir: string,
): Promise<boolean> {
  try {
    const sourceStat = await stat(sourcePath)
    // Check if any variant is missing or older than source
    for (const variant of VARIANTS) {
      const variantPath = join(outputDir, `${variant.name}.webp`)
      try {
        const variantStat = await stat(variantPath)
        if (variantStat.mtimeMs < sourceStat.mtimeMs) return true
      } catch {
        return true // variant doesn't exist
      }
    }
    return false
  } catch {
    return true
  }
}

async function optimizeImage(filename: string): Promise<{ skipped: boolean }> {
  const sourcePath = join(UPLOADS_DIR, filename)
  const basename = parse(filename).name
  const outputDir = join(OUTPUT_DIR, basename)

  if (!(await needsUpdate(sourcePath, outputDir))) {
    console.log(`  skip: ${filename} (up to date)`)
    return { skipped: true }
  }

  await mkdir(outputDir, { recursive: true })

  const image = sharp(sourcePath)
  const metadata = await image.metadata()

  console.log(
    `  processing: ${filename} (${metadata.width}x${metadata.height})`,
  )

  for (const variant of VARIANTS) {
    const outputPath = join(outputDir, `${variant.name}.webp`)

    // Don't upscale: if source is smaller than variant width, use source width
    const width =
      metadata.width && metadata.width < variant.width
        ? metadata.width
        : variant.width

    await sharp(sourcePath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: variant.quality })
      .toFile(outputPath)

    const outputStat = await stat(outputPath)
    const sizeKB = (outputStat.size / 1024).toFixed(1)
    console.log(`    ${variant.name}.webp: ${width}w, ${sizeKB}KB`)
  }

  return { skipped: false }
}

async function cleanOrphans(sourceFiles: string[]): Promise<void> {
  const sourceBasenames = new Set(sourceFiles.map(f => parse(f).name))

  let entries: string[]
  try {
    entries = await readdir(OUTPUT_DIR)
  } catch {
    return // output dir doesn't exist yet
  }

  for (const entry of entries) {
    if (!sourceBasenames.has(entry)) {
      const orphanPath = join(OUTPUT_DIR, entry)
      console.log(`  removing orphan: ${entry}/`)
      await rm(orphanPath, { recursive: true })
    }
  }
}

async function getDirSize(dir: string): Promise<{ totalSize: number }> {
  let totalSize = 0
  try {
    const entries = await readdir(dir, { recursive: true })
    for (const entry of entries) {
      try {
        const s = await stat(join(dir, entry as string))
        if (s.isFile()) totalSize += s.size
      } catch {
        // skip
      }
    }
  } catch {
    // dir doesn't exist
  }
  return { totalSize }
}

async function main(): Promise<void> {
  console.log('Image optimization starting...\n')

  const sourceFiles = await getSourceImages()
  console.log(`Found ${sourceFiles.length} source images in ${UPLOADS_DIR}\n`)

  await mkdir(OUTPUT_DIR, { recursive: true })

  // Clean orphaned optimized folders
  console.log('Checking for orphans...')
  await cleanOrphans(sourceFiles)

  // Process images
  console.log('\nOptimizing images...')
  let processed = 0
  let skipped = 0

  for (const file of sourceFiles) {
    const result = await optimizeImage(file)
    if (result.skipped) skipped++
    else processed++
  }

  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}`)

  // Show total size comparison
  const { totalSize: uploadSize } = await getDirSize(UPLOADS_DIR)
  const { totalSize: optimizedSize } = await getDirSize(OUTPUT_DIR)

  console.log(`\nUploads folder: ${(uploadSize / 1024 / 1024).toFixed(1)}MB`)
  console.log(`Optimized folder: ${(optimizedSize / 1024 / 1024).toFixed(1)}MB`)
  console.log(
    `Reduction: ${(((uploadSize - optimizedSize) / uploadSize) * 100).toFixed(0)}%`,
  )
}

main().catch((err: unknown) => {
  console.error('Error:', err)
  process.exit(1)
})
