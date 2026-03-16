// Not found UI

// nextjs.org/docs/app/api-reference/file-conventions/not-found
// Next.js provides two conventions to handle not found cases:
    // not-found.js: Used when you call the notFound function in a route segment.
    // global-not-found.js: Used to define a global 404 page for unmatched routes across your entire app. This is handled at the routing level and doesn't depend on rendering a layout or page.

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}

// The not-found file is used to render UI when the notFound function is thrown within a route segment. Along with serving a custom UI, Next.js will return a 200 HTTP status code for streamed responses, and 404 for non-streamed responses (see Status Codes for details about SEO).