const fs = require('fs').promises
const path = require('path')

/**
 * Profile images: Vercel Blob in production when BLOB_READ_WRITE_TOKEN is set;
 * otherwise written under public/uploads for local development.
 */
async function persistProfileImage(file) {
  if (!file || !file.buffer) {
    throw new Error('Missing file buffer')
  }

  if (process.env.VERCEL === '1' && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'Set BLOB_READ_WRITE_TOKEN (Vercel Blob) for profile image uploads on Vercel.'
    )
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = require('@vercel/blob')
    const safeName = String(file.originalname || 'upload').replace(/[^a-zA-Z0-9.-]/g, '_')
    const pathname = `profiles/${Date.now()}-${safeName}`
    const blob = await put(pathname, file.buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return blob.url
  }

  const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads')
  await fs.mkdir(uploadDir, { recursive: true })
  const safeName = String(file.originalname || 'upload').replace(/[^a-zA-Z0-9.-]/g, '_')
  const filename = `${Date.now()}-${safeName}`
  await fs.writeFile(path.join(uploadDir, filename), file.buffer)
  return `/uploads/${filename}`
}

module.exports = { persistProfileImage }
