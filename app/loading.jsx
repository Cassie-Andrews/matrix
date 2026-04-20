// for skeletons, loading UI
// https://nextjs.org/docs/app/api-reference/file-conventions/loading

export default function Loading() {
  // Or a custom loading skeleton component
  return <p>Loading...</p>
}

// Inside the loading.js file, you can add any light-weight loading UI. You may find it helpful to use the React Developer Tools to manually toggle Suspense boundaries.

// By default, this file is a Server Component - but can also be used as a Client Component through the "use client" directive.