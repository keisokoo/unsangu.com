export default async function TestPage() {
  return (
    <div className="page-default pb-40">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-4 py-4">
          <div className="text-xl">test</div>
          <div className="mt-2 border-t border-slate-300 py-2">
            <div className="prose prose-sm prose-slate w-full max-w-full md:prose-base lg:prose-lg">
              <div>test</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
