import CreateAdForm from "./CreateAdForm";

export default function CreateAdPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
            Elan Yerləşdir
          </h1>
          <p className="text-slate-500 mt-2">
            Məlumatları daxil edin və minlərlə alıcıya çatın.
          </p>
        </div>

        {/* Hazırladığımız mərhələli form */}
        <CreateAdForm />
      </div>
    </div>
  );
}
