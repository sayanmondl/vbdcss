import CreateEventForm from "./CreateEventForm";

export default async function Page() {
  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">Create Event</h1>
      <CreateEventForm />
    </div>
  );
}
