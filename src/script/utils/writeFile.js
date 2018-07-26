// @flow
import fs from 'fs'

import ensureDirectoryExistence from './ensureDirectoryExistence'

/**
 * writeFile
 * @param filePath
 * @param content
 */
export default function writeFile(filePath: string, content: string) {
  ensureDirectoryExistence(filePath)
  fs.writeFileSync(filePath, content)
}
