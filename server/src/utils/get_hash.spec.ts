import { generateHash } from './get_hash'
import { generateSalt } from './gen_salt'

describe('getHash', () => {
  it('should return hashed string', () => {
    const salt = generateSalt()
    expect(generateHash('test123#', salt)).toHaveLength(60)
  })
})
