
import { generateSalt } from './genSalt'

describe('genSalt', () => {
  it('should return salt string', () => {
    expect(generateSalt()).toHaveLength(29)
  })
})
