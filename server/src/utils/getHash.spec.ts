import { generateHash } from './getHash'
import { generateSalt } from './genSalt'

describe('getHash', () => {
  it('should return hashed string', () => {
    const salt = generateSalt()
    expect(generateHash('test123#', salt)).toHaveLength(60)
  })
})
