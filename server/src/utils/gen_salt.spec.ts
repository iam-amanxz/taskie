
import { generateSalt } from './gen_salt'

describe('genSalt', () => {
  it('should return salt string', () => {
    expect(generateSalt()).toHaveLength(29)
  })
})
