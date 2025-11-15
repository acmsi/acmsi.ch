import { test, expect } from '@playwright/experimental-ct-react'
import PhotoGallery from '@/components/photo-gallery'
import type { Gallery } from '@/lib/content'

const mockGallery: Gallery = {
  slug: 'test-gallery',
  name: 'Mosquée Nur Photos',
  type: 'events',
  description: 'Collection de photos de notre mosquée',
  photos: [
    {
      image: '/images/test1.jpg',
      title: 'Photo 1',
      alt: 'Test photo 1',
    },
    {
      image: '/images/test2.jpg',
      title: 'Photo 2',
      alt: 'Test photo 2',
    },
    {
      image: '/images/test3.jpg',
      title: 'Photo 3',
      alt: 'Test photo 3',
    },
    {
      image: '/images/test4.jpg',
      title: 'Photo 4',
      alt: 'Test photo 4',
    },
    {
      image: '/images/test5.jpg',
      title: 'Photo 5',
      alt: 'Test photo 5',
    },
  ],
  order: 1,
  published: true,
  content: '',
}

test.describe('PhotoGallery Component', () => {
  test('renders gallery name and description', async ({ mount }) => {
    const component = await mount(<PhotoGallery gallery={mockGallery} />)

    await expect(component.getByText('Mosquée Nur Photos')).toBeVisible()
    await expect(
      component.getByText('Collection de photos de notre mosquée'),
    ).toBeVisible()
  })

  test('renders correct number of thumbnails with adaptive mode', async ({
    mount,
    page,
  }) => {
    // Set mobile viewport to test default (2 cols)
    await page.setViewportSize({ width: 375, height: 667 })

    const component = await mount(
      <PhotoGallery
        gallery={mockGallery}
        maxCols={{ default: 2, md: 3 }}
        maxRows={2}
      />,
    )

    // Should render 4 photos max on mobile (2 cols × 2 rows)
    // With 5 photos total and adaptive mode, shows only complete rows
    const buttons = component.getByRole('button')
    const count = await buttons.count()

    // At mobile viewport, should show 4 photos (2x2 grid, complete rows only)
    expect(count).toBe(4)
  })

  test('shows "+N Plus de photos" overlay when more photos available', async ({
    mount,
  }) => {
    const component = await mount(
      <PhotoGallery gallery={mockGallery} maxCols={2} maxRows={2} />,
    )

    // With 5 photos and max 4 (2×2), should show "+1 Plus de photos"
    await expect(component.getByText('+1')).toBeVisible()
    await expect(component.getByText('Plus de photos')).toBeVisible()
  })

  test('renders nothing when gallery has no photos', async ({ mount }) => {
    const emptyGallery: Gallery = {
      ...mockGallery,
      photos: [],
    }

    const component = await mount(<PhotoGallery gallery={emptyGallery} />)

    // Component should render null, so container should be empty
    const content = await component.textContent()
    expect(content).toBe('')
  })

  test('responsive: mobile viewport shows 4 photos with overlay only on 4th', async ({
    mount,
    page,
  }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    const component = await mount(
      <PhotoGallery
        gallery={mockGallery}
        maxCols={{ default: 2, md: 3 }}
        maxRows={2}
      />,
    )

    // Should show 4 photos (2 cols × 2 rows adaptive)
    const photos = component.getByRole('button')
    await expect(photos).toHaveCount(4)

    // Only the 4th photo should have an overlay
    const fourthPhoto = photos.nth(3)
    const overlay = fourthPhoto.locator('div.absolute.inset-0.bg-black\\/60')

    await expect(overlay).toBeVisible()
    await expect(overlay.getByText('+1')).toBeVisible()
    await expect(overlay.getByText('Plus de photos')).toBeVisible()

    // Verify the 3rd photo does NOT have a visible overlay
    const thirdPhoto = photos.nth(2)
    const thirdOverlay = thirdPhoto.locator(
      'div.absolute.inset-0.bg-black\\/60',
    )
    // Overlay might exist in DOM but should be hidden
    if ((await thirdOverlay.count()) > 0) {
      await expect(thirdOverlay).not.toBeVisible()
    }
  })

  test('responsive: desktop viewport shows 3 photos with overlay only on 3rd', async ({
    mount,
    page,
  }) => {
    // Set desktop viewport (md breakpoint is 768px+)
    await page.setViewportSize({ width: 1024, height: 768 })

    const component = await mount(
      <PhotoGallery
        gallery={mockGallery}
        maxCols={{ default: 2, md: 3 }}
        maxRows={2}
      />,
    )

    // Should show 3 photos visible (3 cols × 1 row adaptive)
    const photos = component.getByRole('button')
    const visiblePhotos = await photos.evaluateAll(elements =>
      elements.filter(el => {
        const style = window.getComputedStyle(el)
        return style.display !== 'none'
      }),
    )
    expect(visiblePhotos.length).toBe(3)

    // Only the 3rd photo should have a visible overlay
    const thirdPhoto = photos.nth(2)
    const overlay = thirdPhoto.locator('div.absolute.inset-0.bg-black\\/60')

    await expect(overlay).toBeVisible()
    await expect(overlay.getByText('+2')).toBeVisible()
    await expect(overlay.getByText('Plus de photos')).toBeVisible()

    // Verify overlay has flex display for centering
    const computedDisplay = await overlay.evaluate(
      el => window.getComputedStyle(el).display,
    )
    expect(computedDisplay).toBe('flex')
  })
})
