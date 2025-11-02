import { cn } from '@/lib/utils'

describe('Utils - cn function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('should remove duplicate tailwind classes', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })

  it('should handle array of classes', () => {
    const result = cn(['class1', 'class2', 'class3'])
    expect(result).toBe('class1 class2 class3')
  })

  it('should handle undefined and null values', () => {
    const result = cn('valid-class', undefined, null, 'another-class')
    expect(result).toBe('valid-class another-class')
  })

  it('should handle empty strings', () => {
    const result = cn('', 'valid-class', '')
    expect(result).toBe('valid-class')
  })

  it('should merge conflicting tailwind classes correctly', () => {
    const result = cn('text-sm text-lg')
    expect(result).toBe('text-lg')
  })

  it('should handle complex conditional logic', () => {
    const variant = 'primary'
    const size = 'lg'
    const disabled = false

    const result = cn(
      'base-button',
      variant === 'primary' && 'bg-blue-500',
      size === 'lg' && 'text-lg',
      disabled && 'opacity-50'
    )

    expect(result).toBe('base-button bg-blue-500 text-lg')
  })

  it('should handle object notation', () => {
    const result = cn({
      'text-red-500': true,
      'bg-blue-500': false,
      'p-4': true,
    })

    expect(result).toContain('text-red-500')
    expect(result).toContain('p-4')
    expect(result).not.toContain('bg-blue-500')
  })

  it('should merge multiple conflicting utilities', () => {
    const result = cn('px-2 py-1 p-4')
    expect(result).toBe('p-4')
  })
})
