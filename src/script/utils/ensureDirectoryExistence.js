/** @flow
 *
 * ensureDirectoryExistence
 * @param filePath
 */
import fs from 'fs'
import path from 'path'

export default function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath)

  if (fs.existsSync(dirname)) {
    return
  }

  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}
