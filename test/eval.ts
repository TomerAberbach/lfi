import { afterEach, beforeEach, describe, vi } from 'vitest'
import * as exports from '../src/internal/helpers.js'

const describeWithAndWithoutEval = (fn: () => void): void => {
  describe(`cannot eval`, () => {
    beforeEach(() => {
      vi.spyOn(exports, `canEval`, `get`).mockReturnValue(false)
    })
    afterEach(() => {
      vi.restoreAllMocks()
    })

    fn()
  })

  // eslint-disable-next-line vitest/valid-describe-callback
  describe(`can eval`, fn)
}

export default describeWithAndWithoutEval
