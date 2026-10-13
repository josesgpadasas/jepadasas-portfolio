export function PageBackdrop() {
  return (
    <div aria-hidden className="page-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="backdrop-base absolute inset-0" />
      <div className="backdrop-workspace-mobile absolute inset-0 lg:hidden" />
      <div className="backdrop-workspace absolute inset-y-0 right-0 hidden lg:block" />
      <div className="backdrop-texture absolute inset-0" />
      <div className="backdrop-vignette absolute inset-0" />
    </div>
  );
}
