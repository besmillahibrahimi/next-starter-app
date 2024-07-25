import "../../styles/Loading.css";

export default function Loading() {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="blur-background"></div>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 z-50"></div>
      </div>
    </div>
  );
}
